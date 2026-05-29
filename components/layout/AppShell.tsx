// components/layout/AppShell.tsx
"use client";

import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { Sidebar } from "./Sidebar";
import  Navbar  from "@/components/common/Navbar";  // correct path
import  Footer  from "@/components/common/Footer";   // correct path

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { data: session } = useSession();
  const isAuthenticated = !!session;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-0 lg:ml-64">
        <Navbar />
        <main className="flex-1 p-6 pt-24 lg:pt-6">{children}</main>
      </div>
    </div>
  );
}