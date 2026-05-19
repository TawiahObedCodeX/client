// app/(dashboard)/layout.tsx - Dashboard Layout
// This layout wraps all dashboard pages with sidebar and navbar

'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Loader } from '@/components/common/Loader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show loader on every page mount/refresh
    setIsLoading(true);
    setShowContent(false);

    // Loader duration: 1.4 seconds for 2026 version
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Small delay before showing content for smooth transition
      setTimeout(() => setShowContent(true), 100);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      {/* Sidebar - Hidden on mobile, visible on large screens */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-auto relative p-6 lg:p-8">
          
          {/* Full Page Loader Overlay */}
          {isLoading && (
            <div className="full-page-loader">
              <Loader size="large" />
            </div>
          )}

          {/* Main Content with fade transition */}
          <div
            className={`min-h-full transition-opacity duration-500 ${
              isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            {showContent && children}
          </div>
        </main>
      </div>
    </div>
  );
}