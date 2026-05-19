// app/(dashboard)/new-registration/page.tsx
// New Product Registration Page

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardCheck } from 'lucide-react';

export default function NewRegistrationPage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A]">New Product Registration</h1>
        <p className="text-slate-500 mt-1">
          Submit a new product registration application to FDA Ghana
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-[#2563EB]" />
            Registration Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            Multi-step registration form coming soon. This will include product details, 
            manufacturer information, and document upload sections.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}