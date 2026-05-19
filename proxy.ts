// proxy.ts - ROOT OF PROJECT
// Next.js 16 uses proxy instead of middleware

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log('=== PROXY RUNNING ===');
  console.log('Path:', pathname);

  // Get auth token from cookies
  const authToken = request.cookies.get('auth-token')?.value;
  console.log('Auth token:', authToken);

  const isAuthenticated = authToken === 'authenticated';

  // Protected routes
  if (pathname.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      console.log('❌ Not authenticated - redirecting to /login');
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    console.log('✅ Authenticated - allowing dashboard access');
    return NextResponse.next();
  }

  // Auth pages - redirect if already logged in
  if ((pathname === '/login' || pathname === '/register') && isAuthenticated) {
    console.log('✅ Already authenticated - redirecting to /dashboard');
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};