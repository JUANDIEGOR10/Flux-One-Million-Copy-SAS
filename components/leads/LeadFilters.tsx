'use client';

import { Filter, RotateCcw, Calendar as CalendarIcon } from 'lucide-react';
import { useLeadFilters } from '@/hooks/useLeadFilters';
import { LeadSource } from '@/types/lead';
import { cn, getSourceLabel } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const SOURCES: LeadSource[] = ['instagram', 'facebook', 'landing_page', 'referido', 'otro'];

export default function LeadFilters() {
  const { filters, setFuentes, setDateRange, resetFilters } = useLeadFilters();

  const toggleFuente = (fuente: LeadSource) => {
    const newFuentes = filters.fuentes.includes(fuente)
      ? filters.fuentes.filter((f) => f !== fuente)
      : [...filters.fuentes, fuente];
    setFuentes(newFuentes);
  };

  const hasActiveFilters = filters.fuentes.length > 0 || filters.dateRange.from || filters.dateRange.to || filters.search;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Filter className="h-4 w-4" />
          Filtros avanzados
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            <RotateCcw className="h-3 w-3" />
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Fuentes */}
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Fuente de origen</p>
          <div className="flex flex-wrap gap-2">
            {SOURCES.map((fuente) => {
              const selected = filters.fuentes.includes(fuente);
              return (
                <button
                  key={fuente}
                  onClick={() => toggleFuente(fuente)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                    selected
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "bg-muted text-muted-foreground hover:bg-border hover:text-foreground"
                  )}
                >
                  {getSourceLabel(fuente)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Date Range - Simplified Mock implementation */}
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Rango de fechas</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] uppercase text-muted-foreground font-bold">Desde</span>
              <input
                type="date"
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : undefined;
                  setDateRange(date, filters.dateRange.to);
                }}
                className="w-full rounded-lg border bg-card/50 p-2 pl-14 text-xs outline-none focus:border-primary"
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] uppercase text-muted-foreground font-bold">Hasta</span>
              <input
                type="date"
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : undefined;
                  setDateRange(filters.dateRange.from, date);
                }}
                className="w-full rounded-lg border bg-card/50 p-2 pl-14 text-xs outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
