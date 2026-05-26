"use client";

import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, ArrowRightLeft } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 w-full bg-[#0B132B]/80 backdrop-blur-xl border-b border-white/5"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded bg-gradient-to-br from-[#C5A059] to-[#E5C483] flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-5 h-5 text-[#0B132B]" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-base text-white tracking-tight block leading-none">FDA GHANA</span>
            <span className="font-mono text-[8px] text-[#006B43] tracking-widest uppercase block mt-1.5 font-bold">REGTECH PLATFORM</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[10px] font-mono uppercase tracking-widest text-slate-400">
          <a href="#analytical-scope" className="hover:text-[#C5A059] transition-colors">Platform Scope</a>
          <a href="#infrastructure" className="hover:text-[#C5A059] transition-colors">Core Architecture</a>
          <a href="#operational-channels" className="hover:text-[#C5A059] transition-colors">Filing Vectors</a>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="px-2 py-1 text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-[#C5A059] transition-colors"
          >
            Staff Portal
          </Link>
          <Link 
            href="/register" 
            className="px-4 py-2.5 text-xs font-mono uppercase tracking-wider rounded bg-[#006B43] text-white shadow-lg hover:bg-[#005233] transition-all flex items-center gap-2"
          >
            Applicant Center <ArrowRightLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}