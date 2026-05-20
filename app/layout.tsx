// app/layout.tsx - Root Layout
// Wraps all pages with global providers and styles

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { Footer } from "@/components/layout/Footer"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "FDA Ghana | FIRMS",
  description: "Official FDA Ghana Product Registration & Regulatory Management System",
  icons: { icon: "/fdalogo.jpg" },
  keywords: "FDA Ghana, product registration, regulatory compliance, food and drugs authority",
  authors: [{ name: "FDA Ghana" }],
  openGraph: {
    title: "FDA Ghana | FIRMS",
    description: "Official FDA Ghana Product Registration & Regulatory Management System",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster 
          position="top-right" 
          richColors 
          closeButton 
          duration={4000}
          toastOptions={{
            style: {
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            },
          }}
        />
      </body>
    </html>
  )
}