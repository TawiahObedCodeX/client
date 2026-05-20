// app/api/auth/register/route.ts
// Complete registration endpoint with database integration

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/password'
import { createToken, setAuthCookie, createSession, createAuditLog } from '@/lib/auth'
import { registerSchema } from '@/lib/validations'
import { Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('=== REGISTER API CALLED ===')
    console.log('Email:', body.email)

    // Validate input
    const validation = registerSchema.safeParse(body)
    if (!validation.success) {
      const errors = validation.error.issues.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }))
      console.log('❌ Validation failed:', errors)
      return NextResponse.json(
        { error: 'Validation failed', errors },
        { status: 400 }
      )
    }

    const { fullName, companyName, email, password } = validation.data

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      console.log('❌ User already exists:', email)
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user in transaction
    const user = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Create user
      const newUser = await tx.user.create({
        data: {
          fullName,
          companyName,
          email,
          password: hashedPassword,
          role: 'APPLICANT',
        },
        select: {
          id: true,
          fullName: true,
          companyName: true,
          email: true,
          role: true,
          createdAt: true,
        },
      })

      // Create audit log
      await tx.auditLog.create({
        data: {
          userId: newUser.id,
          action: 'USER_REGISTERED',
          entity: 'User',
          entityId: newUser.id,
          details: {
            email: newUser.email,
            company: newUser.companyName,
          },
        },
      })

      return newUser
    })

    console.log('✅ User created:', user.email)

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

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Registration successful! Welcome to FDA Ghana FIRMS.',
      user: {
        id: user.id,
        name: user.fullName,
        email: user.email,
        company: user.companyName,
        role: user.role,
        createdAt: user.createdAt,
      },
    })

    // Set secure HTTP-only cookie
    await setAuthCookie(token)

    console.log('✅ Registration complete')
    return response

  } catch (error) {
    console.error('❌ Registration error:', error)
    
    // Handle specific database errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'This email is already registered' },
          { status: 409 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Registration failed. Please try again later.' },
      { status: 500 }
    )
  }
}