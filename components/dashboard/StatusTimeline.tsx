// ─────────────────────────────────────────────────
// components/dashboard/StatusTimeline.tsx
// Visual Timeline for Application Status Tracking
// Version: 2026.1.0
// ─────────────────────────────────────────────────

"use client"

import { useState } from "react"
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Circle,
  ChevronDown,
  ChevronUp,
  FileText,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ─────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────
interface TimelineStep {
  status: string
  date: string
  completed: boolean
  current: boolean
  description?: string
  documents?: string[]
  reviewer?: string
  comments?: string
}

interface StatusTimelineProps {
  steps: TimelineStep[]
  isLoading?: boolean
}

// ─────────────────────────────────────────────────
// StatusTimeline Component
// ─────────────────────────────────────────────────
export function StatusTimeline({ steps, isLoading = false }: StatusTimelineProps) {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([])

  // Toggle step expansion
  const toggleStep = (index: number) => {
    setExpandedSteps((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="w-8 h-8 bg-slate-200 rounded-full animate-pulse" />
            <div className="flex-1">
              <div className="h-4 w-32 bg-slate-200 rounded animate-pulse mb-2" />
              <div className="h-3 w-24 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Empty state
  if (!steps || steps.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500">No timeline data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-0">
      {steps.map((step, index) => {
        const isExpanded = expandedSteps.includes(index)
        const isLast = index === steps.length - 1

        return (
          <div key={index} className="flex items-start gap-4">
            {/* Timeline Indicator */}
            <div className="flex flex-col items-center">
              {/* Step Circle */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 flex-shrink-0",
                  step.completed
                    ? "bg-green-100 border-green-500"
                    : step.current
                    ? "bg-blue-100 border-blue-500 ring-4 ring-blue-100"
                    : "bg-slate-100 border-slate-300"
                )}
              >
                {step.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : step.current ? (
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400" />
                )}
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div
                  className={cn(
                    "w-0.5 h-10 mt-1 transition-colors duration-300",
                    step.completed ? "bg-green-500" : "bg-slate-300"
                  )}
                />
              )}
            </div>

            {/* Step Content */}
            <div className={cn("pb-6 flex-1", isLast && "pb-0")}>
              <button
                onClick={() => toggleStep(index)}
                className="w-full text-left group"
                disabled={!step.description && !step.documents}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={cn(
                        "font-semibold text-sm transition-colors",
                        step.completed
                          ? "text-green-700"
                          : step.current
                          ? "text-blue-700"
                          : "text-slate-500"
                      )}
                    >
                      {step.status}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{step.date}</p>
                  </div>
                  {(step.description || step.documents) && (
                    <div
                      className={cn(
                        "p-1 rounded-lg transition-colors",
                        "text-slate-400 group-hover:text-slate-600 group-hover:bg-slate-100"
                      )}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="mt-3 pl-0 space-y-3 animate-fade-in">
                  {step.description && (
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-xs text-slate-600">{step.description}</p>
                    </div>
                  )}

                  {step.reviewer && (
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-medium">Reviewer:</span>
                      <span>{step.reviewer}</span>
                    </div>
                  )}

                  {step.documents && step.documents.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-slate-500">
                        Related Documents:
                      </p>
                      {step.documents.map((doc, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs text-[#2563EB] hover:underline cursor-pointer"
                        >
                          <FileText className="w-3 h-3" />
                          {doc}
                        </div>
                      ))}
                    </div>
                  )}

                  {step.comments && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                      <p className="text-xs text-amber-800">
                        <span className="font-medium">Comment: </span>
                        {step.comments}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}