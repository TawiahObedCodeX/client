// app/dashboard/page.tsx
"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  FilePlus2, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  TrendingUp, 
  Layers, 
  Search,
  ExternalLink,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import MetricsRibbon from "@/components/dashboard/MetricsRibbon";

// Mock operational data for the RegTech dossier ledger
const INITIAL_DOSSIERS = [
  { id: "FDA-DRG-2026-8841", product: "Alpha Therapeutics Vaccine Matrix", sector: "Pharma", status: "UNDER_REVIEW", slaDays: 14, date: "2026-05-20" },
  { id: "FDA-FOD-2026-3119", product: "Organic Botanical Extract Complex", sector: "Food", status: "APPROVED", slaDays: 0, date: "2026-05-18" },
  { id: "FDA-CHM-2026-0954", product: "Synthetic Disinfectant Formulation", sector: "Chemical", status: "CLOCK_STOPPED", slaDays: 45, date: "2026-05-12" },
];

export default function DashboardPage() {
  const [dossiers] = useState(INITIAL_DOSSIERS);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDossiers = dossiers.filter(d => 
    d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-[#C5A059]/20">
      
      {/* ─── TOP DEEP ADMINISTRATIVE NAVBAR ─── */}
      <header className="sticky top-0 z-40 w-full bg-[#020617] border-b border-slate-900 px-6 py-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-[#0B132B] border border-white/10 text-[#E5C483]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black text-[11px] uppercase tracking-wider">FDA GHANA FRMS</span>
            <span className="font-mono text-[8px] font-bold text-slate-400 tracking-widest uppercase">Client Control Terminal</span>
          </div>
        </div>

        <div className="flex items-center gap-4 font-mono text-[10px] font-bold tracking-wider">
          <span className="text-slate-400 hidden sm:inline">Active Node: <span className="text-emerald-400">GHA-ACC-01</span></span>
          <Link href="/login" className="px-3 py-1.5 rounded border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-slate-300">
            Disconnect
          </Link>
        </div>
      </header>

      {/* ─── CORE BENTO WORKSPACE INNER GRID ─── */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-6">
        
        {/* Welcome Block Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-heading font-black tracking-tight text-[#0B132B]">Enterprise Dashboard</h1>
            <p className="text-xs text-slate-500">Manage statutory application files, monitor laboratory evaluation tracks, and maintain compliance standards.</p>
          </div>
          
          <button className="w-fit px-5 py-3 rounded-xl bg-[#0B132B] hover:bg-[#162347] text-white text-[11px] font-mono uppercase tracking-widest font-bold shadow-md active:scale-98 transition-all flex items-center gap-2 cursor-pointer group">
            <FilePlus2 className="w-4 h-4 text-[#C5A059]" />
            <span>Launch New Filing Dossier</span>
          </button>
        </div>

        {/* ─── METRICS RIBBON CUSTOM BENTO COMPONENT ─── */}
        <MetricsRibbon />

        {/* ─── TWO-COLUMN ASYMMETRICAL KINETIC GRID ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT INTERACTIVE MODULE: THE DOSSIER LEDGER LIST (8 Columns) */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden flex flex-col"
          >
            {/* Header Control Search Tray */}
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0B132B]" />
                <h3 className="text-xs font-mono font-black uppercase tracking-wider text-[#0B132B]">Active Applications Registry</h3>
              </div>
              
              <div className="relative max-w-xs w-full">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input 
                  type="text" 
                  placeholder="Query Registry Ref..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#C5A059] transition-all font-mono"
                />
              </div>
            </div>

            {/* Structured Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/20 text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest">
                    <th className="p-4 pl-6">Dossier Tracking Matrix</th>
                    <th className="p-4">Operational Sector</th>
                    <th className="p-4">SLA Control Status</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-slate-100 font-medium">
                  {filteredDossiers.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="p-4 pl-6 space-y-1">
                        <span className="font-mono font-bold text-[#0B132B] block">{item.id}</span>
                        <span className="text-slate-500 font-normal block max-w-xs truncate">{item.product}</span>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-slate-100 border border-slate-200/40 text-slate-600">
                          {item.sector}
                        </span>
                      </td>
                      <td className="p-4">
                        {item.status === "APPROVED" && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold">
                            <CheckCircle2 className="w-3 h-3" /> Ledger Active
                          </span>
                        )}
                        {item.status === "UNDER_REVIEW" && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-blue-50 text-blue-700 border border-blue-100 font-bold">
                            <Activity className="w-3 h-3 animate-pulse" /> Evaluating ({item.slaDays}d left)
                          </span>
                        )}
                        {item.status === "CLOCK_STOPPED" && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-amber-50 text-amber-700 border border-amber-100 font-bold">
                            <Clock className="w-3 h-3" /> Clock Stopped ({item.slaDays}d)
                          </span>
                        )}
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <button className="p-1 rounded text-slate-400 hover:text-[#0B132B] hover:bg-slate-100 transition-all inline-flex items-center gap-1 cursor-pointer font-mono text-[10px] font-bold uppercase tracking-wider">
                          Dossier <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredDossiers.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-xs text-slate-400 font-mono">
                        No operational dossiers matching query parameters found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* RIGHT FIXED PANEL: REGULATORY MESSAGING & NOTICES (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Regulatory Notice Card */}
            <motion.section 
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 bg-[#020617] text-white rounded-2xl border border-slate-900 shadow-md relative overflow-hidden flex flex-col justify-between space-y-6"
            >
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none" />
              
              <div className="space-y-3 relative z-10">
                <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded w-fit text-[#C5A059]">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-mono font-black uppercase tracking-widest text-slate-200">Statutory Update Pipeline</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                  Pursuant to Public Health Act mandates, all food processing lines inside regional zones require updated sanitation log uploads before June 15.
                </p>
              </div>

              <a href="https://fdaghana.gov.gh" target="_blank" rel="noreferrer" className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-center font-mono text-[9px] font-black tracking-widest uppercase text-white transition-all flex items-center justify-center gap-2">
                Review Official Framework Gazette <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </motion.section>

          </div>
        </div>
      </main>
    </div>
  );
}