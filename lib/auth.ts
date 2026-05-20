// lib/auth.ts - Authentication & JWT Utilities
// Complete authentication system with JWT and HTTP-only cookies

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { prisma } from './prisma'
import type { Role } from '@prisma/client'

// Convert secret to Uint8Array for jose
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set')
  }
  return new TextEncoder().encode(secret)
}

// Token payload interface
export interface TokenPayload {
  userId: string
  email: string
  role: Role
  iat?: number
  exp?: number
}

// Cookie configuration
const COOKIE_NAME = 'auth-token'
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
}

/**
 * Create a signed JWT token
 */
export async function createToken(payload: Omit<TokenPayload, 'iat' | 'exp'>): Promise<string> {
  const secret = getJwtSecret()
  
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN || '7d')
    .setIssuer('fda-ghana-firms')
    .setAudience('fda-ghana-users')
    .sign(secret)
  
  return token
}

/**
 * Verify and decode a JWT token
 */
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const secret = getJwtSecret()
    
    const { payload } = await jwtVerify(token, secret, {
      issuer: 'fda-ghana-firms',
      audience: 'fda-ghana-users',
    })
    
    return payload as unknown as TokenPayload
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

/**
 * Set the authentication cookie in the response
 */
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  
  cookieStore.set(COOKIE_NAME, token, {
    ...COOKIE_OPTIONS,
    // Add security headers in production
    ...(process.env.NODE_ENV === 'production' && {
      secure: true,
      sameSite: 'strict',
    }),
  })
  
  console.log('✅ Auth cookie set successfully')
}

/**
 * Get the authentication cookie from the request
 */
export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(COOKIE_NAME)
  return cookie?.value
}

/**
 * Get the current authenticated user from the cookie
 * Returns null if not authenticated or token is invalid
 */
export async function getCurrentUser() {
  try {
    const token = await getAuthCookie()
    
    if (!token) {
      console.log('ℹ️ No auth token found')
      return null
    }
    
    const payload = await verifyToken(token)
    
    if (!payload) {
      console.log('❌ Invalid or expired token')
      return null
    }
    
    // Check if token is expired
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      console.log('❌ Token expired')
      return null
    }
    
    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        fullName: true,
        companyName: true,
        email: true,
        role: true,
        emailVerified: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
      },
    })
    
    if (!user) {
      console.log('❌ User not found for token')
      return null
    }
    
    if (!user.isActive) {
      console.log('❌ User account is deactivated')
      return null
    }
    
    console.log('✅ User authenticated:', user.email)
    return user
    
  } catch (error) {
    console.error('❌ Error getting current user:', error)
    return null
  }
}

/**
 * Clear the authentication cookie (logout)
 */
export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies()
  
  cookieStore.set(COOKIE_NAME, '', {
    ...COOKIE_OPTIONS,
    maxAge: 0, // Expire immediately
    expires: new Date(0), // Set to past date
  })
  
  console.log('✅ Auth cookie cleared')
}

/**
 * Create a session in the database for tracking
 */
export async function createSession(
  userId: string,
  token: string,
  userAgent?: string,
  ipAddress?: string
) {
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7) // 7 days from now
  
  return prisma.session.create({
    data: {
      userId,
      token,
      userAgent,
      ipAddress,
      expiresAt,
    },
  })
}

/**
 * Invalidate a session (used for logout)
 */
export async function invalidateSession(token: string) {
  return prisma.session.deleteMany({
    where: { token },
  })
}

/**
 * Clean up expired sessions
 */
export async function cleanupExpiredSessions() {
  return prisma.session.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  })
}

/**
 * Check if user has required role
 */
export function hasRole(userRole: Role, requiredRoles: Role[]): boolean {
  return requiredRoles.includes(userRole)
}

/**
 * Create an audit log entry
 */
export async function createAuditLog(
  action: string,
  entity: string,
  entityId?: string,
  userId?: string,
  details?: Record<string, any>
) {
  return prisma.auditLog.create({
    data: {
      action,
      entity,
      entityId,
      userId,
      details: details || {},
    },
  })
}