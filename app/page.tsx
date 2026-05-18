// app/page.tsx (Landing Page)
'use client';

import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Shield, 
  FileCheck, 
  Users, 
  Building2, 
  ClipboardCheck, 
  Clock, 
  Globe,
  AlertCircle,
  BadgeCheck,
  Truck,
  FlaskConical
} from 'lucide-react';
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
            <span className="font-semibold text-xl tracking-tight text-[#0F172A]">
              FDA Ghana
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Features
            </a>
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              About
            </a>
            <a href="#services" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Services
            </a>
            <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Contact
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
            Submit, track, and manage product registrations with Ghana's Food and Drugs Authority. 
            Enterprise-grade, secure, and transparent regulatory management system.
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
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5" /> 16 Regional Offices
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-[#0F172A] mb-4">
              Comprehensive Regulatory Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Streamline your product registration process with our integrated digital platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <ClipboardCheck className="w-6 h-6 text-[#2563EB]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A] mb-3">Product Registration</h3>
              <p className="text-slate-600">
                Submit applications for food products, drugs, medical devices, cosmetics, and household chemicals.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A] mb-3">Real-time Tracking</h3>
              <p className="text-slate-600">
                Monitor application status, review comments, and approval progress in real-time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
                <BadgeCheck className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A] mb-3">Digital Certificates</h3>
              <p className="text-slate-600">
                Receive and download digital certificates upon product approval with QR verification.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-8 border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                <FlaskConical className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A] mb-3">Laboratory Testing</h3>
              <p className="text-slate-600">
                Schedule and track product testing at FDA-approved laboratories across Ghana.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-2xl p-8 border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A] mb-3">Compliance Alerts</h3>
              <p className="text-slate-600">
                Get instant notifications about regulatory changes, renewal deadlines, and compliance requirements.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-2xl p-8 border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A] mb-3">Import/Export Clearance</h3>
              <p className="text-slate-600">
                Manage import permits and export certificates for regulated products efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About FDA Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-semibold text-[#0F172A] mb-6">
                About FDA Ghana
              </h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  The Food and Drugs Authority (FDA) Ghana is the national regulatory body 
                  responsible for ensuring the safety, quality, and efficacy of food, drugs, 
                  medical devices, cosmetics, and household chemical substances.
                </p>
                <p>
                  Established under the Public Health Act, 2012 (Act 851), FDA Ghana operates 
                  with a mandate to protect public health and safety through comprehensive 
                  regulation and monitoring of regulated products.
                </p>
                <div className="mt-6 flex gap-4">
                  <div className="flex-1 bg-blue-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-[#2563EB]">1997</div>
                    <div className="text-sm text-slate-600">Established</div>
                  </div>
                  <div className="flex-1 bg-green-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">16</div>
                    <div className="text-sm text-slate-600">Regional Offices</div>
                  </div>
                  <div className="flex-1 bg-purple-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">500+</div>
                    <div className="text-sm text-slate-600">Staff Members</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-[#0F172A] mb-4">Our Mandate</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center mt-0.5">
                    <Shield className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  <p className="text-slate-600">Regulate food, drugs, cosmetics, medical devices & household chemicals</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center mt-0.5">
                    <BadgeCheck className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-slate-600">License manufacturing facilities & ensure GMP compliance</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center mt-0.5">
                    <Truck className="w-4 h-4 text-purple-600" />
                  </div>
                  <p className="text-slate-600">Control import/export of regulated products</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center mt-0.5">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                  </div>
                  <p className="text-slate-600">Conduct post-market surveillance & adverse event monitoring</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-[#0F172A] mb-16">
            Product Categories We Regulate
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: '🍎', title: 'Food Products', desc: 'Processed foods, beverages, supplements' },
              { icon: '💊', title: 'Pharmaceuticals', desc: 'Prescription & OTC medicines' },
              { icon: '💉', title: 'Medical Devices', desc: 'Equipment, implants, diagnostics' },
              { icon: '💄', title: 'Cosmetics', desc: 'Skincare, makeup, personal care' },
              { icon: '🧪', title: 'Chemicals', desc: 'Household & industrial chemicals' },
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{category.title}</h3>
                <p className="text-sm text-slate-600">{category.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#0F172A]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-white mb-6">
            Ready to Register Your Product?
          </h2>
          <p className="text-lg text-slate-300 mb-10">
            Join thousands of companies already using our digital platform for seamless 
            regulatory compliance management.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/register">
              <Button 
                size="lg" 
                className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-8 h-12 text-base"
              >
                Create Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-[#0F172A] mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-slate-600">
              Have questions about product registration? We're here to help.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-[#2563EB]" />
              </div>
              <h3 className="font-semibold text-[#0F172A] mb-2">Head Office</h3>
              <p className="text-sm text-slate-600">
                17 Indian Ocean Street<br />
                Nelson Mandela Ave, Accra
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-[#0F172A] mb-2">Contact Info</h3>
              <p className="text-sm text-slate-600">
                +233 302 233 200<br />
                fda@fda.gov.gh
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-[#0F172A] mb-2">Office Hours</h3>
              <p className="text-sm text-slate-600">
                Mon - Fri: 8:00 AM - 5:00 PM<br />
                Sat - Sun: Closed
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}