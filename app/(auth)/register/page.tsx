// ─────────────────────────────────────────────────
// app/(auth)/register/page.tsx - Registration Page
// Complete registration page with multi-field validation
// Version: 2026.1.0
// ─────────────────────────────────────────────────

"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Eye,
  EyeOff,
  Building2,
  Loader2,
  Check,
  AlertCircle,
  User,
  Mail,
  Lock,
  ArrowLeft,
  CheckCircle2,
  X,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

// ─────────────────────────────────────────────────
// Password Strength Checker
// ─────────────────────────────────────────────────
interface PasswordStrength {
  score: number
  label: string
  color: string
  checks: {
    length: boolean
    uppercase: boolean
    lowercase: boolean
    number: boolean
    special: boolean
  }
}

function checkPasswordStrength(password: string): PasswordStrength {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }

  const passedChecks = Object.values(checks).filter(Boolean).length

  let score: number
  let label: string
  let color: string

  if (passedChecks <= 2) {
    score = 25
    label = "Weak"
    color = "bg-red-500"
  } else if (passedChecks <= 3) {
    score = 50
    label = "Fair"
    color = "bg-orange-500"
  } else if (passedChecks <= 4) {
    score = 75
    label = "Good"
    color = "bg-yellow-500"
  } else {
    score = 100
    label = "Strong"
    color = "bg-green-500"
  }

  return { score, label, color, checks }
}

// ─────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────
interface FormData {
  fullName: string
  companyName: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

interface FormErrors {
  fullName?: string
  companyName?: string
  email?: string
  password?: string
  confirmPassword?: string
  agreeToTerms?: string
  general?: string
}

// ─────────────────────────────────────────────────
// Registration Page Component
// ─────────────────────────────────────────────────
export default function RegisterPage() {
  const router = useRouter()
  const fullNameInputRef = useRef<HTMLInputElement>(null)

  // State management
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength | null>(null)

  // Focus first input on mount
  useEffect(() => {
    fullNameInputRef.current?.focus()
  }, [])

  // Update password strength when password changes
  useEffect(() => {
    if (formData.password) {
      setPasswordStrength(checkPasswordStrength(formData.password))
    } else {
      setPasswordStrength(null)
    }
  }, [formData.password])

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear specific field error
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters"
    } else if (formData.fullName.trim().length > 100) {
      newErrors.fullName = "Full name must be less than 100 characters"
    }

    // Company Name
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required"
    } else if (formData.companyName.trim().length < 2) {
      newErrors.companyName = "Company name must be at least 2 characters"
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (formData.password.length > 128) {
      newErrors.password = "Password must be less than 128 characters"
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    // Terms
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the Terms of Service"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    console.log("=== REGISTRATION FORM SUBMITTED ===")
    console.log("Form data:", { ...formData, password: "[HIDDEN]", confirmPassword: "[HIDDEN]" })

    if (!validateForm()) {
      const firstError = Object.keys(errors)[0]
      toast.error("Please fix the errors before submitting")
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        signal: controller.signal,
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          companyName: formData.companyName.trim(),
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      })

      clearTimeout(timeoutId)

      console.log("Response status:", response.status)

      let data
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        data = await response.json()
      } else {
        throw new Error("Server returned an unexpected response")
      }

      console.log("Response data:", data)

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error("An account with this email already exists")
        }
        throw new Error(data.error || "Registration failed. Please try again.")
      }

      // Success!
      console.log("✅ Registration successful")
      setIsSuccess(true)
      toast.success("Account created successfully!")

      // Redirect after showing success
      setTimeout(() => {
        router.push("/dashboard")
        router.refresh()
      }, 2000)

    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed"
      console.error("❌ Registration error:", message)

      if (message.includes("abort")) {
        setErrors({ general: "Request timed out. Please try again." })
      } else {
        setErrors({ general: message })
      }
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  // Success screen
  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl p-8 border shadow-sm">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-[#0F172A] mb-2">
              Registration Successful!
            </h1>
            <p className="text-slate-600 mb-2">
              Welcome, <strong>{formData.fullName}</strong>!
            </p>
            <p className="text-slate-500 text-sm mb-6">
              Your FDA Ghana account has been created. Redirecting you to your dashboard...
            </p>

            {/* Progress bar */}
            <div className="w-full bg-slate-200 rounded-full h-2 mb-6 overflow-hidden">
              <div className="bg-[#2563EB] h-2 rounded-full animate-progress"></div>
            </div>

            <Button
              className="w-full bg-[#2563EB] hover:bg-[#1E40AF]"
              onClick={() => {
                router.push("/dashboard")
                router.refresh()
              }}
            >
              Go to Dashboard Now
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Registration form
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
            <div className="w-14 h-14 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-blue-200 group-hover:shadow-xl transition-shadow">
              F
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Create Account</h1>
          <p className="text-slate-500">
            Register to access FDA Ghana Regulatory System
          </p>
        </div>

        {/* Registration Form Card */}
        <div className="bg-white rounded-2xl p-8 border shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{errors.general}</p>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  ref={fullNameInputRef}
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50 focus:bg-white outline-none transition-all ${
                    errors.fullName
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                  }`}
                  placeholder="Enter your full name"
                  disabled={isLoading}
                  autoComplete="name"
                  tabIndex={1}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-slate-700 mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50 focus:bg-white outline-none transition-all ${
                    errors.companyName
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                  }`}
                  placeholder="Enter your company name"
                  disabled={isLoading}
                  autoComplete="organization"
                  tabIndex={2}
                />
              </div>
              {errors.companyName && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.companyName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50 focus:bg-white outline-none transition-all ${
                    errors.email
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                  }`}
                  placeholder="Enter your email address"
                  disabled={isLoading}
                  autoComplete="email"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  tabIndex={3}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-2.5 rounded-xl border bg-slate-50 focus:bg-white outline-none transition-all ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                  }`}
                  placeholder="Create a strong password"
                  disabled={isLoading}
                  autoComplete="new-password"
                  tabIndex={4}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}

              {/* Password Strength Indicator */}
              {passwordStrength && (
                <div className="mt-2 space-y-1.5">
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${passwordStrength.score}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Password strength:{" "}
                      <span className="font-medium">{passwordStrength.label}</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <PasswordCheckItem
                      passed={passwordStrength.checks.length}
                      label="8+ characters"
                    />
                    <PasswordCheckItem
                      passed={passwordStrength.checks.uppercase}
                      label="Uppercase letter"
                    />
                    <PasswordCheckItem
                      passed={passwordStrength.checks.lowercase}
                      label="Lowercase letter"
                    />
                    <PasswordCheckItem
                      passed={passwordStrength.checks.number}
                      label="Number"
                    />
                    <PasswordCheckItem
                      passed={passwordStrength.checks.special}
                      label="Special character"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-2.5 rounded-xl border bg-slate-50 focus:bg-white outline-none transition-all ${
                    errors.confirmPassword
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : formData.confirmPassword && formData.password === formData.confirmPassword
                      ? "border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                      : "border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                  }`}
                  placeholder="Confirm your password"
                  disabled={isLoading}
                  autoComplete="new-password"
                  tabIndex={5}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <CheckCircle2 className="absolute right-12 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                )}
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms of Service */}
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB] focus:ring-offset-0 cursor-pointer"
                  tabIndex={6}
                />
                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-[#2563EB] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-[#2563EB] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.agreeToTerms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#2563EB] hover:bg-[#1E40AF] h-11 text-white font-medium shadow-sm hover:shadow-md transition-all"
              disabled={isLoading}
              tabIndex={7}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Create Account & Go to Dashboard
                </>
              )}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-6 text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#2563EB] font-medium hover:underline transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-[#2563EB] transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────
// Password Check Item Component
// ─────────────────────────────────────────────────
function PasswordCheckItem({
  passed,
  label,
}: {
  passed: boolean
  label: string
}) {
  return (
    <div className="flex items-center gap-1.5 text-xs">
      {passed ? (
        <Check className="w-3 h-3 text-green-500 shrink-0" />
      ) : (
        <X className="w-3 h-3 text-slate-300 shrink-0" />
      )}
      <span className={passed ? "text-green-600" : "text-slate-400"}>
        {label}
      </span>
    </div>
  )
}