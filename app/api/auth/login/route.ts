// app/api/auth/login/route.ts
// Login API endpoint - Handles user authentication

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database authentication
    if (email === 'demo@fda.gov.gh' && password === 'password123') {
      
      // Create the response first
      const response = NextResponse.json({
        success: true,
        message: 'Login successful',
        user: {
          name: 'Tawiah O.',
          email: email,
          role: 'applicant',
        },
        redirectTo: '/dashboard',
      });

      // Set cookies on the response
      response.cookies.set('auth-token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      response.cookies.set('user-data', JSON.stringify({
        name: 'Tawiah O.',
        email: email,
        role: 'applicant',
      }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
        path: '/',
      });

      return response;

    } else {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}