// app/(dashboard)/page.tsx
'use client';

import { useEffect } from 'react';
import { DashboardCards } from '@/components/dashboard/DashboardCards';
import { RecentApplicationsTable } from '@/components/dashboard/RecentApplicationsTable';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  useEffect(() => {
    console.log('=== DASHBOARD LOADED ===');
    console.log('Cookies:', document.cookie);
    
    // Optional: Check if we have auth token
    const hasAuth = document.cookie.includes('auth-token=authenticated');
    if (!hasAuth) {
      console.warn('⚠️ No auth token found on dashboard');
    } else {
      console.log('✅ Auth token found');
    }
  }, []);

  const stats = [
    { title: 'Total Applications', value: '12', change: '+3 this month', icon: FileText, trend: 'up' as const },
    { title: 'Pending Review', value: '5', change: '2 near deadline', icon: Clock, trend: 'warning' as const },
    { title: 'Approved', value: '6', change: '92% success rate', icon: TrendingUp, trend: 'up' as const },
    { title: 'Requires Action', value: '1', change: 'Response needed', icon: Clock, trend: 'down' as const },
  ];

  const recentApplications = [
    { id: 'FDA-2026-001', product: 'Paracetamol Tablets', category: 'Pharmaceuticals', status: 'Under Review', submittedDate: '2026-03-15', lastUpdated: '2026-04-02' },
    { id: 'FDA-2026-002', product: 'Shea Butter Cream', category: 'Cosmetics', status: 'Approved', submittedDate: '2026-02-28', lastUpdated: '2026-03-20' },
    { id: 'FDA-2026-003', product: 'Breakfast Cereal', category: 'Food Products', status: 'Pending Payment', submittedDate: '2026-03-10', lastUpdated: '2026-03-28' },
    { id: 'FDA-2026-004', product: 'Digital Thermometer', category: 'Medical Devices', status: 'Draft', submittedDate: '2026-04-01', lastUpdated: '2026-04-05' },
  ];

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A]">Dashboard</h1>
            <p className="text-slate-500 mt-1">Welcome back! Here's your regulatory overview.</p>
          </div>
          <Link href="/dashboard/new-registration">
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              New Application
            </Button>
          </Link>
        </div>
      </div>

      <DashboardCards stats={stats} />

      <div className="mt-8">
        <RecentApplicationsTable applications={recentApplications} />
      </div>
    </div>
  );
}