import { useMemo } from 'react';
import { MOCK_LEADS } from '../lib/mock-data';
import { 
  subDays, 
  startOfDay, 
  isAfter, 
  format, 
  eachDayOfInterval 
} from 'date-fns';
import { es } from 'date-fns/locale';
import { LeadSource } from '../types/lead';

export const useStats = () => {
  const stats = useMemo(() => {
    const totalLeads = MOCK_LEADS.length;

    // Promedio de presupuesto
    const totalBudget = MOCK_LEADS.reduce((acc, lead) => acc + lead.presupuesto, 0);
    const avgBudget = totalLeads > 0 ? totalBudget / totalLeads : 0;

    // Leads últimos 7 días
    const sevenDaysAgo = startOfDay(subDays(new Date(), 7));
    const recentLeadsCount = MOCK_LEADS.filter((lead) => 
      isAfter(new Date(lead.fecha_creacion), sevenDaysAgo)
    ).length;

    // Distribución por fuente
    const sourceMap: Record<LeadSource, number> = {
      instagram: 0,
      facebook: 0,
      landing_page: 0,
      referido: 0,
      otro: 0,
    };

    MOCK_LEADS.forEach((lead) => {
      sourceMap[lead.fuente]++;
    });

    const sourceData = Object.entries(sourceMap).map(([name, value]) => ({
      name: name === 'landing_page' ? 'Landing' : name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }));

    // Tendencia últimos 7 días
    const last7Days = eachDayOfInterval({
      start: subDays(new Date(), 6),
      end: new Date()
    });

    const trendData = last7Days.map(day => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const count = MOCK_LEADS.filter(lead => 
        format(new Date(lead.fecha_creacion), 'yyyy-MM-dd') === dayStr
      ).length;
      
      return {
        date: format(day, 'eee dd', { locale: es }),
        leads: count
      };
    });

    return {
      totalLeads,
      avgBudget,
      recentLeadsCount,
      sourceData,
      trendData,
    };
  }, []);

  return stats;
};
