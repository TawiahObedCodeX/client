// proxy.ts - Next.js Middleware for Authentication
// Runs on every request to protected routes

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/verify',
]

// Auth routes (redirect to dashboard if already authenticated)
const AUTH_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password']

// API routes that are public
const PUBLIC_API_ROUTES = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/auth/verify-email',
  '/api/health',
]

/**
 * Verify the JWT token from cookies
 */
async function verifyAuth(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('auth-token')?.value
  
  if (!token) return false
  
  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'default-secret'
    )
    
    await jwtVerify(token, secret, {
      issuer: 'fda-ghana-firms',
      audience: 'fda-ghana-users',
    })
    
    return true
  } catch (error) {
    // Token is invalid or expired
    return false
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('=== PROXY ===')
    console.log('Path:', pathname)
  }

  // Allow public assets and Next.js internals
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/public/') ||
    pathname.includes('.') // Static files
  ) {
    return NextResponse.next()
  }

  // Check authentication
  const isAuthenticated = await verifyAuth(request)

  // Public API routes - allow through
  if (PUBLIC_API_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Protected API routes
  if (pathname.startsWith('/api/') && !isAuthenticated) {
    return NextResponse.json(
      { error: 'Unauthorized', authenticated: false },
      { status: 401 }
    )
  }

  // Check if route is public
  const isPublicRoute = PUBLIC_ROUTES.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  )

  // Check if route is an auth route
  const isAuthRoute = AUTH_ROUTES.some(route => pathname === route)

  // Protected routes - redirect to login
  if (!isPublicRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Auth routes - redirect to dashboard if already authenticated
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Allow the request
  return NextResponse.next()
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}