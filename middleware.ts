// middleware.ts - Authentication Middleware
// ⭐ LOCATION: frms-fda-ghana/middleware.ts (Root of project)

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Debug logging (check browser console for server logs)
  console.log('Middleware running for path:', pathname);
  
  // Get auth token from cookies
  const authToken = request.cookies.get('auth-token');
  console.log('Auth token:', authToken?.value);
  
  const isAuthenticated = authToken?.value === 'authenticated';

  // Protected routes
  const protectedRoutes = ['/dashboard'];
  
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  // If trying to access protected route without auth
  if (isProtectedRoute && !isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Auth pages - redirect to dashboard if already authenticated
  const authRoutes = ['/login', '/register', '/forgot-password'];
  
  if (authRoutes.includes(pathname) && isAuthenticated) {
    console.log('Already authenticated, redirecting to dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
    '/forgot-password',
  ],
};