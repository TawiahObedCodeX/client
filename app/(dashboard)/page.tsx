// ─────────────────────────────────────────────────
// app/(dashboard)/page.tsx - Main Dashboard Page
// Displays user info, stats, and recent applications
// Version: 2026.1.0
// ─────────────────────────────────────────────────

"use client"

import { useEffect, useState } from "react"
import { DashboardCards } from "@/components/dashboard/DashboardCards"
import { RecentApplicationsTable } from "@/components/dashboard/RecentApplicationsTable"
import { Button } from "@/components/ui/button"
import {
  PlusCircle,
  FileText,
  Clock,
  TrendingUp,
  Loader2,
  AlertCircle,
  RefreshCw,
  Activity,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

// ─────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────
interface UserData {
  id: string
  name: string
  email: string
  company: string
  role: string
  verified: boolean
  lastLogin: string
  memberSince: string
}

interface DashboardStats {
  title: string
  value: string
  change: string
  icon: any
  trend: "up" | "down" | "warning"
}

interface Application {
  id: string
  product: string
  category: string
  status: string
  submittedDate: string
  lastUpdated: string
}

// ─────────────────────────────────────────────────
// Main Dashboard Component
// ─────────────────────────────────────────────────
export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [userError, setUserError] = useState("")
  const [stats, setStats] = useState<DashboardStats[]>([])
  const [recentApplications, setRecentApplications] = useState<Application[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Fetch user data
  const fetchUserData = async () => {
    setIsLoadingUser(true)
    setUserError("")

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const response = await fetch("/api/auth/me", {
        credentials: "include",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.status === 401) {
        console.log("❌ Not authenticated, redirecting to login")
        router.push("/login?redirect=/dashboard")
        return
      }

      if (!response.ok) {
        throw new Error("Failed to fetch user data")
      }

      const data = await response.json()
      console.log("✅ User data loaded:", data.user)

      if (data.user) {
        setUser(data.user)
        
        // Show welcome toast on first load
        const hasSeenWelcome = sessionStorage.getItem("dashboard_welcome")
        if (!hasSeenWelcome) {
          toast.success(`Welcome back, ${data.user.name.split(" ")[0]}! 👋`)
          sessionStorage.setItem("dashboard_welcome", "true")
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load user data"
      console.error("❌ Failed to load user:", message)
      
      if (message.includes("abort")) {
        setUserError("Request timed out. Please check your connection.")
      } else {
        setUserError(message)
      }
    } finally {
      setIsLoadingUser(false)
    }
  }

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      // This would be a real API call in production
      // For now, we simulate with mock data
      await new Promise((resolve) => setTimeout(resolve, 300))

      setStats([
        {
          title: "Total Applications",
          value: "12",
          change: "+3 this month",
          icon: FileText,
          trend: "up",
        },
        {
          title: "Pending Review",
          value: "5",
          change: "2 near deadline",
          icon: Clock,
          trend: "warning",
        },
        {
          title: "Approved",
          value: "6",
          change: "92% success rate",
          icon: TrendingUp,
          trend: "up",
        },
        {
          title: "Requires Action",
          value: "1",
          change: "Response needed",
          icon: AlertTriangle,
          trend: "down",
        },
      ])

      setRecentApplications([
        {
          id: "FDA-2026-001",
          product: "Paracetamol Tablets 500mg",
          category: "Pharmaceuticals",
          status: "Under Review",
          submittedDate: "2026-03-15",
          lastUpdated: "2026-04-02",
        },
        {
          id: "FDA-2026-002",
          product: "Shea Butter Cream",
          category: "Cosmetics",
          status: "Approved",
          submittedDate: "2026-02-28",
          lastUpdated: "2026-03-20",
        },
        {
          id: "FDA-2026-003",
          product: "Breakfast Cereal",
          category: "Food Products",
          status: "Pending Payment",
          submittedDate: "2026-03-10",
          lastUpdated: "2026-03-28",
        },
        {
          id: "FDA-2026-004",
          product: "Digital Thermometer",
          category: "Medical Devices",
          status: "Draft",
          submittedDate: "2026-04-01",
          lastUpdated: "2026-04-05",
        },
      ])
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    }
  }

  // Initial data fetch
  useEffect(() => {
    console.log("=== DASHBOARD PAGE LOADED ===")
    fetchUserData()
    fetchDashboardData()
  }, [])

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await Promise.all([fetchUserData(), fetchDashboardData()])
    setIsRefreshing(false)
    toast.success("Dashboard refreshed")
  }

  // Loading state
  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#2563EB] animate-spin mx-auto mb-4" />
          <p className="text-slate-500">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (userError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            Failed to Load Dashboard
          </h3>
          <p className="text-slate-500 mb-4">{userError}</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
            <Button onClick={() => router.push("/login")}>
              Go to Login
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      {/* ═══════════════════════════════════════════
          Header Section
          ═══════════════════════════════════════════ */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-[#0F172A]">
                Welcome back{user ? `, ${user.name.split(" ")[0]}` : ""}! 👋
              </h1>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
                title="Refresh dashboard"
              >
                <RefreshCw
                  className={`w-4 h-4 text-slate-400 ${isRefreshing ? "animate-spin" : ""}`}
                />
              </button>
            </div>
            {user && (
              <p className="text-slate-500 text-sm">
                {user.company} • {user.email}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard/new-registration">
              <Button className="bg-[#2563EB] hover:bg-[#1E40AF] shadow-sm">
                <PlusCircle className="w-4 h-4 mr-2" />
                New Application
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          Quick Stats
          ═══════════════════════════════════════════ */}
      <DashboardCards stats={stats} />

      {/* ═══════════════════════════════════════════
          User Info Cards
          ═══════════════════════════════════════════ */}
      {user && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border">
            <p className="text-xs text-slate-500 mb-1">Account Status</p>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-green-700">Active</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border">
            <p className="text-xs text-slate-500 mb-1">Role</p>
            <p className="font-semibold text-[#0F172A] capitalize">{user.role}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border">
            <p className="text-xs text-slate-500 mb-1">Member Since</p>
            <p className="font-semibold text-[#0F172A]">
              {new Date(user.memberSince).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border">
            <p className="text-xs text-slate-500 mb-1">Last Login</p>
            <p className="font-semibold text-[#0F172A]">
              {user.lastLogin
                ? new Date(user.lastLogin).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "First login"}
            </p>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          Recent Applications Table
          ═══════════════════════════════════════════ */}
      <div className="mt-8">
        <RecentApplicationsTable applications={recentApplications} />
      </div>
    </div>
  )
}