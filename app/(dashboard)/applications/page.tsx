// ─────────────────────────────────────────────────
// app/(dashboard)/applications/page.tsx
// My Applications Page
// Version: 2026.1.0
// ─────────────────────────────────────────────────

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Search,
  Filter,
  Download,
  PlusCircle,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"

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

// ─────────────────────────────────────────────────
// Status configuration
// ─────────────────────────────────────────────────
const statusConfig: Record<string, { color: string; icon: any; label: string }> = {
  Draft: {
    color: "bg-slate-100 text-slate-700 border-slate-200",
    icon: FileText,
    label: "Draft",
  },
  Submitted: {
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: Clock,
    label: "Submitted",
  },
  "Under Review": {
    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
    icon: Eye,
    label: "Under Review",
  },
  "Pending Payment": {
    color: "bg-amber-100 text-amber-700 border-amber-200",
    icon: AlertCircle,
    label: "Pending Payment",
  },
  Approved: {
    color: "bg-green-100 text-green-700 border-green-200",
    icon: CheckCircle2,
    label: "Approved",
  },
  Rejected: {
    color: "bg-red-100 text-red-700 border-red-200",
    icon: XCircle,
    label: "Rejected",
  },
}

// ─────────────────────────────────────────────────
// Mock Data
// ─────────────────────────────────────────────────
const mockApplications: Application[] = [
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
    product: "Shea Butter Moisturizing Cream",
    category: "Cosmetics",
    status: "Approved",
    submittedDate: "2026-02-28",
    lastUpdated: "2026-03-20",
  },
  {
    id: "FDA-2026-003",
    product: "Fortified Breakfast Cereal",
    category: "Food Products",
    status: "Pending Payment",
    submittedDate: "2026-03-10",
    lastUpdated: "2026-03-28",
  },
  {
    id: "FDA-2026-004",
    product: "Digital Thermometer X200",
    category: "Medical Devices",
    status: "Draft",
    submittedDate: "2026-04-01",
    lastUpdated: "2026-04-05",
  },
  {
    id: "FDA-2026-005",
    product: "Herbal Immune Booster",
    category: "Herbal Products",
    status: "Submitted",
    submittedDate: "2026-03-20",
    lastUpdated: "2026-03-25",
  },
  {
    id: "FDA-2026-006",
    product: "Bleach Cleaner Pro",
    category: "Household Chemicals",
    status: "Rejected",
    submittedDate: "2026-02-15",
    lastUpdated: "2026-03-01",
  },
  {
    id: "FDA-2026-007",
    product: "Vitamin C Supplement",
    category: "Food Supplements",
    status: "Approved",
    submittedDate: "2026-01-10",
    lastUpdated: "2026-02-15",
  },
  {
    id: "FDA-2026-008",
    product: "Surgical Mask Type II",
    category: "Medical Devices",
    status: "Under Review",
    submittedDate: "2026-04-10",
    lastUpdated: "2026-04-18",
  },
]

// ─────────────────────────────────────────────────
// Applications Page Component
// ─────────────────────────────────────────────────
export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [applications] = useState<Application[]>(mockApplications)

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || app.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A]">My Applications</h1>
            <p className="text-slate-500 mt-1">
              View and manage all your submitted applications
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Link href="/dashboard/new-registration">
              <Button size="sm" className="bg-[#2563EB] hover:bg-[#1E40AF]">
                <PlusCircle className="w-4 h-4 mr-2" />
                New Application
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by product, ID, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#2563EB] bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="Draft">Draft</option>
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Pending Payment">Pending Payment</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#2563EB]" />
              All Applications ({filteredApplications.length})
            </span>
          </CardTitle>
          <CardDescription>
            Showing {filteredApplications.length} of {applications.length} applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">
                    Application ID
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">
                    Product
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 hidden md:table-cell">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 hidden lg:table-cell">
                    Submitted
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
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-slate-500">
                      <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="font-medium">No applications found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app) => {
                    const status = statusConfig[app.status] || statusConfig["Draft"]
                    const StatusIcon = status.icon

                    return (
                      <tr
                        key={app.id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <span className="font-mono text-sm font-medium text-[#2563EB]">
                            {app.id}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium text-[#0F172A]">
                            {app.product}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600 hidden md:table-cell">
                          {app.category}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${status.color}`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600 hidden lg:table-cell">
                          {app.submittedDate}
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600 hidden lg:table-cell">
                          {app.lastUpdated}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                            <span className="hidden sm:inline ml-1">View</span>
                          </Button>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}