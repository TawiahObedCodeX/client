"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  QrCode,
  FileCheck2,
  ArrowRight,
  Utensils,
  Pill,
  Sparkles,
  Stethoscope,
  Apple,
  Biohazard,
  FlaskConical,
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
    subtitle:
      "Centralized licensing portal tracking manufacturing sanitation, batch evaluation records, and retail endpoints across agro-processing complexes.",
    imgUrl:
      "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&q=80&w=2200",
    Icon: Utensils,
  },
  {
    id: 2,
    category: "DRUG",
    tag: "Pharmaceutical Oversight",
    title: "Rigorous Therapeutic Validation Frameworks",
    subtitle:
      "Rigorous clinical trials management checking chemical purity benchmarks, therapeutic validation, and medical asset verification logs.",
    imgUrl:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=2200",
    Icon: Pill,
  },
  {
    id: 3,
    category: "COSMETIC",
    tag: "Cosmetics & Chemical Safety",
    title: "Dermatological Safety Ledger & Certification",
    subtitle:
      "Systematic chemical screening assessing compositional matrices, toxicological health indexes, and consumer labeling transparency requirements.",
    imgUrl:
      "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=2200",
    Icon: Sparkles,
  },
  {
    id: 4,
    category: "MEDICAL_DEVICE",
    tag: "Medical Devices Engineering",
    title: "Bio-Compatibility Diagnostics Verification",
    subtitle:
      "Enforcing operational standards for diagnostic infrastructure, surgical equipment streams, and institutional critical care apparatus setups.",
    imgUrl:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2200",
    Icon: Stethoscope,
  },
  {
    id: 5,
    category: "NUTRITIONAL_SUPPLEMENT",
    tag: "Nutritional Supplements",
    title: "Bio-Active Dietary Compound Evaluation",
    subtitle:
      "Rigorous review framework checking functional claims, safe additive volumes, and processing transparency for fortified health formulations.",
    imgUrl:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80&w=2200",
    Icon: Apple,
  },
  {
    id: 6,
    category: "PESTICIDE",
    tag: "Agrochemicals & Pesticides",
    title: "Environmental Agrochemical Vector Auditing",
    subtitle:
      "Tracking importation streams and handling rules for maximum residue limits to shield eco-infrastructure and local food networks.",
    imgUrl:
      "https://images.unsplash.com/photo-1592417817098-8f3d6eb18865?auto=format&fit=crop&q=80&w=2200",
    Icon: Biohazard,
  },
  {
    id: 7,
    category: "HOUSEHOLD_CHEMICAL",
    tag: "Household Chemical Substances",
    title: "Industrial & Domestic Consumables Safety",
    subtitle:
      "Validating safe structural limits for household sanitizers, processing reagents, and raw domestic toxic chemical ingredients.",
    imgUrl:
      "https://images.unsplash.com/photo-1579165466541-7183b6f6999a?auto=format&fit=crop&q=80&w=2200",
    Icon: FlaskConical,
  },
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
    setIndex(
      (prev) => (prev + offset + HERO_SLIDES.length) % HERO_SLIDES.length,
    );
  };

  const currentSlide = HERO_SLIDES[index];
  if (!currentSlide) return <div className="w-full h-screen bg-[#020617]" />;

  const CurrentIcon = currentSlide.Icon;

  return (
    <div className="relative w-full h-screen min-h-170 bg-[#020617] overflow-hidden">
      {/* Background Image */}
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

        <div className="absolute inset-0 bg-linear-to-r from-[#020617]/95 via-[#020617]/70 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-transparent to-[#020617]/50" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-size-[60px_60px] pointer-events-none z-10" />

      {/* Main Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-8 lg:px-16 max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Category Tag */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-white/10 bg-[#0B132B]/90 backdrop-blur-md">
              <div className="p-2 rounded-xl bg-[#C5A059]/10 text-[#C5A059]">
                <CurrentIcon className="w-6 h-6" />
              </div>
              <div className="font-mono">
                <span className="text-white/70 text-sm">
                  {currentSlide.category}
                </span>
                <span className="block text-[#C5A059] text-base font-bold uppercase tracking-widest">
                  {currentSlide.tag}
                </span>
              </div>
            </div>

            {/* Title - Moderately Large */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white leading-tight tracking-tighter drop-shadow-2xl">
              {currentSlide.title.split(" ").map((word, idx) => {
                const highlights = [
                  "Lifecycle",
                  "Oversight",
                  "Safety",
                  "Verification",
                  "Evaluation",
                  "Auditing",
                  "Consumables",
                ];
                const isHighlighted = highlights.some((h) => word.includes(h));
                return (
                  <span
                    key={idx}
                    className={
                      isHighlighted
                        ? "text-transparent bg-clip-text bg-linear-to-r from-[#C5A059] to-[#E5C483]"
                        : ""
                    }
                  >
                    {word}{" "}
                  </span>
                );
              })}
            </h1>

            {/* Subtitle - Balanced Size */}
            <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-3xl leading-relaxed font-light drop-shadow-xl">
              {currentSlide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons - Slightly Smaller */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={onVerifyClick}
            className="group px-7 py-4 rounded-2xl bg-linear-to-r from-[#C5A059] to-[#E5C483] text-[#0B132B] text-base font-semibold shadow-xl hover:brightness-110 active:scale-[0.985] transition-all flex items-center justify-center gap-3"
          >
            <QrCode className="w-5 h-5" />
            Scan Public Ledger
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <Link
            href="/register"
            className="px-7 py-4 rounded-2xl border border-white/20 bg-[#0B132B]/80 text-white text-base font-semibold backdrop-blur-md hover:bg-white/10 hover:border-white/40 transition-all flex items-center justify-center gap-3"
          >
            <FileCheck2 className="w-5 h-5 text-[#C5A059]" />
            Launch New Filing
          </Link>
        </div>
      </div>

      {/* Bottom Indicators */}
      {/* <div className="absolute z-30 left-6 sm:left-8 lg:left-16 right-6 sm:right-8 lg:right-16 bottom-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#020617]/70 backdrop-blur-lg p-3 rounded-2xl border border-white/10">
        <div className="flex flex-wrap gap-2">
          {HERO_SLIDES.map((slide, dotIdx) => {
            const DotIcon = slide.Icon;
            const isActive = dotIdx === index;
            return (
              <button
                key={dotIdx}
                onClick={() => adjustSlide(dotIdx - index)}
                className={`relative h-10 rounded-xl px-4 flex items-center gap-2.5 transition-all cursor-pointer text-sm font-medium uppercase tracking-wider ${
                  isActive 
                    ? "bg-white/10 text-[#C5A059] border border-white/30" 
                    : "bg-transparent text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <DotIcon className="w-4 h-4" />
                <span className={isActive ? "block" : "hidden sm:block"}>
                  {slide.category}
                </span>
                {isActive && (
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-[#C5A059] rounded-full" 
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div> */}
    </div>
  );
}
