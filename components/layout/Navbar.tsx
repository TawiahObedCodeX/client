// ─────────────────────────────────────────────────
// components/layout/Navbar.tsx
// Top Navigation Bar for Dashboard Pages
// Version: 2026.1.0
// ─────────────────────────────────────────────────

"use client"

import { useState, useEffect, useCallback } from "react"
import { 
  Bell, 
  Menu, 
  X, 
  User, 
  Settings, 
  LogOut, 
  Search, 
  Loader2,
  HelpCircle,
  ChevronDown,
  Shield,
  Moon,
  Sun,
  Monitor,
  CheckCircle2,
  AlertCircle,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
  avatarUrl?: string
}

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  time: string
  read: boolean
}

// ─────────────────────────────────────────────────
// Mock Notifications
// ─────────────────────────────────────────────────
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Application Update",
    message: "FDA-2026-001 has moved to 'Under Review' status",
    type: "info",
    time: "5 minutes ago",
    read: false,
  },
  {
    id: "2",
    title: "Document Verified",
    message: "Your certificate of analysis has been verified",
    type: "success",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "3",
    title: "Payment Required",
    message: "Please complete payment for application FDA-2026-003",
    type: "warning",
    time: "1 day ago",
    read: false,
  },
  {
    id: "4",
    title: "Reminder",
    message: "Your GMP certificate expires in 30 days",
    type: "warning",
    time: "3 days ago",
    read: true,
  },
  {
    id: "5",
    title: "Welcome!",
    message: "Welcome to FDA Ghana FIRMS 2026 platform",
    type: "success",
    time: "1 week ago",
    read: true,
  },
]

// ─────────────────────────────────────────────────
// Navbar Component
// ─────────────────────────────────────────────────
export function Navbar() {
  const router = useRouter()
  
  // State management
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [scrolled, setScrolled] = useState(false)

  // Fetch user data
  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.user) {
          setUser(data.user)
          console.log("✅ Navbar: User data loaded")
        }
      }
    } catch (error) {
      console.error("❌ Navbar: Failed to fetch user:", error)
    } finally {
      setIsLoadingUser(false)
    }
  }, [])

  // Initial data fetch
  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Get unread notification count
  const unreadCount = notifications.filter((n) => !n.read).length

  // Get initials for avatar
  const getInitials = (name: string): string => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // Get notification icon
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-amber-500" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Bell className="w-4 h-4 text-blue-500" />
    }
  }

  // Get notification color
  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "border-l-green-500 bg-green-50/50"
      case "warning":
        return "border-l-amber-500 bg-amber-50/50"
      case "error":
        return "border-l-red-500 bg-red-50/50"
      default:
        return "border-l-blue-500 bg-blue-50/50"
    }
  }

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    toast.success("All notifications marked as read")
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
        toast.success("Logged out successfully. Goodbye!")
        router.push("/")
        router.refresh()
      } else {
        throw new Error("Logout failed")
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.")
      console.error("❌ Logout error:", error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      toast.info(`Searching for "${searchQuery}"...`)
      // In production, redirect to search results page
    }
  }

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ═══════════════════════════════════════
              Left Side: Mobile Menu & Brand
              ═══════════════════════════════════════ */}
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Brand/Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-sm">
                F
              </div>
              <div className="hidden sm:block">
                <p className="font-semibold text-lg tracking-tight text-[#0F172A] leading-tight">
                  FDA Ghana
                </p>
                <p className="text-xs text-slate-500 -mt-0.5">
                  Regulatory Management System • 2026
                </p>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════
              Center: Search Bar
              ═══════════════════════════════════════ */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search applications, products..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
              />
            </form>
          </div>

          {/* ═══════════════════════════════════════
              Right Side: Notifications & Profile
              ═══════════════════════════════════════ */}
          <div className="flex items-center gap-2">
            {/* Notifications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-slate-100"
                >
                  <Bell className="w-5 h-5 text-slate-600" />
                  {unreadCount > 0 && (
                    <Badge
                      className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs rounded-full border-2 border-white"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>
                  <div className="flex items-center justify-between">
                    <span>Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-[#2563EB] hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="text-center py-8">
                      <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-sm text-slate-500">No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        onClick={() => markAsRead(notification.id)}
                        className={`flex items-start gap-3 p-3 border-l-4 cursor-pointer ${
                          getNotificationColor(notification.type)
                        } ${!notification.read ? "font-medium" : ""}`}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#0F172A] truncate">
                            {notification.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5 truncate">
                            {notification.message}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">{notification.time}</p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />
                        )}
                      </DropdownMenuItem>
                    ))
                  )}
                </div>
                
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-center text-sm text-[#2563EB] justify-center cursor-pointer"
                >
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 cursor-pointer hover:bg-slate-100 p-1.5 pr-3 rounded-2xl transition-colors">
                  {isLoadingUser ? (
                    <>
                      <div className="w-9 h-9 bg-slate-200 rounded-full animate-pulse" />
                      <div className="hidden md:block text-left">
                        <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
                        <div className="h-3 w-16 bg-slate-200 rounded animate-pulse mt-1" />
                      </div>
                    </>
                  ) : (
                    <>
                      <Avatar className="w-9 h-9 ring-2 ring-slate-200">
                        <AvatarImage src={user?.avatarUrl || "https://github.com/shadcn.png"} />
                        <AvatarFallback className="bg-[#2563EB] text-white text-sm">
                          {user ? getInitials(user.name) : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-medium text-[#0F172A]">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-slate-500 capitalize">
                          {user?.role || "Loading..."}
                        </p>
                      </div>
                      <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
                    </>
                  )}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user?.name || "User"}</span>
                    <span className="text-xs text-slate-500 font-normal">
                      {user?.email || "Loading..."}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => router.push("/help")}>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  {isLoggingOut ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Signing out...</span>
                    </>
                  ) : (
                    <>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                      <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          Mobile Menu
          ═══════════════════════════════════════════ */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="px-4 py-4 space-y-4 animate-fade-in">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search applications..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </form>

            {/* Mobile user info */}
            {user && (
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-[#2563EB] text-white">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-[#0F172A] text-sm">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
              </div>
            )}

            {/* Mobile logout */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-xl w-full text-sm font-medium transition-colors"
            >
              {isLoggingOut ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <LogOut className="w-5 h-5" />
              )}
              {isLoggingOut ? "Signing out..." : "Sign Out"}
            </button>
          </div>
        </div>
      )}

      {/* Keyboard shortcut helper (dev only) */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 z-40 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-full opacity-50">
          Navbar v2026.1.0
        </div>
      )}
    </nav>
  )
}