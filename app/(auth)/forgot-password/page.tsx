// app/(auth)/forgot-password/page.tsx
// Forgot Password Page

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft, Loader2, Check } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSent(true);
      toast.success('Password reset link sent to your email!');
    } catch (error) {
      toast.error('Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Reset Password</h1>
          <p className="text-slate-500">
            {isSent 
              ? 'Check your email for reset instructions' 
              : 'Enter your email to receive a reset link'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-8 border shadow-sm">
          {isSent ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-slate-600 mb-6">
                We've sent a password reset link to <strong>{email}</strong>. 
                Please check your inbox and follow the instructions.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsSent(false)}
              >
                Send Again
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-all"
                  placeholder="Enter your registered email"
                  disabled={isLoading}
                />
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
                  'Send Reset Link'
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <Link 
            href="/login" 
            className="text-sm text-slate-500 hover:text-[#2563EB] transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}