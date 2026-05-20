// ─────────────────────────────────────────────────
// components/dashboard/DashboardCards.tsx
// Dashboard Statistics Cards Grid
// Version: 2026.1.0
// ─────────────────────────────────────────────────

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon, TrendingUp, TrendingDown, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

// ─────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────
interface StatCard {
  title: string
  value: string
  change: string
  icon: LucideIcon
  trend: "up" | "down" | "warning"
  description?: string
}

interface DashboardCardsProps {
  stats: StatCard[]
  isLoading?: boolean
}

// ─────────────────────────────────────────────────
// Trend Configuration
// ─────────────────────────────────────────────────
const trendConfig = {
  up: {
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    badgeBg: "bg-green-100",
    badgeText: "text-green-700",
    borderHover: "hover:border-blue-200",
    shadowHover: "hover:shadow-blue-100",
  },
  down: {
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    badgeBg: "bg-orange-100",
    badgeText: "text-orange-700",
    borderHover: "hover:border-orange-200",
    shadowHover: "hover:shadow-orange-100",
  },
  warning: {
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-700",
    borderHover: "hover:border-amber-200",
    shadowHover: "hover:shadow-amber-100",
  },
}

// ─────────────────────────────────────────────────
// Skeleton Loader for Cards
// ─────────────────────────────────────────────────
function CardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-slate-200 rounded-xl animate-pulse" />
          <div className="w-20 h-5 bg-slate-200 rounded-full animate-pulse" />
        </div>
        <div>
          <div className="h-4 w-24 bg-slate-200 rounded animate-pulse mb-2" />
          <div className="h-8 w-16 bg-slate-200 rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  )
}

// ─────────────────────────────────────────────────
// Dashboard Cards Component
// ─────────────────────────────────────────────────
export function DashboardCards({ stats, isLoading = false }: DashboardCardsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    )
  }

  // Empty state
  if (!stats || stats.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500">No statistics available</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const colors = trendConfig[stat.trend]
        const isHovered = hoveredIndex === index

        return (
          <Card
            key={index}
            className={cn(
              "transition-all duration-300 cursor-pointer",
              colors.borderHover,
              isHovered && `shadow-lg ${colors.shadowHover}`
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <CardContent className="p-6">
              {/* Icon and Badge Row */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300",
                    colors.bgColor,
                    isHovered && "scale-110"
                  )}
                >
                  <stat.icon className={cn("w-6 h-6", colors.iconColor)} />
                </div>
                <span
                  className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1",
                    colors.badgeBg,
                    colors.badgeText
                  )}
                >
                  {stat.trend === "up" && <ArrowUpRight className="w-3 h-3" />}
                  {stat.trend === "down" && <ArrowDownRight className="w-3 h-3" />}
                  {stat.trend === "warning" && <AlertTriangle className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>

              {/* Title and Value */}
              <div>
                <p className="text-sm text-slate-500 mb-1 font-medium">
                  {stat.title}
                </p>
                <div className="flex items-baseline gap-1">
                  <p className="text-3xl font-bold text-[#0F172A] tracking-tight">
                    {stat.value}
                  </p>
                </div>
                {stat.description && (
                  <p className="text-xs text-slate-400 mt-1">{stat.description}</p>
                )}
              </div>

              {/* Progress indicator (decorative) */}
              <div className="mt-4 w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    stat.trend === "up" && "bg-linear-to-r from-blue-400 to-blue-600",
                    stat.trend === "down" && "bg-linear-to-r from-orange-400 to-orange-600",
                    stat.trend === "warning" && "bg-linear-to-r from-amber-400 to-amber-600"
                  )}
                  style={{
                    width: stat.trend === "up" ? "75%" : stat.trend === "down" ? "30%" : "50%",
                  }}
                />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}