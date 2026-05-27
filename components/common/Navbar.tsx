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
          ? "bg-[#020617]/85 backdrop-blur-md border-b border-white/10 shadow-xl py-4" 
          : "bg-transparent border-b border-white/5 py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        
        {/* Brand System Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2.5 rounded bg-linear-to-br from-[#C5A059] to-[#E5C483] text-[#0B132B] shadow-lg transition-transform group-hover:scale-105">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black text-lg tracking-wider text-white">
              FDA GHANA
            </span>
            <span className="font-mono text-sm font-bold text-[#C5A059] tracking-widest uppercase">
              RegTech Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-10 text-base font-medium">
          <Link href="#analytical-scope" className="text-slate-200 hover:text-[#E5C483] transition-colors flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#C5A059]" /> Index
          </Link>
          <Link href="#infrastructure" className="text-slate-200 hover:text-[#E5C483] transition-colors flex items-center gap-2">
            <Library className="w-5 h-5 text-[#006B43]" /> Architecture
          </Link>
          <Link href="#operational-channels" className="text-slate-200 hover:text-[#E5C483] transition-colors">
            Portals
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-5">
          <Link 
            href="/login" 
            className="text-base font-medium text-slate-200 hover:text-white transition-colors"
          >
            Portal Access
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 rounded-xl bg-linear-to-r from-[#C5A059] to-[#E5C483] text-[#0B132B] text-base font-semibold hover:brightness-110 active:scale-98 transition-all flex items-center gap-2"
          >
            E-Filing Portal
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg border border-white/10 text-white bg-white/5 hover:bg-white/10 transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 right-0 bg-[#020617] border-b border-white/10 shadow-2xl overflow-hidden md:hidden"
          >
            <div className="px-6 py-10 flex flex-col gap-8 text-lg font-medium">
              <Link 
                onClick={() => setIsMobileMenuOpen(false)} 
                href="#analytical-scope" 
                className="text-slate-200 py-2"
              >
                Live Registry Index
              </Link>
              <Link 
                onClick={() => setIsMobileMenuOpen(false)} 
                href="#infrastructure" 
                className="text-slate-200 py-2"
              >
                Core Architecture
              </Link>
              <Link 
                onClick={() => setIsMobileMenuOpen(false)} 
                href="#operational-channels" 
                className="text-slate-200 py-2"
              >
                Operational Portals
              </Link>

              <div className="w-full h-px bg-white/10 my-4" />

              <Link 
                onClick={() => setIsMobileMenuOpen(false)} 
                href="/login" 
                className="text-slate-300 py-3 text-center"
              >
                Portal Access
              </Link>
              <Link
                onClick={() => setIsMobileMenuOpen(false)}
                href="/register"
                className="w-full py-4 text-center rounded-2xl bg-linear-to-r from-[#C5A059] to-[#E5C483] text-[#0B132B] font-semibold"
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