"use client";

import React from "react";
import { ShieldCheck, Building2, ExternalLink, Cpu, HardDrive, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] text-slate-400 border-t border-slate-900 pt-20 pb-10 w-full relative overflow-hidden">
      
      {/* Background Geometric Grid Accent Line */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 pb-16">
        
        {/* Column 1: System Blueprint Pitch */}
        <div className="space-y-5 lg:col-span-2 max-w-md">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-heading font-black text-xs uppercase tracking-wider text-white">
              FDA GHANA FRMS
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            The national-scale enterprise RegTech infrastructure powering automated enforcement, clock-stop SLA tracing, and cryptographic public auditing pathways for the Food and Drugs Authority Ghana.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2 text-[10px] font-mono font-bold text-slate-500">
            <span className="flex items-center gap-1 px-2 py-1 rounded bg-slate-900 border border-white/5">
              <Cpu className="w-3 h-3 text-[#006B43]" /> Immutable Audit Trail
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded bg-slate-900 border border-white/5">
              <HardDrive className="w-3 h-3 text-[#C5A059]" /> Cryptographic Ledgers
            </span>
          </div>
        </div>

        {/* Column 2: System Portals Mapping */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C5A059]">
            System Workspaces
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link href="/register" className="hover:text-white transition-colors flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#006B43]" /> E-Filing Client Workspace
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white transition-colors flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#006B43]" /> Lab Analysis Terminal
              </Link>
            </li>
            <li>
              <Link href="#analytical-scope" className="hover:text-white transition-colors flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#006B43]" /> Public Validation Registry
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Institutional Authority Anchors */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-200">
            Institutional External Links
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <a href="https://fdaghana.gov.gh" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> Ministry of Health Ghana <ExternalLink className="w-2.5 h-2.5 opacity-40" />
              </a>
            </li>
            <li>
              <a href="https://ghana.gov.gh" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> Official Government Portal <ExternalLink className="w-2.5 h-2.5 opacity-40" />
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Deep Footer Rules */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono tracking-wider font-bold">
        <p className="text-slate-500">
          &copy; {currentYear} Food and Drugs Authority Ghana. Enterprise RegTech System. All Rights Reserved.
        </p>
        <div className="flex items-center gap-6 text-slate-500">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#E5C483]">
            Designed by Mid-Level Full-Stack Engineers
          </span>
        </div>
      </div>
    </footer>
  );
}