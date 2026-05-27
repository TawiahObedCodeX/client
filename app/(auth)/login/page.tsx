"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ShieldCheck, ArrowRight, Lock, Mail, Fingerprint, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// UI Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  workspace: z.enum(["client", "inspector", "lab"]),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { workspace: "client" },
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginForm) => {
    console.log("Login attempt:", data);
    await new Promise((resolve) => setTimeout(resolve, 1400));

    toast.success("Login Successful!", {
      description: "Welcome back to FDA Ghana RegTech Platform",
      duration: 3000,
      action: {
        label: "Go to Dashboard",
        onClick: () => router.push("/dashboard"),
      },
    });

    setTimeout(() => router.push("/dashboard"), 1800);
  };

  return (
    <main className="w-full min-h-screen bg-white flex flex-col lg:flex-row relative overflow-hidden selection:bg-[#C5A059]/20">
      {/* LEFT PANEL - LOGIN FORM */}
      <section className="w-full lg:w-[45%] bg-white px-6 sm:px-12 lg:px-16 py-10 lg:py-12 flex flex-col justify-between min-h-screen lg:overflow-hidden">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group w-fit">
          <div className="p-2.5 rounded bg-linear-to-br from-[#0B132B] to-[#162347] text-[#E5C483]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="font-heading font-black text-lg tracking-wider text-[#0B132B]">
              FDA GHANA
            </span>
            <span className="block font-mono text-sm font-bold text-[#C5A059]">
              RegTech Platform
            </span>
          </div>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="my-auto max-w-md w-full space-y-8"
        >
          <div>
            <h1 className="text-3xl lg:text-4xl font-heading font-extrabold text-[#0B132B]">
              Portal Access
            </h1>
            <p className="text-base text-slate-600 mt-2">
              Sign in to access your regulatory workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Workspace Select */}
            <div>
              <Label htmlFor="workspace">Workspace</Label>
              <Select
                value={watch("workspace")}
                onValueChange={(val) =>
                  setValue("workspace", val as "client" | "inspector" | "lab")
                }
              >
                <SelectTrigger id="workspace" className="mt-1.5">
                  <SelectValue placeholder="Select workspace" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">E‑Filing Client Workspace</SelectItem>
                  <SelectItem value="inspector">Internal Enforcement Terminal</SelectItem>
                  <SelectItem value="lab">Lab Analysis Hub</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Corporate Email</Label>
              <div className="relative mt-1.5">
                <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@organization.gov.gh"
                  className="pl-11"
                  {...register("email")}
                  error={errors.email?.message}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1.5">
                <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-11 pr-12"
                  {...register("password")}
                  error={errors.password?.message}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-[#C5A059] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="default"
              className="w-full bg-[#0B132B] hover:bg-[#162347] gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Authenticating..." : "Sign In to Workspace"}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500">
            New here?{" "}
            <Link href="/register" className="text-[#C5A059] font-semibold hover:underline">
              Create Establishment Account
            </Link>
          </p>
        </motion.div>

        <p className="text-xs text-slate-400 text-center lg:text-left">
          &copy; 2026 FDA Ghana. Secure Access.
        </p>
      </section>

      {/* RIGHT PANEL */}
      <section className="hidden lg:flex lg:w-[55%] bg-[#020617] relative flex-col justify-end p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-size-[50px_50px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-20 max-w-xl space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <Fingerprint className="w-5 h-5 text-[#C5A059]" />
            <span className="text-sm font-mono text-white">Level‑4 Security Active</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight">
            National Regulatory Compliance Architecture
          </h2>
          <p className="text-slate-300 text-lg">
            Secure access to food, drug, and medical regulatory systems.
          </p>
        </motion.div>
      </section>
    </main>
  );
}