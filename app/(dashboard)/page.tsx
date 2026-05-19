// app/(dashboard)/page.tsx - Main Dashboard Page
// Shows overview, statistics, and recent applications

'use client';

import { DashboardCards } from '@/components/dashboard/DashboardCards';
import { RecentApplicationsTable } from '@/components/dashboard/RecentApplicationsTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  FileText, 
  Clock, 
  TrendingUp 
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  // Dashboard statistics for 2026
  const stats: {
    title: string;
    value: string;
    change: string;
    icon: any;
    trend: 'up' | 'warning' | 'down';
  }[] = [
    {
      title: 'Total Applications',
      value: '12',
      change: '+3 this month',
      icon: FileText,
      trend: 'up',
    },
    {
      title: 'Pending Review',
      value: '5',
      change: '2 near deadline',
      icon: Clock,
      trend: 'warning',
    },
    {
      title: 'Approved',
      value: '6',
      change: '92% success rate',
      icon: TrendingUp,
      trend: 'up',
    },
    {
      title: 'Requires Action',
      value: '1',
      change: 'Response needed',
      icon: Clock,
      trend: 'down',
    },
  ];

  // Recent applications data
  const recentApplications = [
    {
      id: 'FDA-2026-001',
      product: 'Paracetamol Tablets 500mg',
      category: 'Pharmaceuticals',
      status: 'Under Review',
      submittedDate: '2026-03-15',
      lastUpdated: '2026-04-02',
    },
    {
      id: 'FDA-2026-002',
      product: 'Organic Shea Butter Cream',
      category: 'Cosmetics',
      status: 'Approved',
      submittedDate: '2026-02-28',
      lastUpdated: '2026-03-20',
    },
    {
      id: 'FDA-2026-003',
      product: 'Fortified Breakfast Cereal',
      category: 'Food Products',
      status: 'Pending Payment',
      submittedDate: '2026-03-10',
      lastUpdated: '2026-03-28',
    },
    {
      id: 'FDA-2026-004',
      product: 'Digital Thermometer',
      category: 'Medical Devices',
      status: 'Draft',
      submittedDate: '2026-04-01',
      lastUpdated: '2026-04-05',
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* ===== Page Header ===== */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A]">Dashboard</h1>
            <p className="text-slate-500 mt-1">
              Welcome back, Tawiah O. Here's your regulatory overview for 2026.
            </p>
          </div>
          <Link href="/dashboard/new-registration">
            <Button className="bg-[#2563EB] hover:bg-[#1E40AF]">
              <PlusCircle className="w-4 h-4 mr-2" />
              New Application
            </Button>
          </Link>
        </div>
      </div>

      {/* ===== Statistics Cards ===== */}
      <DashboardCards stats={stats} />

      {/* ===== Main Content Grid ===== */}
      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        {/* Recent Applications Table */}
        <div className="lg:col-span-2">
          <RecentApplicationsTable applications={recentApplications} />
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/dashboard/new-registration">
                <Button variant="outline" className="w-full justify-start">
                  <PlusCircle className="w-4 h-4 mr-3" />
                  New Product Registration
                </Button>
              </Link>
              <Link href="/dashboard/applications">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-3" />
                  View All Applications
                </Button>
              </Link>
              <Link href="/dashboard/track">
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="w-4 h-4 mr-3" />
                  Track Application
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* FDA Ghana Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">FDA Ghana Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                <div className="font-medium text-[#2563EB]">📞</div>
                <div>
                  <p className="font-medium text-[#0F172A]">Helpline</p>
                  <p className="text-slate-600">+233 302 233 200</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                <div className="font-medium text-green-600">📧</div>
                <div>
                  <p className="font-medium text-[#0F172A]">Email Support</p>
                  <p className="text-slate-600">fda@fda.gov.gh</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl">
                <div className="font-medium text-purple-600">🕐</div>
                <div>
                  <p className="font-medium text-[#0F172A]">Office Hours</p>
                  <p className="text-slate-600">Mon-Fri, 8AM-5PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}