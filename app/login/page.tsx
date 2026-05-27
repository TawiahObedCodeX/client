"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, ArrowRight, Lock, Mail, Server, Fingerprint, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  workspace: z.enum(["client", "inspector", "lab"])
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { workspace: "client" }
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    console.log("Login Data:", data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert("Login successful! (Demo)");
  };

  return (
    <main className="w-full h-screen bg-white flex flex-col lg:flex-row overflow-hidden selection:bg-[#C5A059]/20">
      
      {/* LEFT PANEL - LOGIN FORM */}
      <section className="w-full lg:w-[45%] bg-white px-6 sm:px-12 lg:px-16 py-10 flex flex-col overflow-hidden">
        
        <Link href="/" className="flex items-center gap-3 mb-10 w-fit">
          <div className="p-2.5 rounded bg-gradient-to-br from-[#0B132B] to-[#162347] text-[#E5C483]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="font-heading font-black text-xl tracking-wider text-[#0B132B]">FDA GHANA</span>
            <span className="block font-mono text-sm font-bold text-[#C5A059]">RegTech Platform</span>
          </div>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col justify-center max-w-md mx-auto lg:mx-0"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-extrabold text-[#0B132B]">Portal Access</h1>
            <p className="text-slate-600 mt-2">Sign in to access your regulatory workspace.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Workspace</label>
              <select
                {...register("workspace")}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#C5A059] text-base"
              >
                <option value="client">E-Filing Client Workspace</option>
                <option value="inspector">Internal Enforcement Terminal</option>
                <option value="lab">Lab Analysis Hub</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Corporate Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
                <input
                  {...register("email")}
                  type="email"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#C5A059] text-base"
                  placeholder="name@organization.gov.gh"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-600">Password</label>
                <Link href="/forgot-password" className="text-sm text-[#C5A059] hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#C5A059] text-base"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-slate-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-[#0B132B] text-white font-semibold text-base flex items-center justify-center gap-3 hover:bg-[#162347] transition-all disabled:opacity-70"
            >
              {isLoading ? "Connecting..." : "Sign In"}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-8">
            New establishment?{" "}
            <Link href="/register" className="text-[#C5A059] font-semibold hover:underline">Register here</Link>
          </p>
        </motion.div>
      </section>

      {/* RIGHT PANEL */}
      <section className="hidden lg:flex lg:w-[55%] bg-[#020617] flex-col justify-end p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-lg"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded border border-white/10 bg-white/5 mb-6">
            <Fingerprint className="w-5 h-5 text-[#C5A059]" />
            <span className="text-xs font-mono uppercase tracking-widest text-white">Level-4 Security Active</span>
          </div>

          <h2 className="text-5xl font-heading font-extrabold text-white leading-tight">
            National Regulatory<br />
            <span className="text-[#C5A059]">Compliance System</span>
          </h2>

          <p className="text-slate-400 mt-6 text-lg">
            Secure access to automated food, drug, and chemical regulatory workflows.
          </p>
        </motion.div>
      </section>
    </main>
  );
}