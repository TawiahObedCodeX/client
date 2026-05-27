// components/dashboard/StatusTimeline.tsx
"use client";

import { motion } from "motion/react";
import { CheckCircle, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  id: string;
  status: string;
  action: string;
  createdAt: string;
  officerName?: string;
  notes?: string;
}

interface StatusTimelineProps {
  events: TimelineEvent[];
}

export function StatusTimeline({ events }: StatusTimelineProps) {
  if (!events.length) {
    return <p className="text-slate-500 text-center py-8">No timeline events yet.</p>;
  }

  return (
    <div className="relative pl-8 space-y-6">
      {/* Vertical line */}
      <div className="absolute left-3 top-3 bottom-3 w-px bg-slate-200" />

      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative"
        >
          {/* Timeline dot */}
          <div
            className={cn(
              "absolute -left-8 top-1 w-5 h-5 rounded-full border-4 border-white flex items-center justify-center",
              index === events.length - 1 ? "bg-[#D4A017]" : "bg-emerald-500"
            )}
          >
            {index === events.length - 1 ? (
              <Clock className="w-3 h-3 text-white" />
            ) : (
              <CheckCircle className="w-3 h-3 text-white" />
            )}
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
            <div className="flex flex-wrap justify-between items-start gap-2">
              <div>
                <p className="font-semibold text-[#0D1B2A]">{event.action}</p>
                <p className="text-sm text-slate-500 font-mono">{event.status}</p>
                {event.notes && <p className="text-sm text-slate-600 mt-2">{event.notes}</p>}
                {event.officerName && (
                  <p className="text-xs text-slate-400 mt-1">By: {event.officerName}</p>
                )}
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {new Date(event.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}