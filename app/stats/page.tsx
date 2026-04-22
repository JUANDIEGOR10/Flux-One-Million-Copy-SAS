import StatsOverview from '@/components/dashboard/StatsOverview';
import { LayoutDashboard, Download, RefreshCw } from 'lucide-react';

export default function StatsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
            <LayoutDashboard className="h-4 w-4" />
            Panel de Control
          </div>
          <h1 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
            Estadísticas <span className="text-primary italic">Globales</span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            Análisis de rendimiento y conversión de leads en tiempo real.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex h-11 items-center gap-2 rounded-xl border bg-card px-4 text-sm font-bold text-foreground transition-all hover:bg-muted active:scale-95">
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Actualizar datos</span>
          </button>
          <button className="flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:scale-105 active:scale-95">
            <Download className="h-4 w-4" />
            Descargar Reporte
          </button>
        </div>
      </div>

      <StatsOverview />
    </div>
  );
}
