import { useState, useCallback } from 'react';
import { useStats } from './useStats';

export interface AISummaryResult {
  analysis: string;
  mainSource: string;
  recommendations: string[];
}

export const useAISummary = () => {
  const { totalLeads, avgBudget, sourceData, trendData } = useStats();
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<AISummaryResult | null>(null);

  const generateSummary = useCallback(async () => {
    setIsGenerating(true);
    setResult(null);

    // Simular latencia de red/procesamiento de IA
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Lógica de análisis basada en los datos actuales
    const sortedSources = [...sourceData].sort((a, b) => b.value - a.value);
    const topSource = sortedSources[0];
    const totalRecentLeads = trendData.reduce((acc, d) => acc + d.leads, 0);
    
    const analysis = `Actualmente cuentas con un total de ${totalLeads} prospectos. En la última semana, hemos detectado un flujo de ${totalRecentLeads} nuevos interesados, lo que representa una actividad ${totalRecentLeads > 5 ? 'vibrante' : 'estable'} en tus embudos. El presupuesto promedio por lead es de ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(avgBudget)}, indicando un perfil de cliente con capacidad adquisitiva media-alta.`;

    const recommendations = [
      `Incrementar la inversión en ${topSource.name} dado que es tu canal de mayor conversión actual.`,
      `Implementar un flujo de nutrición (nurturing) automático para los ${totalLeads} prospectos acumulados para mejorar la tasa de cierre.`,
      `Considerar una campaña de retargeting específica para leads con presupuestos superiores al promedio actual.`
    ];

    setResult({
      analysis,
      mainSource: topSource.name,
      recommendations,
    });
    setIsGenerating(false);
  }, [totalLeads, avgBudget, sourceData, trendData]);

  return {
    generateSummary,
    isGenerating,
    result,
  };
};
