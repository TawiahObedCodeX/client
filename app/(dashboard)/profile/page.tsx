// app/(dashboard)/profile/page.tsx
// Profile Page

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Building2, Phone } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A]">Profile Settings</h1>
        <p className="text-slate-500 mt-1">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
          <CardContent className="p-6 text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-slate-200">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-[#2563EB] text-white text-3xl">TO</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold text-[#0F172A]">Tawiah O.</h3>
            <p className="text-slate-500 text-sm">Applicant</p>
            <Button variant="outline" size="sm" className="mt-4">
              Change Photo
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-slate-400" />
              <span className="text-slate-600">Full profile editing coming soon.</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}