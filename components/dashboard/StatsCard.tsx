// components/dashboard/StatsCard.tsx
import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; isPositive: boolean };
  color?: string;
  className?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, color = "#0D1B2A", className }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all", className)}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-slate-500">{title}</p>
          <p className="text-3xl font-heading font-bold mt-2 text-[#0D1B2A]">{value}</p>
          {trend && (
            <p className={cn("text-xs mt-2", trend.isPositive ? "text-emerald-600" : "text-red-600")}>
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className="p-3 rounded-xl" style={{ backgroundColor: `${color}10` }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
    </motion.div>
  );
}