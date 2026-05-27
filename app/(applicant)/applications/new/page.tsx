// app/(applicant)/applications/new/page.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Layers, FileText, CheckCircle, Sliders, AlertCircle, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewApplicationWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    productName: "",
    genericName: "",
    category: "FOOD",
    intendedUse: "",
    manufacturerName: "",
    manufacturerAddress: "",
    countryOfOrigin: "Ghana",
    dosageForm: "",
    shelfLife: "",
  });

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.productName.trim()) newErrors.productName = "Product name is required";
      if (!formData.intendedUse.trim()) newErrors.intendedUse = "Intended use is required";
    }
    if (currentStep === 2) {
      if (!formData.manufacturerName.trim()) newErrors.manufacturerName = "Manufacturer name is required";
      if (!formData.manufacturerAddress.trim()) newErrors.manufacturerAddress = "Full address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setDirection(1);
      setStep((prev) => Math.min(prev + 1, 3));
      setErrors({});
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      alert("Application successfully submitted to FDA Ledger!");
      router.push(`/applications/FDA-APP-2026-X81`);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0D1B2A] text-white rounded-3xl p-8 mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
        >
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-10 h-10 text-[#D4A017]" />
            <div>
              <h1 className="text-3xl font-heading font-black">Product Registration</h1>
              <p className="text-slate-400 font-mono text-sm">FDA Ghana • RegTech Platform 2026</p>
            </div>
          </div>

          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2.5 rounded-full transition-all duration-300 ${s < step ? "w-8 bg-[#00784A]" : s === step ? "w-12 bg-[#D4A017]" : "w-8 bg-slate-600"}`}
              />
            ))}
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="p-10 min-h-[520px] relative">
            <AnimatePresence mode="wait" custom={direction}>
              {/* STEP 1 */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-8"
                >
                  <h3 className="font-mono text-lg font-black text-[#D4A017] flex items-center gap-3">
                    <Layers className="w-6 h-6" /> PRODUCT IDENTITY
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-semibold mb-3 text-slate-700">Official Product Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={formData.productName}
                        onChange={(e) => updateField("productName", e.target.value)}
                        className="w-full px-6 py-4 border border-slate-200 rounded-2xl focus:border-[#D4A017] text-lg placeholder:text-slate-400"
                        placeholder="e.g. Alpha Immune Booster Syrup"
                      />
                      {errors.productName && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.productName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-3 text-slate-700">Generic Name</label>
                      <input
                        type="text"
                        value={formData.genericName}
                        onChange={(e) => updateField("genericName", e.target.value)}
                        className="w-full px-6 py-4 border border-slate-200 rounded-2xl focus:border-[#D4A017] text-lg"
                        placeholder="Botanical Extract Complex"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3 text-slate-700">Intended Use <span className="text-red-500">*</span></label>
                    <textarea
                      value={formData.intendedUse}
                      onChange={(e) => updateField("intendedUse", e.target.value)}
                      rows={5}
                      className="w-full px-6 py-4 border border-slate-200 rounded-2xl focus:border-[#D4A017] text-base"
                      placeholder="Describe the purpose, target users, and benefits..."
                    />
                    {errors.intendedUse && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.intendedUse}</p>}
                  </div>
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-8"
                >
                  <h3 className="font-mono text-lg font-black text-[#00784A] flex items-center gap-3">
                    <FileText className="w-6 h-6" /> MANUFACTURER DETAILS
                  </h3>

                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-semibold mb-3 text-slate-700">Manufacturer Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={formData.manufacturerName}
                        onChange={(e) => updateField("manufacturerName", e.target.value)}
                        className="w-full px-6 py-4 border border-slate-200 rounded-2xl focus:border-[#00784A] text-lg"
                        placeholder="BioPharma Ghana Limited"
                      />
                      {errors.manufacturerName && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.manufacturerName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-3 text-slate-700">Physical Address <span className="text-red-500">*</span></label>
                      <textarea
                        value={formData.manufacturerAddress}
                        onChange={(e) => updateField("manufacturerAddress", e.target.value)}
                        rows={4}
                        className="w-full px-6 py-4 border border-slate-200 rounded-2xl focus:border-[#00784A] text-base"
                        placeholder="Plot 45, Industrial Area, Accra, Ghana"
                      />
                      {errors.manufacturerAddress && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.manufacturerAddress}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-8"
                >
                  <h3 className="font-mono text-lg font-black text-[#0D1B2A] flex items-center gap-3">
                    <CheckCircle className="w-6 h-6" /> CONFIRMATION & SUBMISSION
                  </h3>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6 text-base">
                    <div className="flex justify-between py-4 border-b">
                      <span className="text-slate-600">Product Name</span>
                      <span className="font-semibold text-right">{formData.productName || "—"}</span>
                    </div>
                    <div className="flex justify-between py-4 border-b">
                      <span className="text-slate-600">Manufacturer</span>
                      <span className="font-semibold text-right">{formData.manufacturerName || "—"}</span>
                    </div>
                    <div className="flex justify-between py-4">
                      <span className="text-slate-600">Category</span>
                      <span className="font-semibold">{formData.category}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-center text-sm">By submitting, you confirm all information is accurate and agree to FDA regulatory terms.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Bar */}
          <div className="border-t border-slate-100 p-8 flex items-center justify-between bg-white rounded-b-3xl">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-10 py-4 border border-slate-300 rounded-2xl hover:bg-slate-50 flex items-center gap-3 text-lg font-medium"
              >
                <ArrowLeft className="w-5 h-5" /> Back
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto px-12 py-4 bg-[#0D1B2A] text-white rounded-2xl flex items-center gap-3 text-lg font-medium hover:bg-slate-800 transition-colors"
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto px-16 py-4 bg-gradient-to-r from-[#D4A017] to-[#F0C040] text-[#0D1B2A] font-black text-xl tracking-widest rounded-2xl hover:brightness-110 transition-all"
              >
                SUBMIT TO FDA LEDGER
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}