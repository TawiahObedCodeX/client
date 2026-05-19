// components/dashboard/RecentApplicationsTable.tsx
// Displays recent applications in a table format

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Application {
  id: string;
  product: string;
  category: string;
  status: string;
  submittedDate: string;
  lastUpdated: string;
}

interface RecentApplicationsTableProps {
  applications: Application[];
}

export function RecentApplicationsTable({ applications }: RecentApplicationsTableProps) {
  // Status badge colors
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700';
      case 'Under Review':
        return 'bg-blue-100 text-blue-700';
      case 'Pending Payment':
        return 'bg-amber-100 text-amber-700';
      case 'Draft':
        return 'bg-slate-100 text-slate-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Applications</CardTitle>
          <Link href="/dashboard/applications">
            <Button variant="ghost" size="sm" className="text-[#2563EB]">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Application ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Product</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 hidden md:table-cell">
                  Category
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 hidden lg:table-cell">
                  Submitted
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-500 hidden lg:table-cell">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4">
                    <span className="font-mono text-sm font-medium text-[#2563EB]">{app.id}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-[#0F172A]">{app.product}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600 hidden md:table-cell">
                    {app.category}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600 hidden lg:table-cell">
                    {app.submittedDate}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600 hidden lg:table-cell">
                    {app.lastUpdated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}