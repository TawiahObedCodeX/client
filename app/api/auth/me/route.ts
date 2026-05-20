// app/api/auth/me/route.ts
// Get current authenticated user endpoint

import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

export async function GET() {
  try {
    console.log('=== GET CURRENT USER ===')

    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Not authenticated',
          authenticated: false,
        },
        { status: 401 }
      )
    }

    console.log('✅ User found:', user.email)

    return NextResponse.json({
      success: true,
      authenticated: true,
      user: {
        id: user.id,
        name: user.fullName,
        email: user.email,
        company: user.companyName,
        role: user.role,
        verified: user.emailVerified,
        lastLogin: user.lastLoginAt,
        memberSince: user.createdAt,
      },
    })

  } catch (error) {
    console.error('❌ Get user error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to get user data',
        authenticated: false,
      },
      { status: 500 }
    )
  }
}