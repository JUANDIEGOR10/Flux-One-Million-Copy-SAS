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

      {/* AI Summary Banner (Mock) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-cyan-600 p-8 text-white shadow-2xl shadow-indigo-500/20"
      >
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Lightbulb className="h-4 w-4" />
              Insight Inteligente
            </div>
            <h2 className="text-2xl font-black md:text-3xl">Optimiza tu pauta en Instagram</h2>
            <p className="mt-2 text-indigo-50/80">
              El 45% de tus leads provienen de Instagram con un presupuesto promedio alto. 
              Considera reasignar un 15% del presupuesto de Facebook para maximizar el ROI.
            </p>
          </div>
          <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-8 text-sm font-bold text-indigo-600 transition-all hover:bg-indigo-50 hover:scale-105 active:scale-95 md:w-auto">
            Ver detalle
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        
        {/* Abstract background shapes */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 left-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
      </motion.div>
    </div>
  );
}
