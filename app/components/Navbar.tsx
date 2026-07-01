// src/components/layout/Navbar.tsx

"use client";

// ============================================
// FDA GHANA FRMS - NAVIGATION BAR
// A responsive, fixed navigation bar with:
// - Smooth scroll navigation to sections
// - Mobile responsive hamburger menu
// - Glass morphism effect on scroll
// - Active section highlighting
// ============================================

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  HiOutlineShieldCheck,
  HiOutlineMenuAlt3,
  HiOutlineX,
  HiOutlineArrowRight,
} from "react-icons/hi";

// Navigation Links Configuration
// Each link has a label and a section ID to scroll to
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  // State for mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State for scroll effect (adds background on scroll)
  const [isScrolled, setIsScrolled] = useState(false);

  // State for active section tracking
  const [activeSection, setActiveSection] = useState("home");

  // ============================================
  // SCROLL LISTENER EFFECT
  // Adds background and shadow when user scrolls
  // Tracks which section is currently in view
  // ============================================
  useEffect(() => {
    const handleScroll = () => {
      // Add background when scrolled past 20px
      setIsScrolled(window.scrollY > 20);

      // Determine which section is currently in view
      const sections = NAV_LINKS.map((link) =>
        document.getElementById(link.href.replace("#", "")),
      );

      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(NAV_LINKS[index].href.replace("#", ""));
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ============================================
  // SMOOTH SCROLL HANDLER
  // Prevents default link behavior and smoothly scrolls to section
  // ============================================
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      // Smooth scroll to the section
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Update active section
      setActiveSection(targetId);

      // Close mobile menu if open
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary-950/95 shadow-2xl backdrop-blur-lg border-b border-gold-500/20"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* ============================================
              LOGO / BRAND SECTION
              Includes FDA Ghana logo and brand name
              ============================================ */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="FDA Ghana Home"
          >
            {/* Logo Icon */}
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 shadow-lg shadow-gold-500/30 transition-transform group-hover:scale-110">
                <HiOutlineShieldCheck className="h-6 w-6 text-primary-950" />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-1 rounded-lg border border-gold-400/30 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            {/* Brand Text */}
            <div className="hidden sm:block">
              <h2 className="text-lg font-bold leading-tight text-white">
                FDA Ghana
              </h2>
              <p className="text-xs font-medium text-gold-400">
                Regulation Management
              </p>
            </div>
          </Link>

          {/* ============================================
              DESKTOP NAVIGATION LINKS
              Visible on medium screens and above
              ============================================ */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-gold-400"
                      : "text-surface-300 hover:text-white"
                  }`}
                >
                  {link.label}
                  {/* Active indicator line */}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-gold-400 to-gold-600" />
                  )}
                </a>
              );
            })}
          </div>

          {/* ============================================
              ACTION BUTTONS (Desktop)
              ============================================ */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            {/* Login Button */}
            <Link
              href="/login"
              className="rounded-lg border border-gold-500/30 px-5 py-2.5 text-sm font-semibold text-gold-400 transition-all hover:border-gold-500 hover:bg-gold-500/10 hover:text-gold-300"
            >
              Sign In
            </Link>

            {/* Register Button */}
            <Link
              href="/register"
              className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 px-5 py-2.5 text-sm font-semibold text-primary-950 shadow-lg shadow-gold-500/25 transition-all hover:from-gold-400 hover:to-gold-500 hover:shadow-gold-500/40"
            >
              Get Started
              <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* ============================================
              MOBILE MENU TOGGLE BUTTON
              Visible only on small screens
              ============================================ */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-surface-300 transition-colors hover:bg-surface-800/50 hover:text-white lg:hidden"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <HiOutlineX className="h-6 w-6" />
            ) : (
              <HiOutlineMenuAlt3 className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* ============================================
            MOBILE NAVIGATION MENU
            Slides down when hamburger is clicked
            ============================================ */}
        {isMobileMenuOpen && (
          <div className="border-t border-gold-500/20 bg-primary-950/95 backdrop-blur-lg lg:hidden">
            <div className="space-y-1 px-4 py-4">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`block rounded-lg px-4 py-3 text-base font-medium transition-all ${
                      isActive
                        ? "bg-gold-500/10 text-gold-400"
                        : "text-surface-300 hover:bg-surface-800/50 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}

              {/* Mobile Action Buttons */}
              <div className="mt-4 space-y-3 border-t border-gold-500/20 pt-4">
                <Link
                  href="/login"
                  className="block rounded-lg border border-gold-500/30 px-4 py-3 text-center text-sm font-semibold text-gold-400 transition-all hover:border-gold-500 hover:bg-gold-500/10"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="block rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 px-4 py-3 text-center text-sm font-semibold text-primary-950 shadow-lg"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
