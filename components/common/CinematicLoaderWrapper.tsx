"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck } from "lucide-react";

export default function CinematicLoaderWrapper() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Guarantees that the high-end loader screen renders for exactly 3000ms
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -20,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* Background Subtle Tech Grid Line Accents */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          
          <div className="flex flex-col items-center max-w-sm text-center px-6 relative z-10">
            {/* Animated Brand Pulse Frame */}
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0px 0px 0px rgba(197, 160, 89, 0)",
                  "0px 8px 32px rgba(197, 160, 89, 0.25)",
                  "0px 0px 0px rgba(197, 160, 89, 0)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="p-4 rounded-xl bg-[#0B132B] border border-white/10 text-[#C5A059] mb-6"
            >
              <ShieldCheck className="w-10 h-10" />
            </motion.div>

            {/* Text Loading Indicators */}
            <h2 className="font-heading font-black text-xs uppercase tracking-widest text-white mb-1.5">
              FDA GHANA FRMS
            </h2>
            <p className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-6">
              Initializing Enterprise RegTech Workspace
            </p>

            {/* High-End Motion Progress Line Track */}
            <div className="w-40 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}