// middleware.ts - Authentication Middleware
// ⭐ LOCATION: frms-fda-ghana/middleware.ts (Root of project)
// Protects dashboard routes and redirects authenticated users

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for authentication token (you'll need to implement actual auth)
  const isAuthenticated = request.cookies.has('auth-token');

  // Protected routes - redirect to login if not authenticated
  const protectedRoutes = [
    '/dashboard', 
    '/dashboard/new-registration', 
    '/dashboard/applications', 
    '/dashboard/track', 
    '/dashboard/profile', 
    '/dashboard/settings'
  ];

  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Auth pages - redirect to dashboard if already authenticated
  const authRoutes = ['/login', '/register', '/forgot-password'];
  
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
    '/forgot-password',
  ],
};