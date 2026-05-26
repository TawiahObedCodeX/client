// ─────────────────────────────────────────────────
// app/page.tsx - Landing/Home Page
// Public landing page for FDA Ghana FIRMS
// Version: 2026.1.0
// ─────────────────────────────────────────────────

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
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
  ChevronRight,
  Menu,
  X,
  Star,
  Award,
  Heart,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
} from "lucide-react"
import Link from "next/link"

// ─────────────────────────────────────────────────
// Navigation Items
// ─────────────────────────────────────────────────
const navigationItems = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#features" },
  { label: "About FDA", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
]

// ─────────────────────────────────────────────────
// Trust Metrics Data
// ─────────────────────────────────────────────────
const trustMetrics = [
  {
    value: "1,200+",
    label: "Registered Companies",
    icon: Building2,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    value: "4,800+",
    label: "Products Approved",
    icon: BadgeCheck,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    value: "16",
    label: "Regional Offices",
    icon: Globe,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    value: "99.9%",
    label: "Uptime Guaranteed",
    icon: Shield,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
]

// ─────────────────────────────────────────────────
// Features Data
// ─────────────────────────────────────────────────
const features = [
  {
    icon: ClipboardCheck,
    title: "Product Registration",
    description:
      "Submit applications for food products, pharmaceuticals, medical devices, cosmetics, and household chemicals with our intuitive multi-step form.",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    hoverColor: "hover:bg-blue-100",
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    description:
      "Monitor your application status in real-time. Get instant notifications on reviews, requests for information, and final decisions.",
    color: "bg-green-50",
    iconColor: "text-green-600",
    hoverColor: "hover:bg-green-100",
  },
  {
    icon: BadgeCheck,
    title: "Digital Certificates",
    description:
      "Download digitally signed certificates upon product approval. Each certificate includes QR verification for authenticity.",
    color: "bg-purple-50",
    iconColor: "text-purple-600",
    hoverColor: "hover:bg-purple-100",
  },
  {
    icon: FlaskConical,
    title: "Laboratory Integration",
    description:
      "Schedule product testing at FDA-approved laboratories. Receive test results directly through the platform.",
    color: "bg-orange-50",
    iconColor: "text-orange-600",
    hoverColor: "hover:bg-orange-100",
  },
  {
    icon: AlertCircle,
    title: "Compliance Alerts",
    description:
      "Stay informed with automated alerts for regulatory changes, renewal deadlines, and compliance requirements.",
    color: "bg-red-50",
    iconColor: "text-red-600",
    hoverColor: "hover:bg-red-100",
  },
  {
    icon: Globe,
    title: "Import/Export Clearance",
    description:
      "Manage import permits and export certificates for regulated products with automated customs documentation.",
    color: "bg-teal-50",
    iconColor: "text-teal-600",
    hoverColor: "hover:bg-teal-100",
  },
]

// ─────────────────────────────────────────────────
// Product Categories Data
// ─────────────────────────────────────────────────
const productCategories = [
  {
    emoji: "🍎",
    title: "Food Products",
    description: "Processed foods, beverages, supplements, and fortified products",
  },
  {
    emoji: "💊",
    title: "Pharmaceuticals",
    description: "Prescription medicines, OTC drugs, and herbal products",
  },
  {
    emoji: "💉",
    title: "Medical Devices",
    description: "Equipment, implants, diagnostics, and surgical instruments",
  },
  {
    emoji: "💄",
    title: "Cosmetics",
    description: "Skincare, makeup, personal care, and beauty products",
  },
  {
    emoji: "🧪",
    title: "Chemicals",
    description: "Household chemicals, industrial substances, and pesticides",
  },
]

// ─────────────────────────────────────────────────
// Core Mandate Items
// ─────────────────────────────────────────────────
const coreMandates = [
  {
    icon: Shield,
    color: "bg-blue-100",
    iconColor: "text-blue-600",
    text: "Regulate food, drugs, cosmetics, medical devices & household chemicals",
  },
  {
    icon: Building2,
    color: "bg-green-100",
    iconColor: "text-green-600",
    text: "License manufacturing facilities & ensure Good Manufacturing Practices",
  },
  {
    icon: Truck,
    color: "bg-purple-100",
    iconColor: "text-purple-600",
    text: "Control import and export of regulated products",
  },
  {
    icon: AlertCircle,
    color: "bg-orange-100",
    iconColor: "text-orange-600",
    text: "Conduct post-market surveillance & adverse event monitoring",
  },
]

// ─────────────────────────────────────────────────
// Contact Information
// ─────────────────────────────────────────────────
const contactInfo = [
  {
    icon: Building2,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    title: "Head Office",
    details: [
      "17 Indian Ocean Street",
      "Nelson Mandela Avenue",
      "Accra, Ghana",
    ],
  },
  {
    icon: Globe,
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
    title: "Contact Information",
    details: [
      "Phone: +233 302 233 200",
      "Email: fda@fda.gov.gh",
      "Website: www.fda.gov.gh",
    ],
  },
  {
    icon: Clock,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
    title: "Office Hours",
    details: [
      "Monday - Friday",
      "8:00 AM - 5:00 PM",
      "Weekends & Holidays: Closed",
    ],
  },
]

// ─────────────────────────────────────────────────
// Main Landing Page Component
// ─────────────────────────────────────────────────
export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ═══════════════════════════════════════════
          PUBLIC NAVBAR
          ═══════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-sm group-hover:shadow-md transition-shadow">
                  F
                </div>
                <div className="hidden sm:block">
                  <span className="font-semibold text-xl tracking-tight text-[#0F172A]">
                    FDA Ghana
                  </span>
                  <p className="text-xs text-slate-500 -mt-0.5">
                    Regulatory Authority • 2026
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-sm font-medium text-slate-600 hover:text-[#2563EB] transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-[#2563EB] hover:bg-[#1E40AF] shadow-sm">
                  Register
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white animate-fade-in">
            <div className="px-4 py-4 space-y-3">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-600 hover:text-[#2563EB] hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3 border-t flex gap-3">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" className="w-full" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/register" className="flex-1">
                  <Button className="w-full bg-[#2563EB] hover:bg-[#1E40AF]" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ═══════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════ */}
      <section className="relative pt-16 pb-24 px-4 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-50 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-50" />

        <div className="max-w-5xl mx-auto text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-sm mb-6 animate-fade-in">
            <Shield className="w-4 h-4 text-[#2563EB]" />
            <span className="text-slate-600">
              Official FDA Ghana Digital Platform • 2026
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter text-[#0F172A] mb-6 leading-tight animate-fade-in-up">
            Regulatory Compliance
            <br />
            <span className="text-gradient">Made Simple</span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up">
            Submit, track, and manage product registrations with Ghana's Food and
            Drugs Authority. Enterprise-grade security, complete transparency, and
            streamlined workflows for the 2026 regulatory year.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-8 h-12 text-base shadow-lg shadow-blue-200 w-full sm:w-auto"
              >
                Start Registration
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <button onClick={() => scrollToSection("#features")}>
              <Button
                size="lg"
                variant="outline"
                className="px-8 h-12 text-base w-full sm:w-auto"
              >
                Learn More
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </button>
          </div>

          {/* Trusted by */}
          <div className="mt-16 animate-fade-in">
            <p className="text-sm text-slate-400 mb-4">
              Trusted by companies across Ghana
            </p>
            <div className="flex justify-center gap-8 opacity-50">
              <div className="h-8 w-24 bg-slate-300 rounded" />
              <div className="h-8 w-24 bg-slate-300 rounded" />
              <div className="h-8 w-24 bg-slate-300 rounded hidden sm:block" />
              <div className="h-8 w-24 bg-slate-300 rounded hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRUST METRICS BAR
          ═══════════════════════════════════════════ */}
      <section className="border-y bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-[#2563EB] mb-1">
                  {metric.value}
                </div>
                <p className="text-sm text-slate-500">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURES SECTION
          ═══════════════════════════════════════════ */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">
              Everything You Need for Regulatory Compliance
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our digital platform streamlines the entire product registration process
              with powerful features designed for efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div
                  className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 ${feature.hoverColor} transition-colors`}
                >
                  <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-[#0F172A] mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT FDA SECTION
          ═══════════════════════════════════════════ */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border bg-blue-50 px-4 py-1.5 text-sm mb-6">
                <Award className="w-4 h-4 text-[#2563EB]" />
                <span className="text-blue-700 font-medium">About FDA Ghana</span>
              </div>
              <h2 className="text-4xl font-bold text-[#0F172A] mb-6">
                Protecting Public Health Since 1997
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  The Food and Drugs Authority (FDA) Ghana is the national regulatory
                  body established under the Public Health Act, 2012 (Act 851). We are
                  responsible for ensuring the safety, quality, and efficacy of food,
                  drugs, medical devices, cosmetics, and household chemical substances.
                </p>
                <p>
                  With 16 regional offices across Ghana and over 500 dedicated staff
                  members, we work tirelessly to protect public health and safety
                  through comprehensive regulation and monitoring of regulated products.
                </p>
                <p>
                  In 2026, we continue to modernize our processes with digital
                  transformation initiatives, making regulatory compliance more
                  accessible and efficient for businesses across Ghana and beyond.
                </p>
              </div>

              {/* Stats */}
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

            {/* Right Column - Mandate */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 border">
              <h3 className="text-2xl font-semibold text-[#0F172A] mb-6">
                Our Core Mandate
              </h3>
              <div className="space-y-5">
                {coreMandates.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                    </div>
                    <p className="text-slate-600 pt-2">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES SECTION
          ═══════════════════════════════════════════ */}
      <section id="services" className="py-20 px-4">
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
            {productCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border hover:shadow-lg transition-all duration-300 text-center group cursor-pointer"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {category.emoji}
                </div>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-slate-500">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA SECTION
          ═══════════════════════════════════════════ */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#0F172A] to-[#1E293B] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full -translate-x-1/3 translate-y-1/3 blur-2xl" />

        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Register Your Product?
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Join over 1,200 companies already using our digital platform for seamless
            regulatory compliance management with FDA Ghana in 2026.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-10 h-14 text-base shadow-lg shadow-blue-500/25 w-full sm:w-auto"
              >
                Create Free Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:text-white hover:border-white px-10 h-14 text-base w-full sm:w-auto"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTACT SECTION
          ═══════════════════════════════════════════ */}
      <section id="contact" className="py-20 px-4 bg-white">
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
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="text-center p-8 bg-slate-50 rounded-2xl hover:shadow-lg transition-all"
              >
                <div
                  className={`w-16 h-16 ${info.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
                  <info.icon className={`w-8 h-8 ${info.iconColor}`} />
                </div>
                <h3 className="font-semibold text-lg text-[#0F172A] mb-3">
                  {info.title}
                </h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-sm text-slate-600 leading-relaxed">
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SCROLL TO TOP BUTTON
          ═══════════════════════════════════════════ */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-40 p-3 bg-[#2563EB] text-white rounded-xl shadow-lg hover:bg-[#1E40AF] transition-all animate-fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}