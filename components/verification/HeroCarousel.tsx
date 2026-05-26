"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  QrCode, 
  FileCheck2, 
  ArrowRight,
  Utensils,
  Pill, // Fixes: Export Pills doesn't exist in target module
  Sparkles,
  Stethoscope,
  Apple,
  Biohazard,
  FlaskConical
} from "lucide-react";
import Link from "next/link";

interface SlideData {
  id: number;
  category: string;
  tag: string;
  title: string;
  subtitle: string;
  imgUrl: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const HERO_SLIDES: SlideData[] = [
  {
    id: 1,
    category: "FOOD",
    tag: "Food Safety & Agro-Processing",
    title: "Automating National Food Compliance Lifecycles",
    subtitle: "Centralized licensing portal tracking manufacturing sanitation, batch evaluation records, and retail endpoints across agro-processing complexes.",
    imgUrl: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&q=80&w=2200",
    Icon: Utensils
  },
  {
    id: 2,
    category: "DRUG",
    tag: "Pharmaceutical Oversight",
    title: "Rigorous Therapeutic Validation Frameworks",
    subtitle: "Rigorous clinical trials management checking chemical purity benchmarks, therapeutic validation, and medical asset verification logs.",
    imgUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=2200",
    Icon: Pill // Updated reference from Pills to Pill
  },
  {
    id: 3,
    category: "COSMETIC",
    tag: "Cosmetics & Chemical Safety",
    title: "Dermatological Safety Ledger & Certification",
    subtitle: "Systematic chemical screening assessing compositional matrices, toxicological health indexes, and consumer labeling transparency requirements.",
    imgUrl: "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=2200",
    Icon: Sparkles
  },
  {
    id: 4,
    category: "MEDICAL_DEVICE",
    tag: "Medical Devices Engineering",
    title: "Bio-Compatibility Diagnostics Verification",
    subtitle: "Enforcing operational standards for diagnostic infrastructure, surgical equipment streams, and institutional critical care apparatus setups.",
    imgUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2200",
    Icon: Stethoscope
  },
  {
    id: 5,
    category: "NUTRITIONAL_SUPPLEMENT",
    tag: "Nutritional Supplements",
    title: "Bio-Active Dietary Compound Evaluation",
    subtitle: "Rigorous review framework checking functional claims, safe additive volumes, and processing transparency for fortified health formulations.",
    imgUrl: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80&w=2200",
    Icon: Apple
  },
  {
    id: 6,
    category: "PESTICIDE",
    tag: "Agrochemicals & Pesticides",
    title: "Environmental Agrochemical Vector Auditing",
    subtitle: "Tracking importation streams and handling rules for maximum residue limits to shield eco-infrastructure and local food networks.",
    imgUrl: "https://images.unsplash.com/photo-1592417817098-8f3d6eb18865?auto=format&fit=crop&q=80&w=2200",
    Icon: Biohazard
  },
  {
    id: 7,
    category: "HOUSEHOLD_CHEMICAL",
    tag: "Household Chemical Substances",
    title: "Industrial & Domestic Consumables Safety",
    subtitle: "Validating safe structural limits for household sanitizers, processing reagents, and raw domestic toxic chemical ingredients.",
    imgUrl: "https://images.unsplash.com/photo-1579165466541-7183b6f6999a?auto=format&fit=crop&q=80&w=2200",
    Icon: FlaskConical
  }
];

interface HeroCarouselProps {
  onVerifyClick: () => void;
}

export default function HeroCarousel({ onVerifyClick }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [progress, setProgress] = useState(0);
  const AUTOPLAY_TIME = 7500;
  const progressTimer = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    startTime.current = Date.now();
    setProgress(0);

    const intervalStep = 100;
    const updateProgress = () => {
      const elapsed = Date.now() - startTime.current;
      const calculatedProgress = Math.min((elapsed / AUTOPLAY_TIME) * 100, 100);
      setProgress(calculatedProgress);

      if (elapsed >= AUTOPLAY_TIME) {
        adjustSlide(1);
      } else {
        progressTimer.current = setTimeout(updateProgress, intervalStep);
      }
    };

    progressTimer.current = setTimeout(updateProgress, intervalStep);
    return () => {
      if (progressTimer.current) clearTimeout(progressTimer.current);
    };
  }, [index]);

  const adjustSlide = (offset: number) => {
    if (progressTimer.current) clearTimeout(progressTimer.current);
    setDirection(offset);
    setIndex((prev) => (prev + offset + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const currentSlide = HERO_SLIDES[index];
  
  // Guard clause to protect against unmapped execution array states
  if (!currentSlide) return <div className="w-full h-screen bg-[#020617]" />;

  const CurrentIcon = currentSlide.Icon;

  return (
    <div className="relative w-full h-screen min-h-[750px] bg-[#020617] overflow-hidden">
      
      {/* ─── CLEAR BACKDROP PHOTOGRAPHY ─── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={index}
            src={currentSlide.imgUrl}
            alt={currentSlide.title}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 0.65, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover brightness-[0.75] contrast-[1.12]"
          />
        </AnimatePresence>
        
        {/* Anti-Washout Linear Edge Shading Layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/95 via-[#020617]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/50" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-10" />

      {/* ─── TEXT BLOCK LAYOUT FRAME ─── */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-12 lg:px-24 max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded border border-white/10 bg-[#0B132B]/85 backdrop-blur-md shadow-2xl">
              <div className="p-1 rounded bg-[#C5A059]/10 text-[#C5A059]">
                <CurrentIcon className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest font-bold">
                <span className="text-white/40">{currentSlide.category} :</span>
                <span className="text-[#C5A059] uppercase">{currentSlide.tag}</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-extrabold text-white leading-[1.08] tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              {currentSlide.title.split(" ").map((word, idx) => {
                const highlights = ["Lifecycles", "Oversight", "Safety", "Verification", "Evaluation", "Auditing", "Consumables"];
                const match = highlights.some(h => word.includes(h));
                return (
                  <span key={idx} className={match ? "text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#E5C483]" : ""}>
                    {word}{" "}
                  </span>
                );
              })}
            </h1>

            <p className="text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
              {currentSlide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* ─── INTERACTIVE BUTTON ARRAYS ─── */}
        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button 
            onClick={onVerifyClick}
            className="group px-7 py-4 rounded bg-gradient-to-r from-[#C5A059] to-[#E5C483] text-[#0B132B] text-xs font-mono uppercase tracking-widest font-bold shadow-[0_8px_32px_rgba(197,160,89,0.25)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <QrCode className="w-4.5 h-4.5" /> 
            <span>Scan Public Ledger</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <Link 
            href="/register" 
            className="px-7 py-4 rounded border border-white/15 bg-[#0B132B]/85 text-white text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-2xl hover:bg-[#0B132B] hover:border-white/35 transition-all text-center flex items-center justify-center gap-2.5"
          >
            <FileCheck2 className="w-4.5 h-4.5 text-[#C5A059]" /> 
            <span>Launch New Filing</span>
          </Link>
        </div>
      </div>

      {/* ─── BOTTOM CONTROLS & TRACK SEGMENTS ─── */}
      <div className="absolute z-30 left-6 sm:left-12 lg:left-24 right-6 sm:right-12 lg:right-24 bottom-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#020617]/60 backdrop-blur-md p-3 rounded-lg border border-white/5">
        
        <div className="flex flex-wrap items-center gap-2">
          {HERO_SLIDES.map((slide, dotIdx) => {
            const DotIcon = slide.Icon;
            const isActive = dotIdx === index;
            return (
              <button
                key={dotIdx}
                onClick={() => adjustSlide(dotIdx - index)}
                className={`relative h-8 rounded px-3 flex items-center gap-2 transition-all cursor-pointer text-[9px] font-mono font-bold uppercase tracking-wider ${
                  isActive ? "bg-white/10 text-[#C5A059] border border-white/15" : "bg-transparent text-slate-400 hover:text-white"
                }`}
              >
                <DotIcon className="w-3.5 h-3.5" />
                <span className={isActive ? "inline" : "hidden md:inline"}>{slide.category}</span>
                {isActive && (
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[2px] bg-[#C5A059]" 
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-4 w-full sm:w-auto justify-end">
          <button
            onClick={() => adjustSlide(-1)}
            className="w-9 h-9 rounded border border-white/10 bg-[#0B132B]/90 text-white hover:bg-[#C5A059] hover:text-[#0B132B] hover:border-[#C5A059] flex items-center justify-center transition-all cursor-pointer shadow-xl"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => adjustSlide(1)}
            className="w-9 h-9 rounded border border-white/10 bg-[#0B132B]/90 text-white hover:bg-[#C5A059] hover:text-[#0B132B] hover:border-[#C5A059] flex items-center justify-center transition-all cursor-pointer shadow-xl"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}