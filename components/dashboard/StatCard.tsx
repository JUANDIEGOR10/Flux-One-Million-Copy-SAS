'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: 'primary' | 'cyan' | 'emerald' | 'amber';
}

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend,
  color = 'primary' 
}: StatCardProps) {
  const colorStyles = {
    primary: "bg-primary/10 text-primary shadow-primary/20",
    cyan: "bg-cyan-500/10 text-cyan-500 shadow-cyan-500/20",
    emerald: "bg-emerald-500/10 text-emerald-500 shadow-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-500 shadow-amber-500/20",
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-2xl border bg-card p-6 transition-all hover:shadow-xl dark:shadow-none"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-foreground md:text-3xl">
            {value}
          </h3>
        </div>
        <div className={cn("rounded-xl p-2.5", colorStyles[color])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>

      {(description || trend) && (
        <div className="mt-4 flex items-center gap-2">
          {trend && (
            <span className={cn(
              "text-xs font-bold px-2 py-0.5 rounded-full border",
              trend.isPositive 
                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                : "bg-rose-500/10 text-rose-500 border-rose-500/20"
            )}>
              {trend.value}
            </span>
          )}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      {/* Decorative gradient highlight */}
      <div className={cn(
        "absolute -right-6 -top-6 h-24 w-24 rounded-full blur-3xl opacity-10",
        color === 'primary' ? "bg-primary" : `bg-${color}-500`
      )} />
    </motion.div>
  );
}
