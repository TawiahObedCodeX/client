// components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import {
  LayoutDashboard,
  FileText,
  Award,
  User,
  Settings,
  LogOut,
  ShieldCheck,
  Clock,
  Users,
} from "lucide-react";

import { signOut, useSession } from "next-auth/react";

import { cn } from "@/lib/utils";

const menuItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/applications",
    label: "My Applications",
    icon: FileText,
  },
  {
    href: "/certificates",
    label: "Certificates",
    icon: Award,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

const officerMenuItems = [
  {
    href: "/officer/dashboard",
    label: "Review Queue",
    icon: Clock,
  },
  {
    href: "/officer/reports",
    label: "Reports",
    icon: Users,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const { data: session } = useSession();

  const role = session?.user?.role;

  const isOfficer =
    role === "OFFICER" ||
    role === "SENIOR_OFFICER" ||
    role === "ADMIN";

  return (
    <aside className="fixed left-0 top-0 bottom-0 z-30 hidden w-64 flex-col bg-[#0D1B2A] text-white lg:flex">
      {/* Header */}
      <div className="border-b border-white/10 p-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-[#D4A017]" />

          <div>
            <span className="font-heading block text-lg font-black tracking-wider">
              FDA GHANA
            </span>

            <span className="font-mono block text-xs text-[#D4A017]">
              RegTech Portal
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            pathname?.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-4 py-3 transition-all group",
                isActive
                  ? "bg-[#D4A017] text-[#0D1B2A]"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />

              <span className="text-sm font-medium">
                {item.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeSidebar"
                  className="absolute left-0 h-8 w-1 rounded-r-full bg-[#D4A017]"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          );
        })}

        {/* Officer Section */}
        {isOfficer && (
          <>
            <div className="my-4 h-px bg-white/10" />

            {officerMenuItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href ||
                pathname?.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 transition-all",
                    isActive
                      ? "bg-[#D4A017] text-[#0D1B2A]"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5" />

                  <span className="text-sm font-medium">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-4">
        <button
          onClick={() => signOut()}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition-all hover:bg-red-600/20 hover:text-red-400"
        >
          <LogOut className="h-5 w-5" />

          <span className="text-sm font-medium">
            Sign Out
          </span>
        </button>
      </div>
    </aside>
  );
}