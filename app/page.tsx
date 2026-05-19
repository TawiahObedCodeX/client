// app/page.tsx - Landing/Home Page for FDA Ghana
// This is the public landing page, NOT the dashboard

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
  FlaskConical,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ========== PUBLIC NAVBAR ========== */}
      <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center text-white font-bold text-2xl">
              F
            </div>
            <div>
              <span className="font-semibold text-xl tracking-tight text-[#0F172A]">
                FDA Ghana
              </span>
              <p className="text-xs text-slate-500 -mt-0.5">Regulatory Authority</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-[#2563EB] transition-colors">
              Features
            </a>
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-[#2563EB] transition-colors">
              About FDA
            </a>
            <a href="#services" className="text-sm font-medium text-slate-600 hover:text-[#2563EB] transition-colors">
              Services
            </a>
            <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-[#2563EB] transition-colors">
              Contact
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-[#2563EB] hover:bg-[#1E40AF]">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ========== HERO SECTION ========== */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-sm mb-6 animate-fade-in">
            <Shield className="w-4 h-4 text-[#2563EB]" />
            <span className="text-slate-600">Official FDA Ghana Digital Platform • 2026</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl font-bold tracking-tighter text-[#0F172A] mb-6 leading-tight">
            Regulatory Compliance
            <br />
            <span className="text-gradient">Made Simple</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Submit, track, and manage product registrations with Ghana's Food and Drugs Authority. 
            Enterprise-grade security, complete transparency, and streamlined workflows.
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4">
            <Link href="/register">
              <Button 
                size="lg" 
                className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-8 h-12 text-base shadow-lg shadow-blue-200"
              >
                Start Registration
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button 
                size="lg" 
                variant="outline"
                className="px-8 h-12 text-base"
              >
                Learn More
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== TRUST METRICS BAR ========== */}
      <div className="border-y bg-white py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#2563EB]">1,200+</div>
            <p className="text-sm text-slate-500 mt-1">Registered Companies</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#2563EB]">4,800+</div>
            <p className="text-sm text-slate-500 mt-1">Products Approved</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#2563EB]">16</div>
            <p className="text-sm text-slate-500 mt-1">Regional Offices</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#2563EB]">99.9%</div>
            <p className="text-sm text-slate-500 mt-1">Uptime Guaranteed</p>
          </div>
        </div>
      </div>

      {/* ========== FEATURES SECTION ========== */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">
              Everything You Need for Regulatory Compliance
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our digital platform streamlines the entire product registration process
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 - Product Registration */}
            <div className="bg-white rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                <ClipboardCheck className="w-7 h-7 text-[#2563EB]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A] mb-3">Product Registration</h3>
              <p className="text-slate-600 leading-relaxed">
                Submit applications for food products, pharmaceuticals, medical devices, 
                cosmetics, and household chemicals with our intuitive multi-step form.
              </p>
            </div>

            {/* Feature 2 - Real-time Tracking */}
            <div className="bg-white rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-100 transition-colors">
                <Clock className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A] mb-3">Real-time Tracking</h3>
              <p className="text-slate-600 leading-relaxed">
                Monitor your application status in real-time. Get instant notifications 
                on reviews, requests for information, and final decisions.
              </p>
            </div>

            {/* Feature 3 - Digital Certificates */}
            <div className="bg-white rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-100 transition-colors">
                <BadgeCheck className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A] mb-3">Digital Certificates</h3>
              <p className="text-slate-600 leading-relaxed">
                Download digitally signed certificates upon product approval. 
                Each certificate includes QR verification for authenticity.
              </p>
            </div>

            {/* Feature 4 - Lab Testing */}
            <div className="bg-white rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-100 transition-colors">
                <FlaskConical className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A] mb-3">Laboratory Integration</h3>
              <p className="text-slate-600 leading-relaxed">
                Schedule product testing at FDA-approved laboratories. 
                Receive test results directly through the platform.
              </p>
            </div>

            {/* Feature 5 - Compliance Alerts */}
            <div className="bg-white rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors">
                <AlertCircle className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A] mb-3">Compliance Alerts</h3>
              <p className="text-slate-600 leading-relaxed">
                Stay informed with automated alerts for regulatory changes, 
                renewal deadlines, and compliance requirements.
              </p>
            </div>

            {/* Feature 6 - Import/Export */}
            <div className="bg-white rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-100 transition-colors">
                <Globe className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F172A] mb-3">Import/Export Clearance</h3>
              <p className="text-slate-600 leading-relaxed">
                Manage import permits and export certificates for regulated products 
                with automated customs documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ABOUT FDA SECTION ========== */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <div>
              <h2 className="text-4xl font-bold text-[#0F172A] mb-6">
                About the Food and Drugs Authority Ghana
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  The Food and Drugs Authority (FDA) Ghana is the national regulatory body 
                  established under the Public Health Act, 2012 (Act 851). We are responsible 
                  for ensuring the safety, quality, and efficacy of food, drugs, medical devices, 
                  cosmetics, and household chemical substances.
                </p>
                <p>
                  With 16 regional offices across Ghana and over 500 dedicated staff members, 
                  we work tirelessly to protect public health and safety through comprehensive 
                  regulation and monitoring of regulated products.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-[#2563EB]">1997</div>
                  <div className="text-xs text-slate-600 mt-1">Established</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">16</div>
                  <div className="text-xs text-slate-600 mt-1">Regional Offices</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">500+</div>
                  <div className="text-xs text-slate-600 mt-1">Staff Members</div>
                </div>
              </div>
            </div>

            {/* Right Column - Mandate Card */}
            <div className="bg-slate-50 rounded-3xl p-8 border">
              <h3 className="text-2xl font-semibold text-[#0F172A] mb-6">Our Core Mandate</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <p className="text-slate-600 pt-2">
                    Regulate food, drugs, cosmetics, medical devices & household chemicals
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-slate-600 pt-2">
                    License manufacturing facilities & ensure Good Manufacturing Practices
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-slate-600 pt-2">
                    Control import and export of regulated products
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="text-slate-600 pt-2">
                    Conduct post-market surveillance & adverse event monitoring
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SERVICES SECTION ========== */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">
              Product Categories We Regulate
            </h2>
            <p className="text-lg text-slate-600">
              FDA Ghana oversees the safety and quality of these product categories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Food Products */}
            <div className="bg-white rounded-2xl p-6 border hover:shadow-lg transition-all duration-300 text-center">
              <div className="text-5xl mb-4">🍎</div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Food Products</h3>
              <p className="text-sm text-slate-500">
                Processed foods, beverages, supplements, and fortified products
              </p>
            </div>

            {/* Pharmaceuticals */}
            <div className="bg-white rounded-2xl p-6 border hover:shadow-lg transition-all duration-300 text-center">
              <div className="text-5xl mb-4">💊</div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Pharmaceuticals</h3>
              <p className="text-sm text-slate-500">
                Prescription medicines, OTC drugs, and herbal products
              </p>
            </div>

            {/* Medical Devices */}
            <div className="bg-white rounded-2xl p-6 border hover:shadow-lg transition-all duration-300 text-center">
              <div className="text-5xl mb-4">💉</div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Medical Devices</h3>
              <p className="text-sm text-slate-500">
                Equipment, implants, diagnostics, and surgical instruments
              </p>
            </div>

            {/* Cosmetics */}
            <div className="bg-white rounded-2xl p-6 border hover:shadow-lg transition-all duration-300 text-center">
              <div className="text-5xl mb-4">💄</div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Cosmetics</h3>
              <p className="text-sm text-slate-500">
                Skincare, makeup, personal care, and beauty products
              </p>
            </div>

            {/* Chemicals */}
            <div className="bg-white rounded-2xl p-6 border hover:shadow-lg transition-all duration-300 text-center">
              <div className="text-5xl mb-4">🧪</div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Chemicals</h3>
              <p className="text-sm text-slate-500">
                Household chemicals, industrial substances, and pesticides
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Register Your Product?
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Join over 1,200 companies already using our digital platform for seamless 
            regulatory compliance management with FDA Ghana.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/register">
              <Button 
                size="lg" 
                className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-10 h-14 text-base shadow-lg shadow-blue-500/25"
              >
                Create Free Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== CONTACT SECTION ========== */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-slate-600">
              Have questions about product registration? We're here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Head Office */}
            <div className="text-center p-8 bg-slate-50 rounded-2xl hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-[#2563EB]" />
              </div>
              <h3 className="font-semibold text-lg text-[#0F172A] mb-3">Head Office</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                17 Indian Ocean Street<br />
                Nelson Mandela Avenue<br />
                Accra, Ghana
              </p>
            </div>

            {/* Contact Info */}
            <div className="text-center p-8 bg-slate-50 rounded-2xl hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg text-[#0F172A] mb-3">Contact Information</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Phone: +233 302 233 200<br />
                Email: fda@fda.gov.gh<br />
                Website: www.fda.gov.gh
              </p>
            </div>

            {/* Office Hours */}
            <div className="text-center p-8 bg-slate-50 rounded-2xl hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg text-[#0F172A] mb-3">Office Hours</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Monday - Friday<br />
                8:00 AM - 5:00 PM<br />
                Weekends & Holidays: Closed
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}