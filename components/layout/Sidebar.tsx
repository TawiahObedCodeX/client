// ─────────────────────────────────────────────────
// components/layout/Sidebar.tsx
// Left Sidebar Navigation for Dashboard
// Version: 2026.1.0
// ─────────────────────────────────────────────────

"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Clock,
  User,
  Settings,
  LogOut,
  HelpCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Bell,
  TrendingUp,
  BarChart3,
  Users,
  Shield,
  Star,
  MessageSquare,
  Calendar,
  AlertTriangle,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

// ─────────────────────────────────────────────────
// Navigation Configuration
// ─────────────────────────────────────────────────
interface NavItem {
  label: string
  icon: any
  href: string
  description: string
  badge?: string
  badgeColor?: string
  disabled?: boolean
}

const mainNavItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    description: "Overview & statistics",
  },
  {
    label: "New Registration",
    icon: PlusCircle,
    href: "/dashboard/new-registration",
    description: "Submit new application",
    badge: "New",
    badgeColor: "bg-green-500",
  },
  {
    label: "My Applications",
    icon: FileText,
    href: "/dashboard/applications",
    description: "View all applications",
    badge: "12",
    badgeColor: "bg-blue-500",
  },
  {
    label: "Track Status",
    icon: Clock,
    href: "/dashboard/track",
    description: "Monitor progress",
  },
]

const accountNavItems: NavItem[] = [
  {
    label: "Profile",
    icon: User,
    href: "/dashboard/profile",
    description: "Account settings",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    description: "System preferences",
  },
]

const otherNavItems: NavItem[] = [
  {
    label: "Reports",
    icon: BarChart3,
    href: "/dashboard/reports",
    description: "Generate reports",
    disabled: true,
  },
  {
    label: "Messages",
    icon: MessageSquare,
    href: "/dashboard/messages",
    description: "Communication",
    badge: "3",
    badgeColor: "bg-amber-500",
    disabled: true,
  },
  {
    label: "Calendar",
    icon: Calendar,
    href: "/dashboard/calendar",
    description: "Schedule & deadlines",
    disabled: true,
  },
]

// ─────────────────────────────────────────────────
// Sidebar Component
// ─────────────────────────────────────────────────
export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [user, setUser] = useState<{ name: string; role: string } | null>(null)

  // Load collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sidebar_collapsed")
    if (saved === "true") {
      setIsCollapsed(true)
    }
  }, [])

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        })
        if (response.ok) {
          const data = await response.json()
          if (data.user) {
            setUser({
              name: data.user.name,
              role: data.user.role,
            })
          }
        }
      } catch (error) {
        console.error("Failed to fetch user:", error)
      }
    }
    fetchUser()
  }, [])

  // Toggle collapse
  const toggleCollapse = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem("sidebar_collapsed", String(newState))
  }

  // Handle logout
  const handleLogout = async () => {
    setIsLoggingOut(true)

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })

      if (response.ok) {
        toast.success("Logged out successfully")
        router.push("/")
        router.refresh()
      } else {
        throw new Error("Logout failed")
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.")
    } finally {
      setIsLoggingOut(false)
    }
  }

  // Check if a nav item is active
  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(href)
  }

  // Render nav section
  const renderNavSection = (title: string, items: NavItem[]) => (
    <div className="mb-6">
      {!isCollapsed && (
        <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2 px-3">
          {title}
        </p>
      )}
      <nav className="space-y-1">
        {items.map((item) => {
          const active = isActive(item.href)
          const Icon = item.icon

          if (item.disabled) {
            return (
              <div
                key={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 cursor-not-allowed opacity-60"
                title={`${item.description} (Coming soon)`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <div className="flex flex-col">
                    <span>{item.label}</span>
                    <span className="text-xs text-slate-400">{item.description}</span>
                  </div>
                )}
              </div>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative",
                active
                  ? "bg-[#2563EB] text-white shadow-md shadow-blue-200"
                  : "hover:bg-slate-100 text-slate-700 hover:text-slate-900"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 flex-shrink-0 transition-colors",
                  active ? "text-white" : "text-slate-500 group-hover:text-slate-700"
                )}
              />
              {!isCollapsed && (
                <>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "px-1.5 py-0.5 rounded-full text-[10px] font-bold text-white",
                            item.badgeColor || "bg-blue-500"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-xs",
                        active ? "text-blue-100" : "text-slate-400"
                      )}
                    >
                      {item.description}
                    </span>
                  </div>
                  {active && !isCollapsed && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-white rounded-full" />
                  )}
                </>
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col border-r bg-white h-full transition-all duration-300 relative",
          isCollapsed ? "w-20" : "w-72"
        )}
      >
        {/* ═══════════════════════════════════════
            Sidebar Header
            ═══════════════════════════════════════ */}
        <div className="p-4 border-b">
          <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
            <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-sm flex-shrink-0">
              F
            </div>
            {!isCollapsed && (
              <div>
                <div className="font-bold text-lg tracking-tighter text-[#0F172A]">FIRMS</div>
                <p className="text-xs text-slate-500 -mt-0.5">FDA Ghana • 2026</p>
              </div>
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════
            Navigation Links
            ═══════════════════════════════════════ */}
        <div className="flex-1 px-3 py-6 overflow-y-auto">
          {renderNavSection("Main Menu", mainNavItems)}
          {renderNavSection("Account", accountNavItems)}
          {renderNavSection("Other", otherNavItems)}
        </div>

        {/* ═══════════════════════════════════════
            Bottom Section
            ═══════════════════════════════════════ */}
        <div className="p-3 border-t space-y-2">
          {/* Help Link */}
          <Link
            href="/help"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-100 transition-colors",
              isCollapsed && "justify-center"
            )}
          >
            <HelpCircle className="w-5 h-5 text-slate-500 flex-shrink-0" />
            {!isCollapsed && "Help & Support"}
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-xl w-full text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
              isCollapsed && "justify-center"
            )}
          >
            {isLoggingOut ? (
              <Loader2 className="w-5 h-5 animate-spin flex-shrink-0" />
            ) : (
              <LogOut className="w-5 h-5 flex-shrink-0" />
            )}
            {!isCollapsed && (isLoggingOut ? "Signing out..." : "Sign Out")}
          </button>
        </div>

        {/* ═══════════════════════════════════════
            Collapse Toggle Button
            ═══════════════════════════════════════ */}
        <button
          onClick={toggleCollapse}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 shadow-sm transition-all z-10"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>
      </aside>

      {/* Mobile bottom navigation (visible on small screens) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t flex items-center justify-around px-2 py-2 safe-area-bottom">
        {mainNavItems.slice(0, 4).map((item) => {
          const active = isActive(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors",
                active
                  ? "text-[#2563EB]"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5",
                  active ? "text-[#2563EB]" : "text-slate-400"
                )}
              />
              <span>{item.label}</span>
            </Link>
          )
        })}
        <Link
          href="/dashboard/profile"
          className={cn(
            "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors",
            isActive("/dashboard/profile")
              ? "text-[#2563EB]"
              : "text-slate-500 hover:text-slate-700"
          )}
        >
          <User
            className={cn(
              "w-5 h-5",
              isActive("/dashboard/profile") ? "text-[#2563EB]" : "text-slate-400"
            )}
          />
          <span>Profile</span>
        </Link>
      </div>
    </>
  )
}