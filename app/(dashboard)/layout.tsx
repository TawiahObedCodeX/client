// ─────────────────────────────────────────────────
// app/(dashboard)/layout.tsx - Dashboard Layout
// Wraps all dashboard pages with sidebar and navbar
// Version: 2026.1.0
// ─────────────────────────────────────────────────

"use client"

import { useEffect, useState, useCallback } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Sidebar } from "@/components/layout/Sidebar"
import { Loader } from "@/components/common/Loader"
import { useRouter, usePathname } from "next/navigation"
import { toast } from "sonner"

// ─────────────────────────────────────────────────
// Dashboard Layout Component
// ─────────────────────────────────────────────────
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)

  // Check authentication status
  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.authenticated) {
          setIsAuthenticated(true)
          console.log("✅ Dashboard: User authenticated")
        } else {
          console.log("❌ Dashboard: Not authenticated")
          router.push("/login?redirect=" + encodeURIComponent(pathname))
          return
        }
      } else {
        console.log("❌ Dashboard: Auth check failed")
        router.push("/login?redirect=" + encodeURIComponent(pathname))
        return
      }
    } catch (error) {
      console.error("❌ Dashboard: Auth check error:", error)
      router.push("/login")
      return
    } finally {
      setAuthChecked(true)
    }
  }, [router, pathname])

  // Initial auth check
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // Loading animation
  useEffect(() => {
    if (authChecked && isAuthenticated) {
      const timer = setTimeout(() => {
        setIsLoading(false)
        setTimeout(() => setShowContent(true), 100)
      }, 1400)

      return () => clearTimeout(timer)
    }
  }, [authChecked, isAuthenticated])

  // Show nothing while checking auth
  if (!authChecked) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <Loader size="large" />
          <p className="mt-4 text-slate-500 text-sm">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated (redirect will happen)
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      {/* Sidebar - Hidden on mobile, visible on large screens */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-auto relative p-6 lg:p-8">
          {/* Full Page Loader Overlay */}
          {isLoading && (
            <div className="full-page-loader">
              <div className="text-center">
                <Loader size="large" />
                <p className="mt-4 text-white/70 text-sm font-medium">
                  Loading Dashboard...
                </p>
              </div>
            </div>
          )}

          {/* Main Content with fade transition */}
          <div
            className={`min-h-full transition-opacity duration-500 ${
              isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            {showContent && children}
          </div>
        </main>
      </div>

      {/* Development indicator */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 left-4 z-40 bg-yellow-100 text-yellow-800 text-xs px-3 py-1.5 rounded-full border border-yellow-200 font-medium">
          📊 Dashboard Layout
        </div>
      )}
    </div>
  )
}