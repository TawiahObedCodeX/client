// app/(applicant)/dashboard/page.tsx (fixed)
"use client";

import React from "react";
import { motion } from "motion/react";
import { Layers, FilePlus2, Activity, ArrowUpRight, Shield, Compass, Building2, TrendingUp } from "lucide-react";
import Link from "next/link";
import MetricsRibbon from "@/components/dashboard/MetricsRibbon";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

// Fixed: Use a string for ease instead of array
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }  // Changed from array to string
  }
};

export default function ApplicantDashboard() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#0F172A] selection:bg-[#D4A017]/20 antialiased">
      
      {/* Premium Hero Header */}
      <div className="bg-[#0D1B2A] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#D4A017_0.8px,transparent_1px)] bg-[length:40px_40px] opacity-10" />
        
        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#D4A017]/10 border border-[#D4A017]/30 text-[#F0C040] font-mono text-sm font-bold tracking-widest">
              <Shield className="w-4 h-4" /> LIVE REGULATORY NODE
            </div>
            <h1 className="text-5xl lg:text-6xl font-heading font-black tracking-tighter leading-none">
              Compliance Command Center
            </h1>
            <p className="text-xl text-slate-400 max-w-md">Real-time oversight of your regulatory portfolio • 2026 Edition</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/applications/new" className="group flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-[#D4A017] to-[#F0C040] text-[#0D1B2A] rounded-3xl font-mono font-black text-lg tracking-widest uppercase shadow-xl hover:shadow-2xl transition-all active:scale-95">
              <FilePlus2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              NEW DOSSIER
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 py-12 space-y-12"
      >
        <motion.div variants={itemVariants}>
          <MetricsRibbon />
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Main Activity Feed + Chart */}
          <motion.section variants={itemVariants} className="xl:col-span-8 bg-white border border-[#E2E8F0] rounded-3xl shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#0D1B2A] text-white rounded-2xl">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">Portfolio Activity</h3>
                  <p className="text-slate-500">Last 30 days performance</p>
                </div>
              </div>
              <div className="text-emerald-600 font-mono text-sm font-bold">+18.4% ↑</div>
            </div>

            {/* Mock Animated Chart */}
            <div className="p-8 h-80 relative flex items-end gap-3">
              {[65, 45, 78, 55, 82, 70, 91, 68, 75, 88].map((height, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: i * 0.05, duration: 1.2, ease: "easeOut" }}
                  className="flex-1 bg-gradient-to-t from-[#D4A017] to-[#F0C040] rounded-t-xl relative group"
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-all">
                    {height}%
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-8 border-t border-slate-100">
              <div className="space-y-6">
                {[
                  { ref: "FDA-2026-0081", name: "Alpha Therapeutics Supplement", status: "Under Review", time: "2 days ago" },
                  { ref: "FDA-2026-0047", name: "Organic Immunity Booster", status: "Approved", time: "May 18" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 8 }}
                    className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl group cursor-pointer"
                  >
                    <div className="flex items-center gap-5">
                      <div className="font-mono text-sm font-bold text-[#0D1B2A]">{item.ref}</div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-5 py-2 rounded-full text-sm font-medium ${item.status === "Approved" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
                        {item.status}
                      </span>
                      <Link href={`/applications/${item.ref}`} className="p-3 text-slate-400 group-hover:text-[#0D1B2A] transition-colors">
                        <ArrowUpRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Sidebar */}
          <div className="xl:col-span-4 space-y-8">
            <motion.div variants={itemVariants} className="p-8 bg-[#0D1B2A] text-white rounded-3xl">
              <div className="flex items-center gap-4 mb-6">
                <Compass className="w-8 h-8 text-[#D4A017]" />
                <h4 className="text-xl font-semibold">Pre-Submission Checklist</h4>
              </div>
              <p className="text-slate-300 leading-relaxed">All documents must include signed Certificate of Analysis and GMP compliance certificate before submission.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 bg-white border border-[#E2E8F0] rounded-3xl">
              <div className="flex items-center gap-4 mb-6 text-[#00784A]">
                <Building2 className="w-6 h-6" />
                <h5 className="font-semibold tracking-wider">SUPPORT HUB</h5>
              </div>
              <p className="text-slate-600">Need assistance with your submission? Our regulatory experts are available 24/7.</p>
              <button className="mt-6 w-full py-4 bg-slate-100 hover:bg-slate-200 rounded-2xl font-medium transition-colors">Contact Compliance Officer</button>
            </motion.div>
          </div>
        </div>
      </motion.main>
    </div>
  );
}