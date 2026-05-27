"use client";

import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, FileCheck2, ArrowRight, Building2, User, Phone, CheckCircle2, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const registerSchema = z.object({
  companyName: z.string().min(3, "Company name must be at least 3 characters"),
  tin: z.string().min(8, "Valid TIN is required"),
  contactPerson: z.string().min(3, "Contact person name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  sector: z.enum(["FOOD", "DRUG", "COSMETIC", "DEVICE", "CHEMICAL"]),
  termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset 
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur"
  });

  const onSubmit = async (data: RegisterForm) => {
    console.log("Submitting registration:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert("Registration submitted successfully!");
    reset();
  };

  return (
    <main className="w-full min-h-screen bg-white flex flex-col lg:flex-row relative overflow-hidden selection:bg-[#C5A059]/20">
      
      {/* LEFT PANEL - FORM */}
      <section className="w-full lg:w-[60%] bg-white px-6 sm:px-12 lg:px-20 py-10 lg:py-12 flex flex-col justify-between min-h-screen lg:overflow-hidden">
        
        <Link href="/" className="flex items-center gap-3 group w-fit">
          <div className="p-2.5 rounded bg-gradient-to-br from-[#0B132B] to-[#162347] text-[#E5C483]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="font-heading font-black text-lg tracking-wider text-[#0B132B]">FDA GHANA</span>
            <span className="block font-mono text-sm font-bold text-[#C5A059] tracking-widest">RegTech Platform</span>
          </div>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="my-auto max-w-xl w-full space-y-8"
        >
          <div className="space-y-3">
            <span className="font-mono text-sm text-[#006B43] font-bold tracking-widest uppercase">Statutory E-Filing</span>
            <h1 className="text-3xl lg:text-4xl font-heading font-extrabold text-[#0B132B]">Establishment Registration</h1>
            <p className="text-base text-slate-600">Fill in your company details to begin the secure registration process.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Registered Company Name</label>
                <div className="relative">
                  <Building2 className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    {...register("companyName")}
                    disabled={isSubmitting}
                    placeholder="Enterprise Ltd"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#C5A059] text-base"
                  />
                </div>
                {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Ghana GRA TIN</label>
                <div className="relative">
                  <FileCheck2 className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    {...register("tin")}
                    disabled={isSubmitting}
                    placeholder="GHA-XXXXXXXXX-X"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#C5A059] text-base font-mono"
                  />
                </div>
                {errors.tin && <p className="text-red-500 text-sm mt-1">{errors.tin.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Contact Person</label>
                <div className="relative">
                  <User className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    {...register("contactPerson")}
                    disabled={isSubmitting}
                    placeholder="Full Name"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#C5A059] text-base"
                  />
                </div>
                {errors.contactPerson && <p className="text-red-500 text-sm mt-1">{errors.contactPerson.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    {...register("phone")}
                    disabled={isSubmitting}
                    placeholder="+233 XX XXX XXXX"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#C5A059] text-base font-mono"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Primary Sector</label>
              <select
                {...register("sector")}
                disabled={isSubmitting}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#C5A059] text-base"
              >
                <option value="FOOD">Food Safety & Agro-Processing</option>
                <option value="DRUG">Pharmaceuticals</option>
                <option value="COSMETIC">Cosmetics</option>
                <option value="DEVICE">Medical Devices</option>
                <option value="CHEMICAL">Household Chemicals</option>
              </select>
            </div>

            <label className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer">
              <input
                type="checkbox"
                {...register("termsAccepted")}
                disabled={isSubmitting}
                className="mt-1 accent-[#0B132B]"
              />
              <span className="text-sm text-slate-600 leading-relaxed">
                I confirm that all information provided is accurate and agree to the regulatory terms and conditions.
              </span>
            </label>
            {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted.message}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#C5A059] to-[#E5C483] text-[#0B132B] text-base font-semibold shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isSubmitting ? "Processing..." : "Submit Registration"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Already registered?{" "}
            <Link href="/login" className="text-[#0B132B] font-semibold hover:underline">Login to Portal</Link>
          </p>
        </motion.div>

        <p className="text-xs text-slate-400 text-center lg:text-left mt-8">&copy; 2026 FDA Ghana. All Rights Reserved.</p>
      </section>

      {/* RIGHT PANEL - Unchanged Design */}
      <section className="hidden lg:flex lg:w-[40%] bg-[#020617] relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="relative z-20 space-y-3">
          <CheckCircle2 className="w-8 h-8 text-[#C5A059]" />
          <h4 className="text-lg font-bold text-white">Automated Enforcement Sequence</h4>
        </div>

        <div className="relative z-20 space-y-8">
          {[1,2,3].map((i) => (
            <div key={i} className="flex gap-5">
              <span className="font-mono text-lg font-bold text-[#C5A059]">{String(i).padStart(2, '0')}</span>
              <div>
                <p className="text-white font-medium">Step {i}</p>
                <p className="text-slate-400 text-sm mt-1">System processes your application securely.</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-20 bg-amber-500/10 border border-amber-500/20 p-5 rounded-2xl">
          <ShieldAlert className="w-6 h-6 text-amber-500 mb-3" />
          <p className="text-amber-500 text-sm font-medium">All processes follow strict statutory timelines.</p>
        </div>
      </section>
    </main>
  );
}