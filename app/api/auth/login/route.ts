// app/api/auth/login/route.ts
// Complete login endpoint with database integration

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyPassword } from '@/lib/password'
import { createToken, setAuthCookie, createSession, createAuditLog } from '@/lib/auth'
import { loginSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('=== LOGIN API CALLED ===')
    console.log('Email:', body.email)

    // Validate input
    const validation = loginSchema.safeParse(body)
    if (!validation.success) {
      const errors = validation.error.issues.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }))
      console.log('❌ Validation failed:', errors)
      return NextResponse.json(
        { error: 'Invalid email or password', errors },
        { status: 400 }
      )
    }

    const { email, password } = validation.data

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      console.log('❌ User not found:', email)
      // Use same error message to prevent user enumeration
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check if account is active
    if (!user.isActive) {
      console.log('❌ Inactive account:', email)
      return NextResponse.json(
        { error: 'Account is deactivated. Please contact support.' },
        { status: 403 }
      )
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password)

    if (!isPasswordValid) {
      console.log('❌ Invalid password for:', email)
      
      // Log failed attempt
      await createAuditLog(
        'LOGIN_FAILED',
        'User',
        user.id,
        user.id,
        { reason: 'Invalid password' }
      )
      
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    console.log('✅ Password verified for:', email)

    // Update last login timestamp
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    })

    // Create JWT token
    const token = await createToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    // Create session in database
    const userAgent = request.headers.get('user-agent') || undefined
    const ipAddress = request.headers.get('x-forwarded-for') || undefined
    
    await createSession(user.id, token, userAgent, ipAddress)

    // Log successful login
    await createAuditLog(
      'LOGIN_SUCCESS',
      'User',
      user.id,
      user.id,
      { ip: ipAddress }
    )

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Login successful! Welcome back.',
      user: {
        id: user.id,
        name: user.fullName,
        email: user.email,
        company: user.companyName,
        role: user.role,
      },
    })

    // Set secure HTTP-only cookie
    await setAuthCookie(token)

    console.log('✅ Login complete')
    return response

  } catch (error) {
    console.error('❌ Login error:', error)
    return NextResponse.json(
      { error: 'Login failed. Please try again later.' },
      { status: 500 }
    )
  }
}