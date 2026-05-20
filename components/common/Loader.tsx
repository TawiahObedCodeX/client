// ─────────────────────────────────────────────────
// components/common/Loader.tsx
// Loading Spinner Component
// Version: 2026.1.0
// ─────────────────────────────────────────────────

"use client"

import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

// ─────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────
interface LoaderProps {
  size?: "small" | "medium" | "large" | "xlarge"
  color?: "primary" | "white" | "slate"
  text?: string
  fullScreen?: boolean
  className?: string
}

// ─────────────────────────────────────────────────
// Size Configuration
// ─────────────────────────────────────────────────
const sizeConfig = {
  small: {
    icon: "w-4 h-4",
    text: "text-xs",
    container: "gap-2",
  },
  medium: {
    icon: "w-8 h-8",
    text: "text-sm",
    container: "gap-3",
  },
  large: {
    icon: "w-12 h-12",
    text: "text-base",
    container: "gap-4",
  },
  xlarge: {
    icon: "w-16 h-16",
    text: "text-lg",
    container: "gap-5",
  },
}

// ─────────────────────────────────────────────────
// Color Configuration
// ─────────────────────────────────────────────────
const colorConfig = {
  primary: "text-[#2563EB]",
  white: "text-white",
  slate: "text-slate-400",
}

// ─────────────────────────────────────────────────
// Loader Component
// ─────────────────────────────────────────────────
export function Loader({
  size = "medium",
  color = "primary",
  text,
  fullScreen = false,
  className,
}: LoaderProps) {
  const sizeStyle = sizeConfig[size]
  const colorStyle = colorConfig[color]

  const loaderContent = (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        sizeStyle.container,
        className
      )}
    >
      <Loader2
        className={cn(
          "animate-spin",
          sizeStyle.icon,
          colorStyle
        )}
      />
      {text && (
        <p
          className={cn(
            "font-medium",
            sizeStyle.text,
            colorStyle
          )}
        >
          {text}
        </p>
      )}
    </div>
  )

  // Full screen overlay
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {loaderContent}
      </div>
    )
  }

  return loaderContent
}

// ─────────────────────────────────────────────────
// Page Loader (for route transitions)
// ─────────────────────────────────────────────────
export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/90 backdrop-blur-md">
      <div className="text-center">
        <Loader2 className="w-16 h-16 text-white animate-spin mx-auto mb-4" />
        <p className="text-white/70 text-sm font-medium">Loading...</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────
// Inline Loader (for buttons and small spaces)
// ─────────────────────────────────────────────────
export function InlineLoader({ className }: { className?: string }) {
  return (
    <Loader2
      className={cn("w-4 h-4 animate-spin", className)}
    />
  )
}