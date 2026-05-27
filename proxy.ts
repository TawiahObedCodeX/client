// proxy.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const proxy = withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Public routes (no auth required)
    const publicRoutes = ["/", "/verify", "/login", "/register", "/forgot-password", "/reset-password"];
    if (publicRoutes.some(route => path.startsWith(route))) {
      return NextResponse.next();
    }

    // Role-based access control
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const role = token.role as string;

    // Applicant routes
    if (path.startsWith("/(applicant)") || path.startsWith("/applications") || path.startsWith("/certificates") || path.startsWith("/profile")) {
      if (role !== "APPLICANT" && role !== "OFFICER" && role !== "ADMIN") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    // Officer routes
    if (path.startsWith("/officer")) {
      if (role !== "OFFICER" && role !== "SENIOR_OFFICER" && role !== "ADMIN") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    // Admin routes
    if (path.startsWith("/admin")) {
      if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|logo.svg).*)",
  ],
};