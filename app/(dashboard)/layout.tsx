// app/dashboard/layout.tsx
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
    // Force show loader on every mount (refresh or navigation)
    setIsLoading(true);
    setShowContent(false);

    // Minimum loader display time = 1.4 seconds (2026 Version)
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
    }, 1400);

    return () => clearTimeout(timer);
  }, []); // Runs every time layout mounts (important for refresh)

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-auto relative p-6 lg:p-8">
          
          {/* ==================== FULL PAGE LOADER - 2026 VERSION ==================== */}
          {isLoading && (
            <div className="full-page-loader">
              <Loader size="large" />
            </div>
          )}

          {/* Main Content - Only show after loader finishes */}
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