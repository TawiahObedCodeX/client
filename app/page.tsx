"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  QrCode, 
  Users2, 
  Hourglass, 
  Building2, 
  Globe2, 
  Search,
  X,
  Layers,
  Fingerprint,
  Workflow,
  Cpu,
  ShieldAlert,
  ClipboardCheck
} from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import HeroCarousel from "@/components/verification/HeroCarousel";
import { PremiumDashboardSkeleton } from "@/components/common/Loader";

export default function PublicLandingPage() {
  const [verificationToken, setVerificationToken] = useState("");
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [simulateStatsLoading, setSimulateStatsLoading] = useState(true);

  useEffect(() => {
    const hydrationTimer = setTimeout(() => {
      setSimulateStatsLoading(false);
    }, 1200);
    return () => clearTimeout(hydrationTimer);
  }, []);

  const handleVerifyRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationToken.trim()) {
      window.location.href = `/verify/${encodeURIComponent(verificationToken.trim())}`;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] overflow-x-hidden flex flex-col justify-between selection:bg-[#C5A059]/20 selection:text-[#0B132B]">
      
      {/* ─── SCROLL LOCKED MODULAR HEADER NAV ─── */}
      <Navbar />

      {/* ─── FULL VIEWPORT HIGH-CONTRAST HERO CAROUSEL BLOCK ─── */}
      <HeroCarousel onVerifyClick={() => setIsVerifyModalOpen(true)} />

      {/* ─── STATISTICS / REGISTRY SEGMENT ─── */}
      <section id="analytical-scope" className="py-28 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="mb-14 space-y-2">
          <span className="font-mono text-[10px] text-[#006B43] font-bold tracking-widest block uppercase">Metric Pipelines</span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#0B132B] tracking-tight">Live Registry Integrity Index</h2>
        </div>

        <AnimatePresence mode="wait">
          {simulateStatsLoading ? (
            <motion.div key="skeleton-loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PremiumDashboardSkeleton />
            </motion.div>
          ) : (
            <motion.div
              key="hydrated-ui"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <div className="bg-white p-7 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6 hover:border-slate-300 transition-all">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Establishments</p>
                    <h3 className="text-3xl font-heading font-extrabold text-[#0B132B]">1,482</h3>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-100 rounded">
                    <Building2 className="w-4.5 h-4.5 text-[#006B43]" />
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">Fully audited processing compounds officially registered cross-territory.</p>
              </div>

              <div className="bg-white p-7 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6 hover:border-slate-300 transition-all">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">SLA Compliance</p>
                    <h3 className="text-3xl font-heading font-extrabold text-[#0B132B]">94.8%</h3>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-100 rounded">
                    <Hourglass className="w-4.5 h-4.5 text-[#C5A059]" />
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">System-enforced processing responses operating inside statutory limits.</p>
              </div>

              <div className="bg-white p-7 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6 hover:border-slate-300 transition-all">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Global Channels</p>
                    <h3 className="text-3xl font-heading font-extrabold text-[#0B132B]">38 Countries</h3>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-100 rounded">
                    <Globe2 className="w-4.5 h-4.5 text-slate-600" />
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">Foreign exporter manufacturing tracks linked into the core ledger network.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ─── SYSTEM ARCHITECTURE DEEP DIVE BENTO ─── */}
      <section id="infrastructure" className="bg-white border-t border-slate-200 py-24 w-full">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="mb-14 space-y-2">
            <span className="font-mono text-[10px] text-[#C5A059] font-bold tracking-widest block uppercase">Infrastructure Spec</span>
            <h2 className="text-2xl font-heading font-extrabold text-[#0B132B] tracking-tight">Core Architectural Engineering Rails</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="space-y-3.5">
              <div className="w-10 h-10 rounded bg-slate-50 border border-slate-200 flex items-center justify-center">
                <Workflow className="w-4.5 h-4.5 text-[#0B132B]" />
              </div>
              <h4 className="text-sm font-bold text-[#0B132B] uppercase tracking-wide font-mono">Adaptive Workflows</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dynamically segments assessment routing using specific analytical criteria parsed right during file injection steps.
              </p>
            </div>

            <div className="space-y-3.5">
              <div className="w-10 h-10 rounded bg-slate-50 border border-slate-200 flex items-center justify-center">
                <Cpu className="w-4.5 h-4.5 text-[#006B43]" />
              </div>
              <h4 className="text-sm font-bold text-[#0B132B] uppercase tracking-wide font-mono">Clock-Stop Control</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Timers automatically halt whenever informational requests route out to compliance applicants, logging transparent data audits.
              </p>
            </div>

            <div className="space-y-3.5">
              <div className="w-10 h-10 rounded bg-slate-50 border border-slate-200 flex items-center justify-center">
                <Fingerprint className="w-4.5 h-4.5 text-[#C5A059]" />
              </div>
              <h4 className="text-sm font-bold text-[#0B132B] uppercase tracking-wide font-mono">Immutable Ledgers</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Approved system operations compile signed cryptographic hash references mapped to searchable registration lookup indices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FUNCTIONAL OPERATIONAL PORTALS ─── */}
      <section id="operational-channels" className="border-t border-slate-200/60 py-24 w-full bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="mb-14 space-y-2">
            <span className="font-mono text-[10px] text-[#006B43] font-bold tracking-widest block uppercase">Execution Portals</span>
            <h2 className="text-2xl font-heading font-extrabold text-[#0B132B] tracking-tight">Functional Operational Subsystems</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl border border-slate-200/60 shadow-xs space-y-4">
              <div className="p-2.5 bg-amber-500/5 border border-amber-500/10 rounded w-fit">
                <ClipboardCheck className="w-5 h-5 text-[#C5A059]" />
              </div>
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B132B]">E-Filing Portal</h5>
              <p className="text-xs text-slate-500 leading-relaxed">Unified filing workspace for tracking dossiers, processing digital import-export receipts, and verifying facility conditions.</p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-slate-200/60 shadow-xs space-y-4">
              <div className="p-2.5 bg-emerald-500/5 border border-emerald-500/10 rounded w-fit">
                <Layers className="w-5 h-5 text-[#006B43]" />
              </div>
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B132B]">Internal Evaluation</h5>
              <p className="text-xs text-slate-500 leading-relaxed">Algorithmic workflow distributions grouping incoming queries to specialized lab teams depending on chemical structure matrices.</p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-slate-200/60 shadow-xs space-y-4">
              <div className="p-2.5 bg-red-500/5 border border-red-500/10 rounded w-fit">
                <ShieldAlert className="w-5 h-5 text-red-600" />
              </div>
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B132B]">Risk Mitigation</h5>
              <p className="text-xs text-slate-500 leading-relaxed">Post-market safety telemetry triggers that flag suspicious product lines dynamically based on public ledger inconsistencies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PUBLIC LEDGER DIALOG CANVAS ─── */}
      <AnimatePresence>
        {isVerifyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVerifyModalOpen(false)}
              className="absolute inset-0 bg-[#0B132B]/50 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.98, opacity: 0, y: 6 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-sm bg-white rounded-xl p-6 shadow-2xl border border-slate-200 relative z-10 space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <QrCode className="w-4.5 h-4.5 text-[#0B132B]" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B132B]">Public Ledger Query</h3>
                </div>
                <button onClick={() => setIsVerifyModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Provide the unique verification matrix token from your official printed document to confirm live authorization status.
              </p>

              <form onSubmit={handleVerifyRedirect} className="space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. FDA-CERT-2026-XXXXX" 
                    value={verificationToken}
                    onChange={(e) => setVerificationToken(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 rounded border border-slate-200 text-xs focus:outline-none focus:border-[#C5A059] font-mono"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 rounded bg-[#0B132B] text-white text-[10px] font-mono uppercase tracking-widest font-bold shadow-md hover:bg-[#162347] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  Query Ledger System <Users2 className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── SCROLL LOCKED MODULAR FOOTER ─── */}
      <Footer />
    </div>
  );
}