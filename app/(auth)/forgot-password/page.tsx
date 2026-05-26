// ─────────────────────────────────────────────────
// app/(auth)/forgot-password/page.tsx
// Forgot Password Page with email submission
// Version: 2026.1.0
// ─────────────────────────────────────────────────

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft, Loader2, Check, Mail, AlertCircle } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Validate email
    if (!email.trim()) {
      setError("Email is required")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      // Simulate API call (replace with actual API endpoint later)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSent(true)
      toast.success("Password reset link sent to your email!")
    } catch (err) {
      toast.error("Failed to send reset link. Please try again.")
      setError("Failed to send reset link. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-blue-200">
              F
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Reset Password</h1>
          <p className="text-slate-500">
            {isSent
              ? "Check your email for reset instructions"
              : "Enter your email to receive a reset link"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-8 border shadow-sm">
          {isSent ? (
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-slate-600 mb-2">
                We've sent a password reset link to
              </p>
              <p className="font-medium text-[#0F172A] mb-6">
                {email}
              </p>
              <p className="text-sm text-slate-500 mb-6">
                Please check your inbox and follow the instructions. The link will expire in 1 hour.
              </p>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsSent(false)
                    setEmail("")
                  }}
                >
                  Send to Different Email
                </Button>
                <Link href="/login">
                  <Button variant="ghost" className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError("")
                    }}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-all"
                    placeholder="Enter your registered email"
                    disabled={isLoading}
                    autoComplete="email"
                    autoFocus
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#2563EB] hover:bg-[#1E40AF] h-11"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Back to Login */}
        {!isSent && (
          <div className="text-center mt-6">
            <Link
              href="/login"
              className="text-sm text-slate-500 hover:text-[#2563EB] transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}