// ─────────────────────────────────────────────────
// components/dashboard/RecentApplicationsTable.tsx
// Recent Applications Table Component
// Version: 2026.1.0
// ─────────────────────────────────────────────────

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ChevronRight,
  Eye,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Loader2,
  ArrowUpDown,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// ─────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────
interface Application {
  id: string
  product: string
  category: string
  status: string
  submittedDate: string
  lastUpdated: string
}

interface RecentApplicationsTableProps {
  applications: Application[]
  isLoading?: boolean
  showViewAll?: boolean
}

// ─────────────────────────────────────────────────
// Status Configuration
// ─────────────────────────────────────────────────
const statusConfig: Record<string, { color: string; icon: any }> = {
  Approved: {
    color: "bg-green-100 text-green-700 border-green-200",
    icon: CheckCircle2,
  },
  "Under Review": {
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: Clock,
  },
  "Pending Payment": {
    color: "bg-amber-100 text-amber-700 border-amber-200",
    icon: AlertCircle,
  },
  Draft: {
    color: "bg-slate-100 text-slate-700 border-slate-200",
    icon: FileText,
  },
  Submitted: {
    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
    icon: FileText,
  },
  Rejected: {
    color: "bg-red-100 text-red-700 border-red-200",
    icon: XCircle,
  },
}

// ─────────────────────────────────────────────────
// Sort configuration
// ─────────────────────────────────────────────────
type SortField = "id" | "product" | "category" | "status" | "submittedDate" | "lastUpdated"
type SortDirection = "asc" | "desc"

// ─────────────────────────────────────────────────
// Recent Applications Table Component
// ─────────────────────────────────────────────────
export function RecentApplicationsTable({
  applications,
  isLoading = false,
  showViewAll = true,
}: RecentApplicationsTableProps) {
  const [sortField, setSortField] = useState<SortField>("submittedDate")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [selectedRow, setSelectedRow] = useState<string | null>(null)

  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Sort applications
  const sortedApplications = [...applications].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    const modifier = sortDirection === "asc" ? 1 : -1
    return aValue < bValue ? -1 * modifier : aValue > bValue ? 1 * modifier : 0
  })

  // Get sort icon
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 text-slate-400" />
    }
    return (
      <ArrowUpDown
        className={cn(
          "w-3 h-3",
          sortDirection === "asc" ? "text-[#2563EB]" : "text-[#2563EB] rotate-180"
        )}
      />
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3">
                <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-32 bg-slate-200 rounded animate-pulse flex-1" />
                <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Empty state
  if (!applications || applications.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No applications yet</p>
            <p className="text-sm text-slate-400 mt-1">
              Start by creating a new product registration
            </p>
            <Link href="/dashboard/new-registration">
              <Button className="mt-4 bg-[#2563EB] hover:bg-[#1E40AF]" size="sm">
                New Application
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Recent Applications</CardTitle>
            <CardDescription>
              Showing {sortedApplications.length} application{sortedApplications.length !== 1 ? "s" : ""}
            </CardDescription>
          </div>
          {showViewAll && (
            <Link href="/dashboard/applications">
              <Button variant="ghost" size="sm" className="text-[#2563EB]">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th
                  className="text-left py-3 px-4 text-sm font-medium text-slate-500 cursor-pointer hover:text-slate-700 transition-colors"
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center gap-1">
                    Application ID
                    {getSortIcon("id")}
                  </div>
                </th>
                <th
                  className="text-left py-3 px-4 text-sm font-medium text-slate-500 cursor-pointer hover:text-slate-700 transition-colors"
                  onClick={() => handleSort("product")}
                >
                  <div className="flex items-center gap-1">
                    Product
                    {getSortIcon("product")}
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 hidden md:table-cell">
                  Category
                </th>
                <th
                  className="text-left py-3 px-4 text-sm font-medium text-slate-500 cursor-pointer hover:text-slate-700 transition-colors"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center gap-1">
                    Status
                    {getSortIcon("status")}
                  </div>
                </th>
                <th
                  className="text-left py-3 px-4 text-sm font-medium text-slate-500 hidden lg:table-cell cursor-pointer hover:text-slate-700 transition-colors"
                  onClick={() => handleSort("submittedDate")}
                >
                  <div className="flex items-center gap-1">
                    Submitted
                    {getSortIcon("submittedDate")}
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 hidden lg:table-cell">
                  Last Updated
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedApplications.map((app) => {
                const status = statusConfig[app.status] || statusConfig["Draft"]
                const StatusIcon = status.icon
                const isSelected = selectedRow === app.id

                return (
                  <tr
                    key={app.id}
                    className={cn(
                      "border-b border-slate-100 transition-colors cursor-pointer",
                      isSelected
                        ? "bg-blue-50 hover:bg-blue-100"
                        : "hover:bg-slate-50"
                    )}
                    onClick={() =>
                      setSelectedRow(isSelected ? null : app.id)
                    }
                  >
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm font-semibold text-[#2563EB]">
                        {app.id}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <span className="font-medium text-[#0F172A] text-sm">
                          {app.product}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 hidden md:table-cell">
                      {app.category}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
                          status.color
                        )}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 hidden lg:table-cell">
                      {app.submittedDate}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 hidden lg:table-cell">
                      {app.lastUpdated}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/dashboard/track?id=${app.id}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button variant="ghost" size="sm" className="text-[#2563EB]">
                          <Eye className="w-4 h-4" />
                          <span className="hidden sm:inline ml-1">View</span>
                        </Button>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Showing {sortedApplications.length} of {applications.length} applications
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}