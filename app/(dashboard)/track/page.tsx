// app/(dashboard)/track/page.tsx
// Track Application Status Page

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { StatusTimeline } from '@/components/dashboard/StatusTimeline';

export default function TrackPage() {
  const timelineSteps = [
    { status: 'Application Submitted', date: 'March 15, 2026', completed: true, current: false },
    { status: 'Document Verification', date: 'March 18, 2026', completed: true, current: false },
    { status: 'Under Review', date: 'March 25, 2026', completed: false, current: true },
    { status: 'Quality Assessment', date: 'Pending', completed: false, current: false },
    { status: 'Final Decision', date: 'Pending', completed: false, current: false },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A]">Track Application Status</h1>
        <p className="text-slate-500 mt-1">
          Monitor the progress of your submitted applications
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#2563EB]" />
            Application Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <StatusTimeline steps={timelineSteps} />
        </CardContent>
      </Card>
    </div>
  );
}