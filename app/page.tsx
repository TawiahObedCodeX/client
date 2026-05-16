import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, FileCheck, Users } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#2563EB] rounded-xl flex items-center justify-center text-white font-bold text-2xl">
              F
            </div>
            <span className="font-semibold text-xl tracking-tight text-[#0F172A]">FDA Ghana</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Features
            </a>
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              About
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-sm mb-6">
            <Shield className="w-4 h-4 text-[#2563EB]" />
            Official FDA Ghana Digital Platform
          </div>

          <h1 className="text-6xl font-semibold tracking-tighter text-[#0F172A] mb-6">
            Regulatory Compliance.<br />
            Simplified.
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Submit, track, and manage product registrations with Ghana FDA. 
            Enterprise-grade, secure, and transparent.
          </p>

          <div className="flex justify-center gap-4">
            <Link href="/register">
              <Button 
                size="lg" 
                className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-8 h-12 text-base"
              >
                Start New Registration 
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="border-y bg-white py-6">
        <div className="max-w-5xl mx-auto flex justify-center items-center gap-12 text-slate-400">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" /> 1,200+ Companies
          </div>
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5" /> 4,800+ Products Approved
          </div>
        </div>
      </div>
    </div>
  );
}