// components/layout/Navbar.tsx - Updated Dashboard Navbar for 2026
// Top navigation bar visible on all dashboard pages

'use client';

import { useState } from 'react';
import { Bell, Menu, X, User, Settings, LogOut, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* ===== Left Side: Mobile Menu Button & Brand ===== */}
        <div className="flex items-center gap-4">
          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Brand/Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-sm">
              F
            </div>
            <div className="hidden sm:block">
              <p className="font-semibold text-lg tracking-tight text-[#0F172A] leading-tight">
                FDA Ghana
              </p>
              <p className="text-xs text-slate-500 -mt-0.5">
                Regulatory Management System • 2026
              </p>
            </div>
          </div>
        </div>

        {/* ===== Center: Search Bar (Hidden on mobile) ===== */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search applications..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        {/* ===== Right Side: Notifications & Profile ===== */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <Button variant="ghost" size="icon" className="relative hover:bg-slate-100">
            <Bell className="w-5 h-5 text-slate-600" />
            {/* Notification badge */}
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 cursor-pointer hover:bg-slate-100 p-1.5 pr-3 rounded-2xl transition-colors">
                <Avatar className="w-9 h-9 ring-2 ring-slate-200">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-[#2563EB] text-white">TO</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-[#0F172A]">Tawiah O.</p>
                  <p className="text-xs text-slate-500">Applicant</p>
                </div>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>Tawiah O.</span>
                  <span className="text-xs text-slate-500 font-normal">tawiah@example.com</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* ===== Mobile Navigation Menu ===== */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white px-6 py-4 animate-fade-in">
          <div className="space-y-2">
            {/* Mobile search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search applications..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium px-2">
              Navigation
            </p>
            {/* Mobile nav items will be rendered here by parent */}
          </div>
        </div>
      )}
    </nav>
  );
}