// app/api/auth/register/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, companyName, email, password } = body;

    console.log('Registration attempt:', { email, fullName }); // Debug log

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

    // Create response with success data
    const response = NextResponse.json({
      success: true,
      message: 'Registration successful',
      user: {
        name: fullName,
        email: email,
        company: companyName,
        role: 'applicant',
      },
    });

    // Set auth cookies on the response
    response.cookies.set({
      name: 'auth-token',
      value: 'authenticated',
      httpOnly: false, // Changed to false so client can see it
      secure: false, // Set to false for development
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    response.cookies.set({
      name: 'user-data',
      value: JSON.stringify({
        name: fullName,
        email: email,
        company: companyName,
        role: 'applicant',
      }),
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    console.log('Registration successful, cookies set'); // Debug log
    return response;

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}