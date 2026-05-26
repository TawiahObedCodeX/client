// ─────────────────────────────────────────────────
// app/layout.tsx - Root Layout Component
// Wraps all pages with providers, fonts, and metadata
// Version: 2026.1.0
// ─────────────────────────────────────────────────

import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { Footer } from "@/components/layout/Footer"

// ─────────────────────────────────────────────────
// Font Configuration
// ─────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
  preload: true,
  fallback: ["system-ui", "Arial", "sans-serif"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-mono",
  preload: true,
})

// ─────────────────────────────────────────────────
// Metadata Configuration
// ─────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "FDA Ghana | FIRMS - Regulatory Management System",
    template: "%s | FDA Ghana FIRMS",
  },
  description:
    "Official FDA Ghana Product Registration & Regulatory Management System. Submit, track, and manage product registrations with Ghana's Food and Drugs Authority.",
  keywords: [
    "FDA Ghana",
    "product registration",
    "regulatory compliance",
    "food and drugs authority",
    "Ghana FDA",
    "FIRMS",
    "pharmaceutical registration",
    "medical device registration",
    "cosmetics registration",
    "food product registration",
  ],
  authors: [
    {
      name: "Food and Drugs Authority Ghana",
      url: "https://www.fda.gov.gh",
    },
  ],
  creator: "FDA Ghana IT Department",
  publisher: "Food and Drugs Authority Ghana",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "https://www.fda.gov.gh",
    siteName: "FDA Ghana FIRMS",
    title: "FDA Ghana | FIRMS - Regulatory Management System",
    description:
      "Official FDA Ghana Product Registration & Regulatory Management System",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FDA Ghana FIRMS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FDA Ghana | FIRMS",
    description: "Official FDA Ghana Product Registration & Regulatory Management System",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#2563EB",
      },
    ],
  },
  manifest: "/site.webmanifest",
  category: "Government",
}

// ─────────────────────────────────────────────────
// Viewport Configuration
// ─────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

// ─────────────────────────────────────────────────
// Root Layout Component
// ─────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`light ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to important origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Security headers (these should also be in next.config) */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* PWA meta tags */}
        <meta name="application-name" content="FDA Ghana FIRMS" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FDA FIRMS" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2563EB" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col bg-[#F8FAFC]`}
      >
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>

        {/* Main content area */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Toast notification system */}
        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={4000}
          visibleToasts={3}
          expand={false}
          toastOptions={{
            style: {
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
              padding: "12px 16px",
              fontSize: "14px",
            },
            classNames: {
              toast: "group toast",
              title: "text-sm font-semibold",
              description: "text-xs text-slate-500",
              actionButton: "bg-blue-600",
              cancelButton: "bg-slate-100",
              closeButton: "opacity-50 hover:opacity-100",
            },
          }}
        />

        {/* Development debug helper (removed in production build) */}
        {process.env.NODE_ENV === "development" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                console.log('%c🐛 FDA Ghana FIRMS %cDevelopment Mode',
                  'font-size: 14px; font-weight: bold; color: #2563EB;',
                  'font-size: 12px; color: #64748B;'
                );
                console.log('%c📦 Version: 2026.1.0', 'color: #10B981;');
                console.log('%c🔧 Env: ' + '${process.env.NODE_ENV}', 'color: #F59E0B;');
              `,
            }}
          />
        )}
      </body>
    </html>
  )
}