"use client";

import React from "react";
import { ShieldCheck, Building2, ExternalLink, Cpu, HardDrive, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] text-slate-400 border-t border-slate-900 pt-20 pb-12 w-full relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 pb-16">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-6 lg:col-span-2 max-w-md">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059]">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <span className="font-heading font-black text-2xl tracking-wider text-white">
              FDA GHANA FRMS
            </span>
          </div>
          <p className="text-base text-slate-400 leading-relaxed">
            The national-scale enterprise RegTech infrastructure powering automated enforcement, clock-stop SLA tracing, and cryptographic public auditing pathways for the Food and Drugs Authority Ghana.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-white/5 text-sm">
              <Cpu className="w-4 h-4 text-[#006B43]" /> Immutable Audit Trail
            </span>
            <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-white/5 text-sm">
              <HardDrive className="w-4 h-4 text-[#C5A059]" /> Cryptographic Ledgers
            </span>
          </div>
        </div>

        {/* Column 2: System Portals */}
        <div className="space-y-6">
          <h4 className="text-base font-semibold uppercase tracking-widest text-[#C5A059]">
            System Workspaces
          </h4>
          <ul className="space-y-4 text-base">
            <li>
              <Link href="/register" className="hover:text-white transition-colors flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#006B43]" /> E-Filing Client Workspace
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white transition-colors flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#006B43]" /> Lab Analysis Terminal
              </Link>
            </li>
            <li>
              <Link href="#analytical-scope" className="hover:text-white transition-colors flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#006B43]" /> Public Validation Registry
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: External Links */}
        <div className="space-y-6">
          <h4 className="text-base font-semibold uppercase tracking-widest text-slate-200">
            Institutional Links
          </h4>
          <ul className="space-y-4 text-base">
            <li>
              <a href="https://fdaghana.gov.gh" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-3">
                <Building2 className="w-5 h-5" /> Ministry of Health Ghana 
                <ExternalLink className="w-4 h-4 opacity-60" />
              </a>
            </li>
            <li>
              <a href="https://ghana.gov.gh" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-3">
                <Building2 className="w-5 h-5" /> Official Government Portal 
                <ExternalLink className="w-4 h-4 opacity-60" />
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10 pt-10 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
        <p className="text-slate-500 text-center sm:text-left">
          &copy; {currentYear} Food and Drugs Authority Ghana. Enterprise RegTech System. All Rights Reserved.
        </p>
        <div className="text-slate-500 text-center sm:text-right">
          Designed by Mid-Level Full-Stack Engineers
        </div>
      </div>
    </footer>
  );
}