// components/dashboard/MetricsRibbon.tsx
"use client";

import React from "react";
import { motion } from "motion/react";
import { Layers, Activity, ShieldCheck, Clock } from "lucide-react";

export default function MetricsRibbon() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      
      {/* Box 1 */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest">Total Submissions</p>
            <h3 className="text-2xl font-heading font-black text-[#0B132B]">03 Dossiers</h3>
          </div>
          <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#0B132B]">
            <Layers className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Box 2 */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest">Active Enforcement</p>
            <h3 className="text-2xl font-heading font-black text-blue-600">01 Pending</h3>
          </div>
          <div className="p-2 bg-blue-50 border border-blue-100 rounded-xl text-blue-600">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Box 3 */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest">Certified Permits</p>
            <h3 className="text-2xl font-heading font-black text-emerald-600">01 Active</h3>
          </div>
          <div className="p-2 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Box 4 */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest">Action Halts</p>
            <h3 className="text-2xl font-heading font-black text-amber-600">01 Stopped</h3>
          </div>
          <div className="p-2 bg-amber-50 border border-amber-100 rounded-xl text-amber-600">
            <Clock className="w-4 h-4" />
          </div>
        </div>
      </div>

    </div>
  );
}