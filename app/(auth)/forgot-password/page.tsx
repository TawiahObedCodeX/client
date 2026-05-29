// app/(auth)/forgot-password/page.tsx
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Mail, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { showToast } from "@/components/common/Toast";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotForm = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotForm) => {
    try {
      // API call to send reset email
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Reset requested for:", data.email);
      setIsSubmitted(true);
      showToast.success("Reset email sent", "Check your inbox for password reset instructions.");
    } catch (error) {
      showToast.error("Failed", "Please try again later.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <div className="bg-emerald-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-[#0D1B2A]">Check your email</h1>
          <p className="text-slate-500 mt-2">
            We've sent password reset instructions to your email address.
          </p>
          <Link href="/login">
            <Button variant="gold" className="mt-8 gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <Link href="/" className="inline-flex items-center gap-3 mb-8">
            <ShieldCheck className="w-8 h-8 text-[#D4A017]" />
            <span className="font-heading font-bold text-xl">FDA GHANA</span>
          </Link>

          <h1 className="text-3xl font-heading font-bold text-[#0D1B2A]">Forgot password?</h1>
          <p className="text-slate-500 mt-2 mb-8">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <Input
                type="email"
                placeholder="name@company.com"
                {...register("email")}
                error={errors.email?.message}
              />
            </div>

            <Button type="submit" variant="gold" className="w-full gap-2" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Reset Link"} <ArrowRight className="w-4 h-4" />
            </Button>

            <p className="text-center text-sm text-slate-500">
              Remember your password?{" "}
              <Link href="/login" className="text-[#D4A017] font-semibold hover:underline">
                Back to login
              </Link>
            </p>
          </form>
        </motion.div>
      </div>

      <div className="hidden lg:block w-1/2 bg-[#0D1B2A] relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[40px_40px]" />
        <div className="relative z-10 flex flex-col justify-center h-full p-12 text-white">
          <h2 className="text-4xl font-heading font-bold">RegTech Security</h2>
          <p className="text-slate-300 text-lg mt-4">
            All password reset requests are logged and monitored for security compliance.
          </p>
        </div>
      </div>
    </div>
  );
}