// components/dashboard/MetricsRibbon.tsx
"use client";

import React from "react";
import { motion } from "motion/react";
import { Layers, Activity, ShieldCheck, Clock } from "lucide-react";

export default function MetricsRibbon() {
  const metrics = [
    { label: "Total Dossiers", value: "03", color: "#0D1B2A", icon: Layers, trend: "+1 this month" },
    { label: "Under Review", value: "01", color: "#2563EB", icon: Activity, trend: "Active" },
    { label: "Approved", value: "01", color: "#10B981", icon: ShieldCheck, trend: "Certified" },
    { label: "On Hold", value: "01", color: "#D97706", icon: Clock, trend: "SLA Paused" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {metrics.map((m, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-slate-500">{m.label}</p>
              <p className="text-5xl font-black mt-4 text-[#0D1B2A]">{m.value}</p>
            </div>
            <div className="p-4 rounded-2xl" style={{ backgroundColor: `${m.color}10` }}>
              <m.icon className="w-7 h-7" style={{ color: m.color }} />
            </div>
          </div>
          <p className="text-sm text-emerald-600 mt-6 font-medium">{m.trend}</p>
        </motion.div>
      ))}
    </div>
  );
}