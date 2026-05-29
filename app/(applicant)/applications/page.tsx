// app/(applicant)/applications/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApplicationsTable } from "@/components/dashboard/ApplicationsTable";
import { EmptyState } from "@/components/common/EmptyState";
import { PremiumDashboardSkeleton } from "@/components/common/Loader";

// Mock data - initially empty for new users
// In production, this would come from API based on authenticated user
const fetchApplications = async (userId: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  // Return empty array for new users - initial state is zero
  return [];
};

export default function ApplicationsListPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Get user ID from session (mock for now)
    const userId = "current-user-id";
    fetchApplications(userId).then((data) => {
      setApplications(data);
      setIsLoading(false);
    });
  }, []);

  const filteredApps = applications.filter(
    (app) =>
      app.referenceNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <PremiumDashboardSkeleton />;
  }

  if (applications.length === 0) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-[#0D1B2A]">My Applications</h1>
            <p className="text-slate-500 mt-1">Manage your product registration applications</p>
          </div>
          <Link href="/applications/new">
            <Button variant="gold" className="gap-2">
              <Plus className="w-4 h-4" /> New Application
            </Button>
          </Link>
        </div>
        <EmptyState
          title="No applications yet"
          description="Start your first product registration application with FDA Ghana."
          actionLabel="Create Application"
          actionHref="/applications/new"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-[#0D1B2A]">My Applications</h1>
          <p className="text-slate-500 mt-1">Manage your product registration applications</p>
        </div>
        <Link href="/applications/new">
          <Button variant="gold" className="gap-2">
            <Plus className="w-4 h-4" /> New Application
          </Button>
        </Link>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by reference or product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" /> Filter
        </Button>
      </div>

      <ApplicationsTable applications={filteredApps} isLoading={false} />
    </div>
  );
}