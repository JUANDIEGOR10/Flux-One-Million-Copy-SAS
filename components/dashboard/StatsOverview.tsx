'use client';

import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Lightbulb, 
  ArrowRight 
} from 'lucide-react';
import StatCard from './StatCard';
import { useStats } from '@/hooks/useStats';
import { formatCurrency } from '@/lib/utils';
import LeadTrendChart from './LeadTrendChart';
import SourceChart from './SourceChart';
import AISummaryCard from './AISummaryCard';
import { motion } from 'framer-motion';

export default function StatsOverview() {
  const { 
    totalLeads, 
    avgBudget, 
    recentLeadsCount, 
    sourceData, 
    trendData 
  } = useStats();

  return (
    <div className="space-y-10">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Leads" 
          value={totalLeads} 
          icon={Users} 
          description="Prospectos acumulados"
          trend={{ value: "+12%", isPositive: true }}
          color="primary"
        />
        <StatCard 
          title="Últimos 7 días" 
          value={recentLeadsCount} 
          icon={Calendar} 
          description="Nuevos interesados"
          color="cyan"
        />
        <StatCard 
          title="Presupuesto Prom." 
          value={formatCurrency(avgBudget)} 
          icon={DollarSign} 
          description="Valor por prospecto"
          color="emerald"
        />
        <StatCard 
          title="Tasa de Crecimiento" 
          value="24.8%" 
          icon={TrendingUp} 
          description="Comparado con el mes anterior"
          trend={{ value: "+5.4%", isPositive: true }}
          color="amber"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <LeadTrendChart data={trendData} />
        <SourceChart data={sourceData} />
      </div>

      {/* AI Summary Section */}
      <AISummaryCard />
    </div>
  );
}
