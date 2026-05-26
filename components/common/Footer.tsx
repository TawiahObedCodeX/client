"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#0B132B] border-t border-white/5 text-slate-500 py-12 text-xs w-full">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="text-center sm:text-left space-y-1">
          <p className="font-heading font-bold text-white text-sm tracking-wide">Food and Drugs Authority Ghana</p>
          <p className="text-slate-500">Official Institutional Regulatory Technology Core Framework.</p>
        </div>
        <div className="font-mono text-[9px] tracking-widest text-slate-600 uppercase font-bold">
          © {new Date().getFullYear()} FRMS Core Network. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}