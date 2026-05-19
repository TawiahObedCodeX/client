// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('=== LOGIN API CALLED ===');
    console.log('Email:', email);

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // For testing: accept demo credentials OR any credentials
    const isValidDemo = email === 'demo@fda.gov.gh' && password === 'password123';
    const allowAny = true; // Set to false in production

    if (isValidDemo || allowAny) {
      // Set cookies
      const cookieStore = await cookies();
      
      cookieStore.set('auth-token', 'authenticated', {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      cookieStore.set('user-data', JSON.stringify({
        name: 'Tawiah O.',
        email: email,
        role: 'applicant',
      }), {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
        path: '/',
      });

      console.log('✅ Cookies set successfully');

      return NextResponse.json({
        success: true,
        message: 'Login successful',
        user: {
          name: 'Tawiah O.',
          email: email,
          role: 'applicant',
        },
      });
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );

  } catch (error) {
    console.error('❌ Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}