// components/common/Loader.tsx - Loading spinner component for 2026
// Used during page transitions and data loading

'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
}

export function Loader({ size = 'large' }: LoaderProps) {
  // Size mappings
  const sizes = {
    small: {
      ring: 'w-8 h-8 border-3',
      icon: 'w-5 h-5',
      text: 'text-lg',
    },
    medium: {
      ring: 'w-14 h-14 border-4',
      icon: 'w-6 h-6',
      text: 'text-xl',
    },
    large: {
      ring: 'w-20 h-20 border-4',
      icon: 'w-7 h-7',
      text: 'text-2xl',
    },
  };

  const currentSize = sizes[size];

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      {/* Spinning Ring Loader */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ 
          repeat: Infinity, 
          duration: 1.6, 
          ease: "linear" 
        }}
        className={`${currentSize.ring} border-slate-200 border-t-[#2563EB] rounded-full shadow-lg`}
      />

      {/* FDA Ghana Branding */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3"
      >
        <Shield className={`${currentSize.icon} text-[#2563EB]`} />
        <span className={`font-bold ${currentSize.text} tracking-wider text-[#0F172A]`}>
          FDA GHANA
        </span>
      </motion.div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-slate-500 text-sm font-medium"
      >
        Loading secure platform...
      </motion.p>
    </div>
  );
}