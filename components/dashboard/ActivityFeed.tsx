// components/dashboard/ActivityFeed.tsx
"use client";

import { motion } from "motion/react";
import { Activity, FileCheck2, UserPlus, Clock } from "lucide-react";

interface Activity {
  id: string;
  type: "submission" | "review" | "status_change" | "comment";
  message: string;
  createdAt: string;
  user: string;
}

const iconMap = {
  submission: FileCheck2,
  review: Activity,
  status_change: Clock,
  comment: UserPlus,
};

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  if (!activities.length) {
    return <p className="text-slate-500 text-center py-8">No recent activity</p>;
  }

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => {
        const Icon = iconMap[activity.type] || Activity;
        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:shadow-sm transition-all"
          >
            <div className="p-2 bg-slate-50 rounded-lg">
              <Icon className="w-4 h-4 text-[#D4A017]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-700">{activity.message}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-slate-400">{activity.user}</span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-400">
                  {new Date(activity.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}