"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Menu, X, ArrowRight, Activity, Library } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#020617]/85 backdrop-blur-md border-b border-white/10 shadow-xl py-3" 
          : "bg-transparent border-b border-white/5 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        
        {/* Brand System Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded bg-gradient-to-br from-[#C5A059] to-[#E5C483] text-[#0B132B] shadow-lg transition-transform group-hover:scale-105">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black text-xs uppercase tracking-wider text-white">
              FDA GHANA
            </span>
            <span className="font-mono text-[9px] font-bold text-[#C5A059] tracking-widest uppercase">
              RegTech Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono uppercase tracking-widest font-bold">
          <Link href="#analytical-scope" className="text-slate-300 hover:text-[#E5C483] transition-colors flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#C5A059]" /> Index
          </Link>
          <Link href="#infrastructure" className="text-slate-300 hover:text-[#E5C483] transition-colors flex items-center gap-1.5">
            <Library className="w-3.5 h-3.5 text-[#006B43]" /> Architecture
          </Link>
          <Link href="#operational-channels" className="text-slate-300 hover:text-[#E5C483] transition-colors">
            Portals
          </Link>
        </nav>

        {/* Action Call Trigger */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/login" 
            className="text-[10px] font-mono uppercase tracking-widest font-bold text-slate-300 hover:text-white transition-colors"
          >
            Portal Access
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded bg-gradient-to-r from-[#C5A059] to-[#E5C483] text-[#0B132B] text-[10px] font-mono uppercase tracking-widest font-bold hover:brightness-110 active:scale-98 transition-all flex items-center gap-2"
          >
            <span>E-Filing Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Toggle Trigger */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-1 rounded border border-white/10 text-white bg-white/5 hover:bg-white/10 transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Backdrop Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 right-0 bg-[#020617] border-b border-white/10 shadow-2xl overflow-hidden md:hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6 text-xs font-mono uppercase tracking-widest font-bold">
              <Link onClick={() => setIsMobileMenuOpen(false)} href="#analytical-scope" className="text-slate-300 py-1">
                Live Registry Index
              </Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} href="#infrastructure" className="text-slate-300 py-1">
                Core Architecture
              </Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} href="#operational-channels" className="text-slate-300 py-1">
                Operational Portals
              </Link>
              <div className="w-full h-px bg-white/10 my-2" />
              <Link onClick={() => setIsMobileMenuOpen(false)} href="/login" className="text-slate-400 py-1 text-center">
                Portal Access
              </Link>
              <Link
                onClick={() => setIsMobileMenuOpen(false)}
                href="/register"
                className="w-full py-3.5 text-center rounded bg-gradient-to-r from-[#C5A059] to-[#E5C483] text-[#0B132B]"
              >
                Launch New Filing
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}