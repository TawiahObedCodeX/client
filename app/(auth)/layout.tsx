// ─────────────────────────────────────────────────
// app/(auth)/layout.tsx - Auth Pages Layout
// Layout wrapper for login, register, and auth pages
// Version: 2026.1.0
// ─────────────────────────────────────────────────

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Sign in or create an account with FDA Ghana FIRMS",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#F8FAFC] via-blue-50/30 to-[#F8FAFC]">
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Auth page content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Development environment indicator */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 left-4 z-50 bg-yellow-100 text-yellow-800 text-xs px-3 py-1.5 rounded-full border border-yellow-200 font-medium">
          🔧 Auth Pages Layout
        </div>
      )}
    </div>
  )
}