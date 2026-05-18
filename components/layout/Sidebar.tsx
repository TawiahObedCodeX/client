'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Clock,
  User,
  Settings,
  LogOut,
} from 'lucide-react';

const navItems = [
  { 
    label: "Dashboard", 
    icon: LayoutDashboard, 
    href: "/dashboard" 
  },
  { 
    label: "New Registration", 
    icon: PlusCircle, 
    href: "/dashboard/new-registration" 
  },
  { 
    label: "My Applications", 
    icon: FileText, 
    href: "/dashboard/applications" 
  },
  { 
    label: "Track Status", 
    icon: Clock, 
    href: "/dashboard/track"           // Fixed: Better unique route
  },
  { 
    label: "Profile", 
    icon: User, 
    href: "/dashboard/profile" 
  },
  { 
    label: "Settings", 
    icon: Settings, 
    href: "/dashboard/settings" 
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex w-72 flex-col border-r bg-white h-full">
      {/* Sidebar Header */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-[#2563EB] rounded-2xl flex items-center justify-center text-white font-bold text-3xl">
            F
          </div>
          <div>
            <div className="font-semibold text-2xl tracking-tighter">FRMS</div>
            <p className="text-xs text-slate-500 -mt-1">FDA Ghana</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
                           (item.href !== "/dashboard" && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all group ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-sm"
                    : "hover:bg-slate-100 text-slate-700 hover:text-slate-900"
                }`}
              >
                <item.icon 
                  className={`w-5 h-5 transition-colors ${
                    isActive ? "text-white" : "text-slate-500 group-hover:text-slate-700"
                  }`} 
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Button at Bottom */}
      <div className="mt-auto p-6">
        <button 
          className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-2xl w-full text-sm font-medium transition-colors"
          onClick={() => {
            // Add logout logic here (e.g., signOut, redirect)
            console.log("Logout clicked");
          }}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}