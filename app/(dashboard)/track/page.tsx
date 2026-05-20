// ─────────────────────────────────────────────────
// app/(dashboard)/track/page.tsx
// Track Application Status Page
// Version: 2026.1.0
// ─────────────────────────────────────────────────

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusTimeline } from "@/components/dashboard/StatusTimeline"
import {
  Clock,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  ChevronDown,
  Eye,
  Download,
  Share2,
  MessageSquare,
  HelpCircle,
} from "lucide-react"
import { toast } from "sonner"

// ─────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────
interface ApplicationTrack {
  id: string
  applicationId: string
  productName: string
  category: string
  status: string
  currentStep: number
  steps: TimelineStep[]
  estimatedCompletion: string
  assignedReviewer: string
  messages: number
  lastActivity: string
}

interface TimelineStep {
  status: string
  date: string
  completed: boolean
  current: boolean
  description?: string
}

// ─────────────────────────────────────────────────
// Mock Data
// ─────────────────────────────────────────────────
const mockApplications: ApplicationTrack[] = [
  {
    id: "1",
    applicationId: "FDA-2026-001",
    productName: "Paracetamol Tablets 500mg",
    category: "Pharmaceuticals",
    status: "Under Review",
    currentStep: 3,
    steps: [
      {
        status: "Application Submitted",
        date: "March 15, 2026",
        completed: true,
        current: false,
        description: "Application was successfully submitted with all required documents",
      },
      {
        status: "Document Verification",
        date: "March 18, 2026",
        completed: true,
        current: false,
        description: "All documents verified and accepted",
      },
      {
        status: "Under Review",
        date: "March 25, 2026",
        completed: false,
        current: true,
        description: "Application is being reviewed by the technical team",
      },
      {
        status: "Quality Assessment",
        date: "Pending",
        completed: false,
        current: false,
        description: "Product quality and safety assessment",
      },
      {
        status: "Final Decision",
        date: "Pending",
        completed: false,
        current: false,
        description: "Final approval or rejection decision",
      },
    ],
    estimatedCompletion: "April 30, 2026",
    assignedReviewer: "Dr. Abena Mensah",
    messages: 3,
    lastActivity: "2026-04-02",
  },
  {
    id: "2",
    applicationId: "FDA-2026-002",
    productName: "Shea Butter Moisturizing Cream",
    category: "Cosmetics",
    status: "Approved",
    currentStep: 5,
    steps: [
      {
        status: "Application Submitted",
        date: "February 28, 2026",
        completed: true,
        current: false,
      },
      {
        status: "Document Verification",
        date: "March 3, 2026",
        completed: true,
        current: false,
      },
      {
        status: "Under Review",
        date: "March 8, 2026",
        completed: true,
        current: false,
      },
      {
        status: "Quality Assessment",
        date: "March 15, 2026",
        completed: true,
        current: false,
      },
      {
        status: "Approved",
        date: "March 20, 2026",
        completed: true,
        current: true,
        description: "Product has been approved. Certificate issued.",
      },
    ],
    estimatedCompletion: "Completed",
    assignedReviewer: "Mr. Kwame Asante",
    messages: 0,
    lastActivity: "2026-03-20",
  },
]

// ─────────────────────────────────────────────────
// Main Track Page Component
// ─────────────────────────────────────────────────
export default function TrackPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedApplication, setSelectedApplication] = useState<ApplicationTrack | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter applications
  const filteredApplications = mockApplications.filter((app) => {
    const matchesSearch =
      app.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Handle application select
  const handleSelectApplication = (app: ApplicationTrack) => {
    setIsLoading(true)
    setSelectedApplication(null)

    // Simulate loading
    setTimeout(() => {
      setSelectedApplication(app)
      setIsLoading(false)
    }, 500)
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700 border-green-200"
      case "Under Review":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A]">Track Application Status</h1>
        <p className="text-slate-500 mt-1">
          Monitor the progress of your submitted applications in real-time
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Applications List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#2563EB]" />
                Your Applications
              </CardTitle>
              <CardDescription>
                Select an application to view its status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Filter */}
              <div className="mb-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#2563EB] bg-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              {/* Application List */}
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {filteredApplications.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm">No applications found</p>
                  </div>
                ) : (
                  filteredApplications.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => handleSelectApplication(app)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        selectedApplication?.id === app.id
                          ? "border-[#2563EB] bg-blue-50"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs text-[#2563EB] font-medium">
                          {app.applicationId}
                        </span>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(app.status)}`}
                        >
                          {app.status}
                        </span>
                      </div>
                      <p className="font-medium text-[#0F172A] text-sm">
                        {app.productName}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Last activity: {app.lastActivity}
                      </p>
                    </button>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline & Details */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Loader2 className="w-12 h-12 text-[#2563EB] animate-spin mx-auto mb-4" />
                <p className="text-slate-500">Loading application details...</p>
              </CardContent>
            </Card>
          ) : selectedApplication ? (
            <div className="space-y-6">
              {/* Application Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm text-[#2563EB] font-medium">
                          {selectedApplication.applicationId}
                        </span>
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedApplication.status)}`}
                        >
                          {selectedApplication.status}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-[#0F172A]">
                        {selectedApplication.productName}
                      </h2>
                      <p className="text-sm text-slate-500">
                        Category: {selectedApplication.category}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t">
                    <div>
                      <p className="text-xs text-slate-500">Current Step</p>
                      <p className="font-semibold text-[#0F172A]">
                        Step {selectedApplication.currentStep} of{" "}
                        {selectedApplication.steps.length}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Estimated Completion</p>
                      <p className="font-semibold text-[#0F172A]">
                        {selectedApplication.estimatedCompletion}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Reviewer</p>
                      <p className="font-semibold text-[#0F172A]">
                        {selectedApplication.assignedReviewer}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Messages</p>
                      <p className="font-semibold text-[#0F172A]">
                        {selectedApplication.messages > 0 ? (
                          <span className="text-amber-600">
                            {selectedApplication.messages} unread
                          </span>
                        ) : (
                          "None"
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#2563EB]" />
                    Application Timeline
                  </CardTitle>
                  <CardDescription>
                    Track the progress of your application through each stage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StatusTimeline steps={selectedApplication.steps} />
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#2563EB]" />
                    Actions & Communication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.info("Messaging feature coming soon")}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message Reviewer
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.info("Share feature coming soon")}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Status
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.info("Help feature coming soon")}
                    >
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Get Help
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                  Select an Application
                </h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  Choose an application from the list to view its detailed status
                  timeline and track its progress through the review process.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}