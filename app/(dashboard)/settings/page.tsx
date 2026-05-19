// app/(dashboard)/settings/page.tsx
// Settings Page

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A]">Settings</h1>
        <p className="text-slate-500 mt-1">
          Configure your application settings and notifications
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#2563EB]" />
            System Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            Notification preferences, security settings, and system configuration coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}