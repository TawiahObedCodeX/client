// ─────────────────────────────────────────────────
// components/layout/Footer.tsx
// Footer Component for Public Pages
// Version: 2026.1.0
// ─────────────────────────────────────────────────

import { Heart, Shield, Globe, Building2, Phone, Mail, MapPin, Clock, ChevronRight } from "lucide-react"
import Link from "next/link"

// ─────────────────────────────────────────────────
// Footer Data
// ─────────────────────────────────────────────────
const footerLinks = {
  quickLinks: [
    { label: "Register Product", href: "/register" },
    { label: "Applicant Login", href: "/login" },
    { label: "Track Application", href: "/dashboard/track" },
    { label: "Download Forms", href: "#" },
    { label: "Fee Schedule", href: "#" },
    { label: "FAQs", href: "#" },
  ],
  services: [
    { label: "Product Registration", href: "#" },
    { label: "Import/Export Permits", href: "#" },
    { label: "GMP Certification", href: "#" },
    { label: "Laboratory Testing", href: "#" },
    { label: "Post-Market Surveillance", href: "#" },
    { label: "Adverse Event Reporting", href: "#" },
  ],
  resources: [
    { label: "Guidelines & Forms", href: "#" },
    { label: "Regulations", href: "#" },
    { label: "Approved Products List", href: "#" },
    { label: "Press Releases", href: "#" },
    { label: "Publications", href: "#" },
    { label: "Careers", href: "#" },
  ],
  contact: {
    address: "17 Indian Ocean Street, Nelson Mandela Avenue, Accra, Ghana",
    phone: "+233 302 233 200",
    email: "fda@fda.gov.gh",
    website: "www.fda.gov.gh",
    hours: "Monday - Friday, 8:00 AM - 5:00 PM",
  },
}

// ─────────────────────────────────────────────────
// Footer Component
// ─────────────────────────────────────────────────
export function Footer() {
  const currentYear = 2026

  return (
    <footer className="border-t bg-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-sm flex-shrink-0">
                F
              </div>
              <div>
                <h3 className="font-bold text-xl text-[#0F172A]">FDA Ghana</h3>
                <p className="text-xs text-slate-500">Food and Drugs Authority</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md mb-6">
              The Food and Drugs Authority (FDA) Ghana is the national regulatory body 
              responsible for ensuring the safety, quality, and efficacy of food, drugs, 
              medical devices, cosmetics, and household chemical substances. Established 
              in 1997, we protect public health through comprehensive regulation.
            </p>
            <div className="flex gap-3">
              {/* Social Media Icons */}
              {["facebook", "twitter", "linkedin", "youtube"].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-9 h-9 bg-slate-100 hover:bg-[#2563EB] hover:text-white rounded-lg flex items-center justify-center text-slate-500 transition-colors"
                  aria-label={`Follow us on ${social}`}
                >
                  <span className="text-xs font-bold uppercase">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[#0F172A] mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-[#2563EB] transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#2563EB] transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-[#0F172A] mb-4 text-sm uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-[#2563EB] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-[#0F172A] mb-4 text-sm uppercase tracking-wider">
              Contact FDA
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-600">{footerLinks.contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <a
                  href={`tel:${footerLinks.contact.phone.replace(/\s/g, "")}`}
                  className="text-sm text-slate-600 hover:text-[#2563EB] transition-colors"
                >
                  {footerLinks.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <a
                  href={`mailto:${footerLinks.contact.email}`}
                  className="text-sm text-slate-600 hover:text-[#2563EB] transition-colors"
                >
                  {footerLinks.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <a
                  href={`https://${footerLinks.contact.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-600 hover:text-[#2563EB] transition-colors"
                >
                  {footerLinks.contact.website}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-600">{footerLinks.contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Shield className="w-4 h-4 text-[#2563EB]" />
              <span>
                © {currentYear} Food and Drugs Authority Ghana. All Rights Reserved.
              </span>
            </div>

            {/* Legal Links */}
            <div className="flex gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-900 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-slate-900 transition-colors">
                Terms of Use
              </a>
              <a href="#" className="hover:text-slate-900 transition-colors">
                Accessibility
              </a>
              <a href="#" className="hover:text-slate-900 transition-colors">
                Sitemap
              </a>
            </div>

            {/* Made with love */}
            <div className="flex items-center gap-1 text-sm text-slate-400">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>for Ghana</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}