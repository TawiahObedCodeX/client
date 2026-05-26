"use client";

import { motion } from "motion/react";

export function SkeletonItem({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-slate-200/80 rounded ${className}`}>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />
    </div>
  );
}

export function PremiumDashboardSkeleton() {
  return (
    <div className="w-full space-y-6 p-6 bg-[#F5F7FA] rounded-2xl border border-slate-200">
      <div className="flex justify-between items-center pb-4 border-b border-slate-200">
        <div className="space-y-2">
          <SkeletonItem className="h-6 w-56" />
          <SkeletonItem className="h-4 w-36" />
        </div>
        <SkeletonItem className="h-10 w-28 rounded-lg" />
      </div>

      {/* Metric Cards Shell */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 shadow-sm">
            <div className="flex justify-between items-center">
              <SkeletonItem className="h-4 w-24" />
              <SkeletonItem className="h-8 w-8 rounded-lg" />
            </div>
            <SkeletonItem className="h-7 w-16" />
            <SkeletonItem className="h-3 w-32" />
          </div>
        ))}
      </div>

      {/* Main Complex Data List Wireframe */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex gap-4">
          <SkeletonItem className="h-4 w-24" />
          <SkeletonItem className="h-4 w-40" />
          <SkeletonItem className="h-4 w-16" />
          <SkeletonItem className="h-4 w-20" />
        </div>
        <div className="p-4 space-y-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
              <div className="flex items-center gap-4 w-1/3">
                <SkeletonItem className="h-10 w-10 rounded-full" />
                <div className="space-y-1.5 flex-1">
                  <SkeletonItem className="h-4 w-full" />
                  <SkeletonItem className="h-3 w-2/3" />
                </div>
              </div>
              <SkeletonItem className="h-4 w-24" />
              <SkeletonItem className="h-6 w-20 rounded-full" />
              <SkeletonItem className="h-8 w-8 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}