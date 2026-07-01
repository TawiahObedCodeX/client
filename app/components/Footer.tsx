// src/components/layout/Footer.tsx

"use client";

// ============================================
// FDA GHANA FRMS - FOOTER COMPONENT
// A comprehensive footer with:
// - Company information and branding
// - Quick navigation links
// - Contact information
// - Social media links
// - Copyright notice
// - Responsive grid layout
// ============================================

import Link from "next/link";
import {
  HiOutlineShieldCheck,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineChevronRight,
} from "react-icons/hi";
import {
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

export function Footer() {
  // Current year for copyright
  const currentYear = new Date().getFullYear();

  // Quick scroll handler for footer links
  const handleScrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-primary-950 to-primary-900 border-t border-gold-500/20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* ============================================
            MAIN FOOTER GRID
            Four columns on desktop, stack on mobile
            ============================================ */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* ============================================
              COLUMN 1: BRAND & DESCRIPTION
              ============================================ */}
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 shadow-lg shadow-gold-500/30">
                <HiOutlineShieldCheck className="h-7 w-7 text-primary-950" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">FDA Ghana</h3>
                <p className="text-xs font-medium text-gold-400">
                  Regulation Management
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-surface-400 mb-6">
              The official digital platform for the Food and Drugs Authority
              Ghana. Streamlining product registration, certification, and
              public verification for national health safety.
            </p>

            {/* Social Media Links */}
            <div className="flex gap-3">
              {[
                { icon: FaTwitter, label: "Twitter" },
                { icon: FaFacebook, label: "Facebook" },
                { icon: FaLinkedin, label: "LinkedIn" },
                { icon: FaYoutube, label: "YouTube" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-surface-700/50 text-surface-400 transition-all hover:border-gold-500/50 hover:bg-gold-500/10 hover:text-gold-400"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ============================================
              COLUMN 2: QUICK LINKS
              ============================================ */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About FDA Ghana", href: "#about" },
                { label: "Features", href: "#features" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Verify Certificate", href: "/verify" },
                { label: "Contact Us", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("#")) {
                        handleScrollToSection(e, link.href.replace("#", ""));
                      }
                    }}
                    className="group flex items-center gap-2 text-sm text-surface-400 transition-colors hover:text-gold-400"
                  >
                    <HiOutlineChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ============================================
              COLUMN 3: SERVICES
              ============================================ */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
              Our Services
            </h4>
            <ul className="space-y-3">
              {[
                "Product Registration",
                "Certificate Verification",
                "Import Clearance",
                "Market Surveillance",
                "Clinical Trials Oversight",
              ].map((service) => (
                <li key={service}>
                  <span className="flex items-center gap-2 text-sm text-surface-400">
                    <HiOutlineChevronRight className="h-3 w-3 text-gold-500/50" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ============================================
              COLUMN 4: CONTACT INFORMATION
              ============================================ */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {/* Address */}
              <li>
                <a
                  href="#"
                  className="flex gap-3 text-sm text-surface-400 transition-colors hover:text-gold-400"
                >
                  <HiOutlineLocationMarker className="h-5 w-5 flex-shrink-0 text-gold-500" />
                  <span>
                    Food and Drugs Authority
                    <br />
                    No. 17 Indian Ocean Street
                    <br />
                    Nelson Mandela Avenue
                    <br />
                    Accra, Ghana
                  </span>
                </a>
              </li>

              {/* Phone */}
              <li>
                <a
                  href="tel:+233302233200"
                  className="flex items-center gap-3 text-sm text-surface-400 transition-colors hover:text-gold-400"
                >
                  <HiOutlinePhone className="h-5 w-5 flex-shrink-0 text-gold-500" />
                  +233 (0) 30 223 3200
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href="mailto:info@fdaghana.gov.gh"
                  className="flex items-center gap-3 text-sm text-surface-400 transition-colors hover:text-gold-400"
                >
                  <HiOutlineMail className="h-5 w-5 flex-shrink-0 text-gold-500" />
                  info@fdaghana.gov.gh
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ============================================
            BOTTOM BAR
            Copyright and legal links
            ============================================ */}
        <div className="mt-12 border-t border-surface-700/30 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Copyright */}
            <p className="text-sm text-surface-500">
              &copy; {currentYear} Food and Drugs Authority Ghana. All rights
              reserved.
            </p>

            {/* Legal Links */}
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Accessibility"].map(
                (link) => (
                  <Link
                    key={link}
                    href="#"
                    className="text-sm text-surface-500 transition-colors hover:text-gold-400"
                  >
                    {link}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}