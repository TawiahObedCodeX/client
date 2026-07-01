// src/app/layout.tsx

// ============================================
// FDA GHANA FRMS - ROOT LAYOUT
// This is the main layout wrapper for the entire application
// It includes metadata, fonts, and global providers
// ============================================

import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// ============================================
// FONT CONFIGURATION
// Using next/font for optimal performance
// ============================================

// Heading Font - Outfit (Modern, Clean, Authoritative)
const outfitFont = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Body Font - Plus Jakarta Sans (Excellent Readability)
const jakartaFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// ============================================
// METADATA CONFIGURATION
// SEO and browser tab information
// ============================================
export const metadata: Metadata = {
  title: {
    default: "FDA Ghana FRMS - Food & Drugs Authority Regulation Management",
    template: "%s | FDA Ghana FRMS",
  },
  description:
    "Official digital platform for Food and Drugs Authority Ghana - Streamlining product registration, certification, and public verification for national health safety.",
  keywords: [
    "FDA Ghana",
    "Food and Drugs Authority",
    "Regulatory Platform",
    "Product Registration",
    "Certificate Verification",
    "Ghana Health Authority",
  ],
  authors: [{ name: "FDA Ghana" }],
  creator: "FDA Ghana",
  publisher: "Food and Drugs Authority Ghana",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "https://frms.fdaghana.gov.gh",
    siteName: "FDA Ghana FRMS",
    title: "FDA Ghana FRMS - Regulatory Management System",
    description:
      "Digitizing and securing the full regulatory lifecycle of the Food and Drugs Authority Ghana.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FDA Ghana FRMS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FDA Ghana FRMS",
    description:
      "Official digital regulatory platform for Food and Drugs Authority Ghana",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

// ============================================
// ROOT LAYOUT COMPONENT
// Wraps all pages with consistent structure
// ============================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfitFont.variable} ${jakartaFont.variable}`}
    >
      <body className="min-h-screen bg-surface-50 text-surface-900 antialiased">
        {/* Skip to main content - Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-primary-900 focus:shadow-lg"
        >
          Skip to main content
        </a>

        {/* Main Application Content */}
        <div id="main-content" className="relative flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}