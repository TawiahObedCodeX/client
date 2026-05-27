// app/(applicant)/applications/[id]/page.tsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import { Clock, Activity, FileCheck2, ShieldAlert, ArrowLeft, Download, CheckCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function ApplicationTrackingProfile() {
  const { id } = useParams();

  const timeline = [
    { step: "Submitted", date: "May 20, 2026", status: "completed" },
    { step: "Document Validation", date: "May 22, 2026", status: "completed" },
    { step: "Scientific Review", date: "In Progress", status: "active" },
    { step: "Lab Analysis", date: "Pending", status: "pending" },
    { step: "Final Approval", date: "Pending", status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] overflow-y-auto">
      {/* Header */}
      <div className="bg-[#0D1B2A] text-white sticky top-0 z-10 border-b border-slate-900">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-4 text-sm font-mono tracking-widest">
              <ArrowLeft className="w-4 h-4" /> BACK TO DASHBOARD
            </Link>
            <h1 className="text-4xl font-mono font-black tracking-tight">{id}</h1>
            <p className="text-[#D4A017] font-medium mt-1">UNDER SCIENTIFIC EVALUATION</p>
          </div>

          <div className="bg-white/10 border border-white/20 px-6 py-4 rounded-2xl flex items-center gap-4">
            <Clock className="w-8 h-8 text-[#F0C040]" />
            <div>
              <p className="text-xs font-mono uppercase tracking-widest">SLA Remaining</p>
              <p className="text-2xl font-bold text-[#F0C040]">12 Days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Timeline */}
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-[#E2E8F0] p-10"
          >
            <h3 className="text-2xl font-semibold mb-10 flex items-center gap-4">
              <Activity className="w-6 h-6 text-[#0D1B2A]" /> APPLICATION PROGRESS
            </h3>

            <div className="space-y-10 pl-6 border-l-2 border-slate-200">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className={`absolute -left-[29px] top-1 w-8 h-8 rounded-2xl flex items-center justify-center border-4 border-white ${item.status === "completed" ? "bg-emerald-100 text-emerald-600" : item.status === "active" ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-400"}`}>
                    {item.status === "completed" ? <CheckCircle className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                  </div>
                  <div className="ml-2">
                    <div className="font-semibold text-lg">{item.step}</div>
                    <div className="text-slate-500 text-sm">{item.date}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-8">
          {/* Documents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl border border-[#E2E8F0] p-8"
          >
            <h4 className="font-mono uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
              <FileCheck2 className="w-5 h-5" /> ATTACHED DOCUMENTS
            </h4>
            <div className="space-y-4">
              {["Product_Specification.pdf", "Certificate_of_Analysis.pdf", "Labelling_Artwork.pdf"].map((doc, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                  <span className="text-sm">{doc}</span>
                  <button className="text-[#0D1B2A] hover:text-[#D4A017]"><Download className="w-5 h-5" /></button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* SLA Warning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-amber-50 border border-amber-200 rounded-3xl p-8"
          >
            <div className="flex items-start gap-4">
              <ShieldAlert className="w-7 h-7 text-amber-600 mt-1" />
              <div>
                <h5 className="font-semibold text-amber-800">SLA Clock Status</h5>
                <p className="text-amber-700 text-sm mt-3 leading-relaxed">The statutory timeline is currently active. Additional information may pause the clock.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}