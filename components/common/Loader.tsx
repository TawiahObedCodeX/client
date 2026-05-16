'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
}

export function Loader({ size = 'large' }: LoaderProps) {
  const sizes = {
    small: 'w-8 h-8',
    medium: 'w-14 h-14',
    large: 'w-20 h-20',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
        className={`${sizes[size]} border-4 border-slate-200 border-t-[#2563EB] rounded-full`}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <Shield className="w-7 h-7 text-[#2563EB]" />
        <span className="font-semibold text-xl tracking-widest text-[#0F172A]">
          FDA GHANA
        </span>
      </motion.div>

      <p className="text-slate-500 text-sm">Loading secure platform...</p>
    </div>
  );
}