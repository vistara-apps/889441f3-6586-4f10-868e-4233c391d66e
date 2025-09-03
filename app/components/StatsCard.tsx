'use client';

import { TrendingUp, Users, DollarSign, Zap } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  icon: 'trending' | 'users' | 'dollar' | 'zap';
  variant?: 'default' | 'accent';
}

export default function StatsCard({ title, value, change, icon, variant = 'default' }: StatsCardProps) {
  const icons = {
    trending: TrendingUp,
    users: Users,
    dollar: DollarSign,
    zap: Zap,
  };

  const IconComponent = icons[icon];

  return (
    <div className={`rounded-2xl p-6 border backdrop-blur-md transition-transform hover:scale-[1.02] ${
      variant === 'accent'
        ? 'bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border-cyan-400/30'
        : 'bg-white/10 border-white/20'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white/80 font-medium">{title}</h3>
        <IconComponent className={`w-6 h-6 ${
          variant === 'accent' ? 'text-cyan-300' : 'text-white/60'
        }`} />
      </div>
      
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      
      {change && (
        <div className="text-sm text-green-400">
          {change}
        </div>
      )}
    </div>
  );
}
