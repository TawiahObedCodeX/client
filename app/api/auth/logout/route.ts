// app/api/auth/logout/route.ts
// Complete logout endpoint

import { NextRequest, NextResponse } from 'next/server'
import { getAuthCookie, verifyToken, clearAuthCookie, invalidateSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    console.log('=== LOGOUT API CALLED ===')

    // Get current token
    const token = await getAuthCookie()
    
    if (token) {
      // Verify and invalidate session
      const payload = await verifyToken(token)
      if (payload) {
        await invalidateSession(token)
        console.log('✅ Session invalidated for user:', payload.email)
      }
    }

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
      redirectTo: '/',
    })

    // Clear auth cookie
    await clearAuthCookie()

    console.log('✅ Logout complete')
    return response

  } catch (error) {
    console.error('❌ Logout error:', error)
    return NextResponse.json(
      { error: 'Logout failed. Please try again.' },
      { status: 500 }
    )
  }
}