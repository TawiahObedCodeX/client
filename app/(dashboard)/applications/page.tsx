// app/(dashboard)/applications/page.tsx
// My Applications Page

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function ApplicationsPage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A]">My Applications</h1>
        <p className="text-slate-500 mt-1">
          View and manage all your submitted applications
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#2563EB]" />
            All Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            Full applications list with filtering, search, and status management coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}