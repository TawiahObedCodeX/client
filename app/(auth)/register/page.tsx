"use client";

import React from "react";
import { motion } from "motion/react";
import {
  ShieldCheck,
  FileCheck2,
  ArrowRight,
  Building2,
  User,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// UI Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const registerSchema = z.object({
  companyName: z.string().min(3, "Company name must be at least 3 characters"),
  tin: z
    .string()
    .min(15, "Complete TIN is required")
    .regex(/^GHA-\d{9}-\d{1}$/, "TIN must follow format: GHA-XXXXXXXXX-X"),
  contactPerson: z.string().min(3, "Contact person name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  sector: z.enum(["FOOD", "DRUG", "COSMETIC", "DEVICE", "CHEMICAL"]),
  termsAccepted: z.boolean().refine((val) => val === true, "You must accept the terms"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      phone: "+233",
      sector: "FOOD",
      termsAccepted: false,
    },
  });

  const tinValue = watch("tin", "");

  const handleTinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase().replace(/[^GHA0-9-]/g, "");
    if (!value.startsWith("GHA")) {
      value = "GHA-" + value.replace(/^GHA?/, "");
    }
    const numbersOnly = value.replace(/[^0-9]/g, "");
    let formatted = "GHA-";
    formatted += numbersOnly.slice(0, 9);
    if (numbersOnly.length > 9) {
      formatted += "-" + numbersOnly.slice(9, 10);
    }
    setValue("tin", formatted.slice(0, 15), { shouldValidate: true });
  };

  const onSubmit = async (data: RegisterForm) => {
    console.log("Submitting registration:", data);
    await new Promise((resolve) => setTimeout(resolve, 1600));

    toast.success("Registration Successful!", {
      description: "Your establishment has been registered with FDA Ghana. Welcome aboard!",
      duration: 4000,
      action: {
        label: "Go to Dashboard",
        onClick: () => router.push("/dashboard"),
      },
    });

    reset();
    setTimeout(() => router.push("/dashboard"), 2200);
  };

  return (
    <main className="w-full min-h-screen bg-white flex flex-col lg:flex-row relative overflow-hidden selection:bg-[#C5A059]/20">
      {/* LEFT PANEL - FORM */}
      <section className="w-full lg:w-[60%] bg-white px-6 sm:px-12 lg:px-20 py-10 lg:py-12 flex flex-col justify-between min-h-screen lg:overflow-hidden">
        <Link href="/" className="flex items-center gap-3 group w-fit">
          <div className="p-2.5 rounded bg-linear-to-br from-[#0B132B] to-[#162347] text-[#E5C483]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="font-heading font-black text-lg tracking-wider text-[#0B132B]">
              FDA GHANA
            </span>
            <span className="block font-mono text-sm font-bold text-[#C5A059] tracking-widest">
              RegTech Platform
            </span>
          </div>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="my-auto max-w-xl w-full space-y-8"
        >
          <div className="space-y-3">
            <span className="font-mono text-sm text-[#006B43] font-bold tracking-widest uppercase">
              Statutory E‑Filing
            </span>
            <h1 className="text-3xl lg:text-4xl font-heading font-extrabold text-[#0B132B]">
              Establishment Registration
            </h1>
            <p className="text-base text-slate-600">
              Fill in your company details to begin the secure registration process.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="companyName">Registered Company Name</Label>
                <div className="relative mt-1.5">
                  <Building2 className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <Input
                    id="companyName"
                    placeholder="Enterprise Ltd"
                    className="pl-11"
                    {...register("companyName")}
                    error={errors.companyName?.message}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tin">Ghana GRA TIN</Label>
                <div className="relative mt-1.5">
                  <FileCheck2 className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <Input
                    id="tin"
                    type="text"
                    value={tinValue}
                    onChange={handleTinChange}
                    placeholder="GHA-XXXXXXXXX-X"
                    maxLength={15}
                    className="pl-11 font-mono tracking-wider"
                    error={errors.tin?.message}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="contactPerson">Contact Person</Label>
                <div className="relative mt-1.5">
                  <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <Input
                    id="contactPerson"
                    placeholder="Full Name"
                    className="pl-11"
                    {...register("contactPerson")}
                    error={errors.contactPerson?.message}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="mt-1.5">
                  <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="GH"
                    value={watch("phone")}
                    onChange={(value) => setValue("phone", value || "", { shouldValidate: true })}
                    disabled={isSubmitting}
                    className="react-phone-input-custom"
                    numberInputProps={{
                      className:
                        "w-full pl-14 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#C5A059] text-base font-mono",
                    }}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="sector">Primary Sector</Label>
              <Select
                value={watch("sector")}
                onValueChange={(val) => setValue("sector", val as any)}
              >
                <SelectTrigger id="sector" className="mt-1.5">
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FOOD">Food Safety & Agro‑Processing</SelectItem>
                  <SelectItem value="DRUG">Pharmaceuticals</SelectItem>
                  <SelectItem value="COSMETIC">Cosmetics</SelectItem>
                  <SelectItem value="DEVICE">Medical Devices</SelectItem>
                  <SelectItem value="CHEMICAL">Household Chemicals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <Checkbox
                id="termsAccepted"
                checked={watch("termsAccepted")}
                onCheckedChange={(checked) => setValue("termsAccepted", checked === true)}
              />
              <Label
                htmlFor="termsAccepted"
                className="text-sm text-slate-600 leading-relaxed cursor-pointer"
              >
                I confirm that all information provided is accurate and agree to the regulatory
                terms and conditions.
              </Label>
            </div>
            {errors.termsAccepted && (
              <p className="text-red-500 text-sm">{errors.termsAccepted.message}</p>
            )}

            <Button
              type="submit"
              variant="gold"
              className="w-full gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Submit Registration"}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Already registered?{" "}
            <Link href="/login" className="text-[#0B132B] font-semibold hover:underline">
              Login to Portal
            </Link>
          </p>
        </motion.div>

        <p className="text-xs text-slate-400 text-center lg:text-left mt-8">
          &copy; 2026 FDA Ghana. All Rights Reserved.
        </p>
      </section>

      {/* RIGHT PANEL */}
      <section className="hidden lg:flex lg:w-[40%] bg-[#020617] relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-size-[40px_40px]" />

        <div className="relative z-20 space-y-3">
          <CheckCircle2 className="w-8 h-8 text-[#C5A059]" />
          <h4 className="text-lg font-bold text-white">Automated Enforcement Sequence</h4>
        </div>

        <div className="relative z-20 space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-5">
              <span className="font-mono text-lg font-bold text-[#C5A059]">
                {String(i).padStart(2, "0")}
              </span>
              <div>
                <p className="text-white font-medium">Step {i}</p>
                <p className="text-slate-400 text-sm mt-1">
                  System processes your application securely.
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-20 bg-amber-500/10 border border-amber-500/20 p-5 rounded-2xl">
          <ShieldAlert className="w-6 h-6 text-amber-500 mb-3" />
          <p className="text-amber-500 text-sm font-medium">
            All processes follow strict statutory timelines.
          </p>
        </div>
      </section>
    </main>
  );
}