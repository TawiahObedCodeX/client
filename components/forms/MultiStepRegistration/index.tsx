// components/forms/MultiStepRegistration/index.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Step1ProductInfo } from "./Step1ProductInfo";
import { Step2Manufacturer } from "./Step2Manufacturer";
import { Step3Labelling } from "./Step3Labelling";
import { Step4Documents } from "./Step4Documents";
import { Step5Review } from "./Step5Review";
import { useFormPersist } from "@/hooks/useFormPersist";
import { showToast } from "@/components/common/Toast";

// Complete form schema
const registrationSchema = z.object({
  // Step 1
  productName: z.string().min(3, "Product name is required"),
  brandName: z.string().optional(),
  genericName: z.string().optional(),
  category: z.enum(["FOOD", "DRUG", "COSMETIC", "MEDICAL_DEVICE", "NUTRITIONAL_SUPPLEMENT", "PESTICIDE", "HOUSEHOLD_CHEMICAL"]),
  dosageForm: z.string().optional(),
  strength: z.string().optional(),
  packSize: z.string().optional(),
  intendedUse: z.string().min(10, "Please describe the intended use"),
  activeIngredients: z.string().optional(),
  storageConditions: z.string().optional(),
  shelfLife: z.string().optional(),
  // Step 2
  countryOfOrigin: z.string().min(2, "Country of origin is required"),
  manufacturerName: z.string().min(3, "Manufacturer name is required"),
  manufacturerAddress: z.string().min(10, "Full address is required"),
  importerName: z.string().optional(),
  // Step 3
  labelArtworkFile: z.any().optional(),
  hasSideEffects: z.boolean().default(false),
  sideEffectsDescription: z.string().optional(),
  contraindications: z.string().optional(),
  // Step 4
  documents: z.array(z.object({
    type: z.string(),
    fileKey: z.string(),
    fileName: z.string(),
  })).default([]),
  // Terms
  termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms"),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

const STEPS = [
  { id: 1, title: "Product Information", component: Step1ProductInfo },
  { id: 2, title: "Manufacturer Details", component: Step2Manufacturer },
  { id: 3, title: "Labelling & Safety", component: Step3Labelling },
  { id: 4, title: "Documents Upload", component: Step4Documents },
  { id: 5, title: "Review & Submit", component: Step5Review },
];

export function MultiStepRegistration() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onBlur",
    defaultValues: {
      category: "FOOD",
      countryOfOrigin: "Ghana",
      hasSideEffects: false,
      documents: [],
      termsAccepted: false,
    },
  });

  // Persist form data to localStorage
  useFormPersist("registration-form", methods.watch);

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem("registration-form");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        methods.reset(parsed);
      } catch (e) {
        console.error("Failed to load saved form", e);
      }
    }
  }, []);

  const handleNext = async () => {
    let fieldsToValidate: (keyof RegistrationFormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ["productName", "intendedUse", "category"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["manufacturerName", "manufacturerAddress", "countryOfOrigin"];
    } else if (currentStep === 3) {
      fieldsToValidate = [];
    } else if (currentStep === 4) {
      fieldsToValidate = [];
    }

    const isValid = await methods.trigger(fieldsToValidate);
    if (isValid && currentStep < STEPS.length) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    try {
      // API call to submit application
      console.log("Submitting registration:", data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showToast.success("Application Submitted!", "Your product registration has been successfully submitted for review.");
      
      // Clear saved form data
      localStorage.removeItem("registration-form");
      
      // Redirect to applications list
      router.push("/applications");
    } catch (error) {
      showToast.error("Submission Failed", "Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const CurrentStepComponent = STEPS[currentStep - 1].component;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Progress Header */}
          <div className="bg-gradient-to-r from-[#0D1B2A] to-[#1A3047] text-white p-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-[#D4A017]" />
                <div>
                  <h1 className="text-2xl font-heading font-bold">Product Registration</h1>
                  <p className="text-slate-300 text-sm">Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].title}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {STEPS.map((step) => (
                  <div
                    key={step.id}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      step.id < currentStep
                        ? "w-8 bg-[#00784A]"
                        : step.id === currentStep
                        ? "w-12 bg-[#D4A017]"
                        : "w-8 bg-slate-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="p-8 md:p-10 min-h-[500px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
                transition={{ duration: 0.3 }}
              >
                <CurrentStepComponent />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="border-t border-slate-100 p-8 flex items-center justify-between bg-slate-50">
            {currentStep > 1 ? (
              <Button type="button" variant="outline" onClick={handleBack} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < STEPS.length ? (
              <Button type="button" variant="default" onClick={handleNext} className="ml-auto gap-2 bg-[#0D1B2A] hover:bg-[#1A3047]">
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button type="submit" variant="gold" className="ml-auto gap-2" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit to FDA Ledger"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}