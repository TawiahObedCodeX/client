// app/api/auth/logout/route.ts
// Logout API endpoint - Clears authentication cookies

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    
    // Clear auth cookies
    cookieStore.delete('auth-token');
    cookieStore.delete('user-data');

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
      redirectTo: '/',
    });

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}