// components/common/Loader.tsx (enhanced)
"use client";

import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";

export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      >
        <ShieldCheck className="w-8 h-8 text-[#D4A017]" />
      </motion.div>
      <p className="text-sm text-slate-500 font-mono animate-pulse">Loading...</p>
    </div>
  );
}

export function SkeletonItem({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-slate-200/80 rounded select-none pointer-events-none ${className}`}>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent transform-gpu"
      />
    </div>
  );
}

export function PremiumDashboardSkeleton() {
  return (
    <div className="w-full space-y-6 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
      <div className="flex justify-between items-center pb-6 border-b border-slate-100">
        <div className="space-y-2 flex-1">
          <SkeletonItem className="h-6 w-48 sm:w-64" />
          <SkeletonItem className="h-3.5 w-32 sm:w-56" />
        </div>
        <SkeletonItem className="h-10 w-44 rounded-xl hidden sm:block" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2 flex-1">
                <SkeletonItem className="h-2.5 w-20" />
                <SkeletonItem className="h-7 w-24" />
              </div>
              <SkeletonItem className="h-8 w-8 rounded-xl shrink-0" />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
        <div className="p-5 bg-slate-50/50 border-b border-slate-100">
          <SkeletonItem className="h-4 w-40" />
        </div>
        <div className="p-4 space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0 px-2">
              <div className="flex items-center gap-4 w-2/5">
                <div className="space-y-2 flex-1">
                  <SkeletonItem className="h-4 w-32" />
                  <SkeletonItem className="h-3 w-full" />
                </div>
              </div>
              <SkeletonItem className="h-5 w-14 rounded" />
              <SkeletonItem className="h-5.5 w-28 rounded-full" />
              <SkeletonItem className="h-6 w-16 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}