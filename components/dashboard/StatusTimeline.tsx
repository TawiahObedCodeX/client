// components/dashboard/StatusTimeline.tsx
// Visual timeline for application status tracking

'use client';

import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface TimelineStep {
  status: string;
  date: string;
  completed: boolean;
  current: boolean;
}

interface StatusTimelineProps {
  steps: TimelineStep[];
}

export function StatusTimeline({ steps }: StatusTimelineProps) {
  return (
    <div className="space-y-0">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start gap-4">
          {/* Timeline indicator */}
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step.completed
                  ? 'bg-green-100 border-green-500'
                  : step.current
                  ? 'bg-blue-100 border-blue-500'
                  : 'bg-slate-100 border-slate-300'
              }`}
            >
              {step.completed ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : step.current ? (
                <Clock className="w-5 h-5 text-blue-600" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-slate-400" />
              )}
            </div>
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`w-0.5 h-8 ${
                  step.completed ? 'bg-green-500' : 'bg-slate-300'
                }`}
              />
            )}
          </div>

          {/* Step content */}
          <div className="pb-6">
            <p
              className={`font-medium ${
                step.completed
                  ? 'text-green-700'
                  : step.current
                  ? 'text-blue-700'
                  : 'text-slate-500'
              }`}
            >
              {step.status}
            </p>
            <p className="text-sm text-slate-500">{step.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}