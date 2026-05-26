// ─────────────────────────────────────────────────
// app/(auth)/login/page.tsx - Login Page
// Complete login page with form validation and error handling
// Version: 2026.1.0
// ─────────────────────────────────────────────────

"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Mail,
  Lock,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

// ─────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────
interface FormData {
  email: string
  password: string
  rememberMe: boolean
}

interface FormErrors {
  email?: string
  password?: string
  general?: string
}

// ─────────────────────────────────────────────────
// Login Page Component
// ─────────────────────────────────────────────────
function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailInputRef = useRef<HTMLInputElement>(null)

  // State management
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [redirectMessage, setRedirectMessage] = useState("")

  // Focus email input on mount
  useEffect(() => {
    emailInputRef.current?.focus()
    
    // Check if redirected from another page
    const redirect = searchParams.get("redirect")
    if (redirect) {
      setRedirectMessage("Please sign in to access the requested page.")
    }
    
    // Check if user just registered
    const registered = searchParams.get("registered")
    if (registered === "true") {
      toast.success("Account created successfully! Please sign in.")
    }
  }, [searchParams])

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    
    // Clear specific field error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
    
    // Clear general error
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }))
    }
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 1) {
      newErrors.password = "Password cannot be empty"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    console.log("=== LOGIN FORM SUBMITTED ===")
    console.log("Email:", formData.email)

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        signal: controller.signal,
        body: JSON.stringify({
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
          rememberMe: formData.rememberMe,
        }),
      })

      clearTimeout(timeoutId)

      console.log("Response status:", response.status)
      
      // Handle non-JSON responses
      let data
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        data = await response.json()
      } else {
        throw new Error("Server returned an unexpected response")
      }

      console.log("Response data:", data)

      if (!response.ok) {
        throw new Error(data.error || "Login failed. Please try again.")
      }

      // Success!
      console.log("✅ Login successful")
      console.log("Cookies after login:", document.cookie)

      setIsSuccess(true)
      toast.success("Login successful! Welcome back.")

      // Check if user data is in response
      if (data.user) {
        console.log("User data:", data.user)
      }

      // Short delay for smooth transition
      setTimeout(() => {
        const redirect = searchParams.get("redirect")
        if (redirect && !redirect.includes("/login") && !redirect.includes("/register")) {
          router.push(redirect)
        } else {
          router.push("/dashboard")
        }
        router.refresh()
      }, 800)

    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred"
      console.error("❌ Login error:", message)

      if (message.includes("abort")) {
        setErrors({ general: "Request timed out. Please check your connection and try again." })
        toast.error("Request timed out. Please try again.")
      } else {
        setErrors({ general: message })
        toast.error(message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Handle demo login
  const handleDemoLogin = async () => {
    setFormData({
      email: "demo@fda.gov.gh",
      password: "password123",
      rememberMe: false,
    })
    
    toast.info("Demo credentials filled. Click 'Sign In' to continue.")
    emailInputRef.current?.focus()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* ═══════════════════════════════════════════
            Logo & Header
            ═══════════════════════════════════════════ */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
            <div className="w-14 h-14 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-blue-200 group-hover:shadow-xl transition-shadow">
              F
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Welcome Back</h1>
          <p className="text-slate-500">
            Sign in to access your FDA Ghana regulatory dashboard
          </p>
        </div>

        {/* ═══════════════════════════════════════════
            Login Form Card
            ═══════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl p-8 border shadow-sm">
          {/* Redirect message */}
          {redirectMessage && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700">{redirectMessage}</p>
            </div>
          )}

          {/* Demo Credentials Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Demo Credentials</p>
                <p className="text-xs text-blue-700 mt-1">
                  Email: <strong>demo@fda.gov.gh</strong>
                  <br />
                  Password: <strong>password123</strong>
                </p>
                <button
                  onClick={handleDemoLogin}
                  className="text-xs text-blue-600 hover:text-blue-800 underline mt-1"
                  type="button"
                >
                  Fill demo credentials
                </button>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{errors.general}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  ref={emailInputRef}
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50 focus:bg-white outline-none transition-all text-slate-900 placeholder:text-slate-400 ${
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
                  tabIndex={1}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-2.5 rounded-xl border bg-slate-50 focus:bg-white outline-none transition-all text-slate-900 placeholder:text-slate-400 ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                  }`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                  autoComplete="current-password"
                  tabIndex={2}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB] focus:ring-offset-0"
                  tabIndex={3}
                />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-[#2563EB] hover:text-[#1E40AF] hover:underline transition-colors"
                tabIndex={4}
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#2563EB] hover:bg-[#1E40AF] h-11 text-white font-medium shadow-sm hover:shadow-md transition-all"
              disabled={isLoading}
              tabIndex={5}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Redirecting...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Sign In to Dashboard
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-slate-500">New to FDA Ghana?</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <Link href="/register" tabIndex={6}>
              <Button variant="outline" className="w-full" type="button">
                Create New Account
              </Button>
            </Link>
          </div>
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

        {/* Security Notice */}
        <div className="text-center mt-4">
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-400">
            <Shield className="w-3 h-3" />
            <span>Secure connection • Your data is encrypted</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center">
          <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin mx-auto" />
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}