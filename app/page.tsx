"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
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

// Properly typed variants
const SCROLL_CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.15, 
      delayChildren: 0.1 
    }
  }
};

const SCROLL_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.75, 
      ease: [0.16, 1, 0.3, 1] as const  // "as const" fixes the TS error
    } 
  }
};

export default function PublicLandingPage() {
  const [verificationToken, setVerificationToken] = useState("");
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [simulateStatsLoading, setSimulateStatsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSimulateStatsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleVerifyRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationToken.trim()) {
      window.location.href = `/verify/${encodeURIComponent(verificationToken.trim())}`;
    }
  };

  const closeModal = () => {
    setIsVerifyModalOpen(false);
    setVerificationToken("");
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] overflow-x-hidden flex flex-col justify-between selection:bg-[#C5A059]/20 selection:text-[#0B132B]">
      
      <Navbar />
      <HeroCarousel onVerifyClick={() => setIsVerifyModalOpen(true)} />

      {/* Statistics Section */}
      <motion.section 
        id="analytical-scope" 
        className="py-20 md:py-28 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full scroll-mt-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={SCROLL_CONTAINER_VARIANTS}
      >
        <motion.div className="mb-12 space-y-3" variants={SCROLL_ITEM_VARIANTS}>
          <span className="font-mono text-sm text-[#006B43] font-bold tracking-widest block uppercase">
            Metric Pipelines
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#0B132B] tracking-tight leading-tight">
            Live Registry Integrity Index
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {simulateStatsLoading ? (
            <motion.div 
              key="skeleton" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
            >
              <PremiumDashboardSkeleton />
            </motion.div>
          ) : (
            <motion.div
              key="stats"
              variants={SCROLL_CONTAINER_VARIANTS}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {/* Cards remain the same as previous version - large readable text */}
              <motion.div 
                variants={SCROLL_ITEM_VARIANTS} 
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-500">Establishments</p>
                    <h3 className="text-4xl font-heading font-extrabold text-[#0B132B]">1,482</h3>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <Building2 className="w-6 h-6 text-[#006B43]" />
                  </div>
                </div>
                <p className="text-base text-slate-600 mt-6 leading-relaxed">
                  Fully audited processing compounds officially registered cross-territory.
                </p>
              </motion.div>

              <motion.div 
                variants={SCROLL_ITEM_VARIANTS} 
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-500">SLA Compliance</p>
                    <h3 className="text-4xl font-heading font-extrabold text-[#0B132B]">94.8%</h3>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <Hourglass className="w-6 h-6 text-[#C5A059]" />
                  </div>
                </div>
                <p className="text-base text-slate-600 mt-6 leading-relaxed">
                  System-enforced processing responses operating inside statutory limits.
                </p>
              </motion.div>

              <motion.div 
                variants={SCROLL_ITEM_VARIANTS} 
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-500">Global Channels</p>
                    <h3 className="text-4xl font-heading font-extrabold text-[#0B132B]">38 Countries</h3>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <Globe2 className="w-6 h-6 text-slate-600" />
                  </div>
                </div>
                <p className="text-base text-slate-600 mt-6 leading-relaxed">
                  Foreign exporter manufacturing tracks linked into the core ledger network.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Architecture Section */}
      <motion.section 
        id="infrastructure" 
        className="bg-white border-t border-slate-200 py-20 md:py-24 w-full scroll-mt-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={SCROLL_CONTAINER_VARIANTS}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <motion.div className="mb-12 space-y-3" variants={SCROLL_ITEM_VARIANTS}>
            <span className="font-mono text-sm text-[#C5A059] font-bold tracking-widest block uppercase">
              Infrastructure Spec
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#0B132B] tracking-tight leading-tight">
              Core Architectural Engineering Rails
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: Workflow, color: "#0B132B", title: "Adaptive Workflows", desc: "Dynamically segments assessment routing using specific analytical criteria parsed right during file injection steps." },
              { icon: Cpu, color: "#006B43", title: "Clock-Stop Control", desc: "Timers automatically halt whenever informational requests route out to compliance applicants, logging transparent data audits." },
              { icon: Fingerprint, color: "#C5A059", title: "Immutable Ledgers", desc: "Approved system operations compile signed cryptographic hash references mapped to searchable registration lookup indices." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={SCROLL_ITEM_VARIANTS} 
                className="space-y-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <h4 className="text-xl font-bold text-[#0B132B]">{item.title}</h4>
                <p className="text-base text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Operational Subsystems */}
      <motion.section 
        id="operational-channels" 
        className="border-t border-slate-200/60 py-20 md:py-24 w-full bg-slate-50 scroll-mt-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={SCROLL_CONTAINER_VARIANTS}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <motion.div className="mb-12 space-y-3" variants={SCROLL_ITEM_VARIANTS}>
            <span className="font-mono text-sm text-[#006B43] font-bold tracking-widest block uppercase">
              Execution Portals
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#0B132B] tracking-tight leading-tight">
              Functional Operational Subsystems
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: ClipboardCheck, color: "#C5A059", title: "E-Filing Portal", desc: "Unified filing workspace for tracking dossiers, processing digital import-export receipts, and verifying facility conditions." },
              { icon: Layers, color: "#006B43", title: "Internal Evaluation", desc: "Algorithmic workflow distributions grouping incoming queries to specialized lab teams depending on chemical structure matrices." },
              { icon: ShieldAlert, color: "#dc2626", title: "Risk Mitigation", desc: "Post-market safety telemetry triggers that flag suspicious product lines dynamically based on public ledger inconsistencies." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={SCROLL_ITEM_VARIANTS} 
                className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-6 hover:shadow-md transition-all"
              >
                <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-2xl w-fit">
                  <item.icon className="w-7 h-7" style={{ color: item.color }} />
                </div>
                <h5 className="text-xl font-bold text-[#0B132B]">{item.title}</h5>
                <p className="text-base text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Verification Modal */}
      <AnimatePresence>
        {isVerifyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-[#0B132B]/60 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 relative z-10"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <QrCode className="w-6 h-6 text-[#0B132B]" />
                  <h3 className="text-xl font-bold text-[#0B132B]">Public Ledger Query</h3>
                </div>
                <button 
                  onClick={closeModal}
                  className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-base text-slate-600 mb-6 leading-relaxed">
                Provide the unique verification matrix token from your official printed document to confirm live authorization status.
              </p>

              <form onSubmit={handleVerifyRedirect} className="space-y-5">
                <div className="relative">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. FDA-CERT-2026-XXXXX" 
                    value={verificationToken}
                    onChange={(e) => setVerificationToken(e.target.value)}
                    className="w-full pl-12 pr-5 py-4 rounded-2xl border border-slate-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] text-base font-mono"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#0B132B] text-white text-base font-bold tracking-wider hover:bg-[#162347] transition-all flex items-center justify-center gap-3"
                >
                  Query Ledger System 
                  <Users2 className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}