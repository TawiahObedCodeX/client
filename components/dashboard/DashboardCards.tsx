// components/dashboard/DashboardCards.tsx
// Dashboard statistics cards component

'use client';

import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down' | 'warning';
}

interface DashboardCardsProps {
  stats: StatCard[];
}

export function DashboardCards({ stats }: DashboardCardsProps) {
  // Color mappings based on trend
  const trendColors = {
    up: {
      bg: 'bg-blue-50',
      icon: 'text-blue-600',
      badge: 'bg-green-100 text-green-700',
    },
    down: {
      bg: 'bg-orange-50',
      icon: 'text-orange-600',
      badge: 'bg-orange-100 text-orange-700',
    },
    warning: {
      bg: 'bg-amber-50',
      icon: 'text-amber-600',
      badge: 'bg-amber-100 text-amber-700',
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const colors = trendColors[stat.trend];
        
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-[#0F172A]">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}