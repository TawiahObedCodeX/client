import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FRMS | Food and Drugs Authority Ghana",
  description:
    "Enterprise Regulatory Management System for product application tracking, submissions, and public verification.",
  keywords: [
    "FDA",
    "Ghana",
    "RegTech",
    "Product Registration",
    "Food and Drugs Authority",
  ],
};
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        {children}
        <Toaster position="top-center" richColors closeButton />
        
      </body>
    </html>
  );
}