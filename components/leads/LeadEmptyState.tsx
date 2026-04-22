'use client';

import { SearchX } from 'lucide-react';
import { useLeadFilters } from '@/hooks/useLeadFilters';

export default function LeadEmptyState() {
  const { filters, resetFilters } = useLeadFilters();
  
  const hasFilters = filters.search || filters.fuentes.length > 0 || filters.dateRange.from || filters.dateRange.to;

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-500">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 transition-transform hover:scale-110">
        <SearchX className="h-10 w-10 text-muted-foreground/50" />
      </div>
      <h3 className="mt-6 text-xl font-bold tracking-tight text-foreground">No encontramos leads</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">
        {hasFilters 
          ? "Prueba ajustando tus filtros o borrando la búsqueda para encontrar lo que necesitas." 
          : "Aún no hay leads registrados en el sistema. Los verás aparecer aquí cuando lleguen."}
      </p>
      {hasFilters && (
        <button
          onClick={resetFilters}
          className="mt-6 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
        >
          Limpiar todos los filtros
        </button>
      )}
    </div>
  );
}
