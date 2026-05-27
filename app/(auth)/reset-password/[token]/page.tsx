// // app/(auth)/reset-password/[token]/page.tsx
// "use client";

// import { useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { motion } from "motion/react";
// import { ShieldCheck, Lock, ArrowRight, CheckCircle } from "lucide-react";
// import Link from "next/link";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { showToast } from "@/components/common/Toast";

// const resetSchema = z.object({
//   password: z.string().min(8, "Password must be at least 8 characters"),
//   confirmPassword: z.string(),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });

// type ResetForm = z.infer<typeof resetSchema>;

// export default function ResetPasswordPage() {
//   const { token } = useParams();
//   const router = useRouter();
//   const [isSuccess, setIsSuccess] = useState(false);
//   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetForm>({
//     resolver: zodResolver(resetSchema),
//   });

//   const onSubmit = async (data: ResetForm) => {
//     try {
//       // API call to reset password with token
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       console.log("Reset password for token:", token, data.password);
//       setIsSuccess(true);
//       showToast.success("Password Reset", "Your password has been successfully reset.");
//       setTimeout(() => router.push("/login"), 2000);
//     } catch (error) {
//       showToast.error("Reset Failed", "Invalid or expired reset link.");
//     }
//   };

//   if (isSuccess) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white px-6">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="max-w-md w-full text-center"
//         >
//           <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
//           <h1 className="text-2xl font-heading font-bold text-[#0D1B2A]">Password Reset Complete</h1>
//           <p className="text-slate-500 mt-2">You can now log in with your new password.</p>
//           <Link href="/login">
//             <Button variant="gold" className="mt-8">Go to Login</Button>
//           </Link>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white p-6">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-md w-full"
//       >
//         <div className="text-center mb-8">
//           <ShieldCheck className="w-12 h-12 text-[#D4A017] mx-auto mb-4" />
//           <h1 className="text-2xl font-heading font-bold text-[#0D1B2A]">Create New Password</h1>
//           <p className="text-slate-500 mt-2">Enter your new password below.</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium mb-2">New Password</label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//               <Input type="password" className="pl-10" {...register("password")} error={errors.password?.message} />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Confirm Password</label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//               <Input type="password" className="pl-10" {...register("confirmPassword")} error={errors.confirmPassword?.message} />
//             </div>
//           </div>

//           <Button type="submit" variant="gold" className="w-full gap-2" disabled={isSubmitting}>
//             {isSubmitting ? "Resetting..." : "Reset Password"} <ArrowRight className="w-4 h-4" />
//           </Button>
//         </form>
//       </motion.div>
//     </div>
//   );
// }