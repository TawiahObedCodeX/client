// app/(auth)/register/page.tsx - Fixed Registration Page
// Now properly creates account and routes to dashboard

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
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
  Lock
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  
  // Form states
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    password: '',
    agreeToTerms: false,
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user types
    if (error) setError('');
  };

  // Validate form
  const validateForm = (): string | null => {
    if (!formData.fullName.trim()) return 'Full name is required';
    if (!formData.companyName.trim()) return 'Company name is required';
    if (!formData.email.trim()) return 'Email is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Invalid email format';
    
    if (!formData.password) return 'Password is required';
    if (formData.password.length < 8) return 'Password must be at least 8 characters';
    
    if (!formData.agreeToTerms) return 'You must agree to the Terms of Service';
    
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setError('');
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    setIsLoading(true);

    try {
      // Make API call to register endpoint
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          companyName: formData.companyName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Success!
      setIsSuccess(true);
      toast.success('Account created successfully!');
      
      // Auto-redirect to dashboard
      setTimeout(() => {
        router.push('/dashboard');
        router.refresh();
      }, 2000);

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Success screen
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-blue-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl p-8 border shadow-sm">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-[#0F172A] mb-2">
              Registration Successful!
            </h1>
            <p className="text-slate-600 mb-2">
              Welcome, {formData.fullName}!
            </p>
            <p className="text-slate-500 text-sm mb-6">
              Your FDA Ghana account has been created. Redirecting you to your dashboard...
            </p>
            
            {/* Loading indicator */}
            <div className="w-full bg-slate-200 rounded-full h-2 mb-6 overflow-hidden">
              <div className="bg-[#2563EB] h-2 rounded-full animate-progress"></div>
            </div>
            
            <Button 
              className="w-full bg-[#2563EB] hover:bg-[#1E40AF]"
              onClick={() => router.push('/dashboard')}
            >
              Go to Dashboard Now
            </Button>
          </div>
        </div>

        {/* Add animation style */}
        <style jsx>{`
          @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          .animate-progress {
            animation: progress 2s ease-in-out;
          }
        `}</style>
      </div>
    );
  }

  // Registration form
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
            Register to access FDA Ghana Regulatory System
          </p>
        </div>

        {/* Registration Form Card */}
        <div className="bg-white rounded-2xl p-8 border shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-all"
                  placeholder="Enter your full name"
                  disabled={isLoading}
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-slate-700 mb-2">
                Company Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-all"
                  placeholder="Enter company name"
                  disabled={isLoading}
                  autoComplete="organization"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-all"
                  placeholder="Enter your email address"
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-all"
                  placeholder="Create a strong password (min. 8 characters)"
                  disabled={isLoading}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span className="text-sm text-slate-600">
                  I agree to the{' '}
                  <a href="#" className="text-[#2563EB] hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-[#2563EB] hover:underline">Privacy Policy</a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-[#2563EB] hover:bg-[#1E40AF] h-11"
              disabled={isLoading}
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