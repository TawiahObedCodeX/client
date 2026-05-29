// proxy.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const proxy = auth((req) => {
  // Safely access token with custom properties
  const token = req.auth as any;   // ← explicit cast for now
  const path = req.nextUrl.pathname;

  const publicRoutes = ["/", "/verify", "/login", "/register", "/forgot-password", "/reset-password"];
  if (publicRoutes.some(route => path.startsWith(route))) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = token.role as string;

  if (path.startsWith("/applications") || path.startsWith("/certificates") || path.startsWith("/profile")) {
    if (!["APPLICANT", "OFFICER", "ADMIN"].includes(role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  if (path.startsWith("/officer")) {
    if (!["OFFICER", "SENIOR_OFFICER", "ADMIN"].includes(role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  if (path.startsWith("/admin")) {
    if (!["ADMIN", "SUPER_ADMIN"].includes(role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|logo.svg).*)",
  ],
};