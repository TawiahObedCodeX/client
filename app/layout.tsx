import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Footer } from "@/components/layout/Footer";   // ← Add this

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "FDA Ghana | FIRMS",
  description: "Official FDA Ghana Product Registration & Regulatory Management System",
  icons: { icon: "/fdalogo.jpg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Footer />          {/* ← Footer added here */}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}