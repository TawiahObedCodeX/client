// components/forms/MultiStepRegistration.tsx
// Multi-step form for product registration

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const steps = [
  { id: 1, title: 'Product Details' },
  { id: 2, title: 'Manufacturer Info' },
  { id: 3, title: 'Documents' },
  { id: 4, title: 'Review & Submit' },
];

export function MultiStepRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const progress = (currentStep / steps.length) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Registration - Step {currentStep} of {steps.length}</CardTitle>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent>
        <div className="min-h-75">
          {/* Step content will go here */}
          <p className="text-slate-600">Step {currentStep} form content coming soon.</p>
        </div>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
            disabled={currentStep === steps.length}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}