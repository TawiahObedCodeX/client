// src/app/(public)/layout.tsx

// ============================================
// PUBLIC PAGES LAYOUT
// Layout wrapper for all public-facing pages
// Includes Navbar and Footer components
// ============================================

import { Navbar } from "../app/components/Navbar";
import { Footer } from "../app/components/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Fixed Navigation Bar - Always visible on top */}
      <Navbar />

      {/* Main Content Area - Pushes footer to bottom if content is short */}
      <main className="flex-1">{children}</main>

      {/* Site Footer - Appears at bottom of every public page */}
      <Footer />
    </>
  );
}