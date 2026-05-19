// app/api/auth/register/route.ts
// Register API endpoint - Handles user registration

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, companyName, email, password } = body;

    // Basic validation
    if (!fullName || !companyName || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Password strength validation
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database registration
    // Check if user already exists in your database
    // Hash the password before storing
    
    // For demo purposes, always succeed
    // In production, save to database here

    // Auto-login after registration
    const cookieStore = await cookies();
    
    cookieStore.set('auth-token', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    cookieStore.set('user-data', JSON.stringify({
      name: fullName,
      email: email,
      company: companyName,
      role: 'applicant',
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      user: {
        name: fullName,
        email: email,
        company: companyName,
        role: 'applicant',
      },
      redirectTo: '/dashboard',
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}