// components/layout/Sidebar.tsx - Updated with working logout functionality
// Left sidebar navigation for dashboard pages

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Clock,
  User,
  Settings,
  LogOut,
  HelpCircle,
  Loader2,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

// Navigation items configuration
const navItems = [
  { 
    label: "Dashboard", 
    icon: LayoutDashboard, 
    href: "/dashboard",
    description: "Overview & statistics"
  },
  { 
    label: "New Registration", 
    icon: PlusCircle, 
    href: "/dashboard/new-registration",
    description: "Submit new application"
  },
  { 
    label: "My Applications", 
    icon: FileText, 
    href: "/dashboard/applications",
    description: "View all applications"
  },
  { 
    label: "Track Status", 
    icon: Clock, 
    href: "/dashboard/track",
    description: "Monitor progress"
  },
  { 
    label: "Profile", 
    icon: User, 
    href: "/dashboard/profile",
    description: "Account settings"
  },
  { 
    label: "Settings", 
    icon: Settings, 
    href: "/dashboard/settings",
    description: "System preferences"
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Handle logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      // Call logout API
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        toast.success('Logged out successfully');
        // Redirect to landing page
        router.push('/');
        router.refresh();
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      toast.error('Logout failed. Please try again.');
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="hidden lg:flex w-72 flex-col border-r bg-white h-full">
      {/* ===== Sidebar Header ===== */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-sm">
            F
          </div>
          <div>
            <div className="font-bold text-xl tracking-tighter text-[#0F172A]">FRMS</div>
            <p className="text-xs text-slate-500 -mt-0.5">
              FDA Ghana • 2026
            </p>
          </div>
        </div>
      </div>

      {/* ===== Navigation Links ===== */}
      <div className="flex-1 px-4 py-6 overflow-y-auto">
        <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-3 px-3">
          Main Menu
        </p>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
                           (item.href !== "/dashboard" && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-md shadow-blue-200"
                    : "hover:bg-slate-100 text-slate-700 hover:text-slate-900"
                }`}
              >
                <item.icon 
                  className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    isActive ? "text-white" : "text-slate-500 group-hover:text-slate-700"
                  }`} 
                />
                <div className="flex flex-col">
                  <span>{item.label}</span>
                  <span className={`text-xs ${
                    isActive ? "text-blue-100" : "text-slate-400"
                  }`}>
                    {item.description}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ===== Bottom Section ===== */}
      <div className="p-4 border-t space-y-2">
        {/* Help Link */}
        <Link
          href="/help"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <HelpCircle className="w-5 h-5 text-slate-500" />
          Help & Support
        </Link>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-xl w-full text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Signing out...
            </>
          ) : (
            <>
              <LogOut className="w-5 h-5" />
              Sign Out
            </>
          )}
        </button>
      </div>
    </div>
  );
}