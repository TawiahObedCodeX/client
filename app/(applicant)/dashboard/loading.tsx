// app/dashboard/loading.tsx
import React from "react";
import { PremiumDashboardSkeleton } from "@/components/common/Loader";

export default function DashboardSubRouteLoading() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10">
      <PremiumDashboardSkeleton />
    </div>
  );
}