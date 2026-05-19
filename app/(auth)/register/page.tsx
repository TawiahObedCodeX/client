// app/(auth)/register/page.tsx - Registration Page for FDA Ghana 2026
// New user registration form

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Eye, EyeOff, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-blue-200">
              F
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Create Account</h1>
          <p className="text-slate-500">
            Register with FDA Ghana Regulatory Management System
          </p>
        </div>

        {/* Registration Form Card */}
        <div className="bg-white rounded-2xl p-8 border shadow-sm">
          <form className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Company Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-all"
                  placeholder="Enter company name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-all"
                placeholder="Enter your email address"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-all pr-12"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="mt-1 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]" />
                <span className="text-sm text-slate-600">
                  I agree to the{' '}
                  <a href="#" className="text-[#2563EB] hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-[#2563EB] hover:underline">Privacy Policy</a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <Button className="w-full bg-[#2563EB] hover:bg-[#1E40AF] h-11">
              <Shield className="w-4 h-4 mr-2" />
              Create Account
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-6 text-sm text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="text-[#2563EB] font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-slate-500 hover:text-[#2563EB] transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}