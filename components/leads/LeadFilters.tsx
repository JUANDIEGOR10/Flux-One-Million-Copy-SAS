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
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
      {/* Header & Reset */}
      <div className="flex items-center justify-between shrink-0 lg:flex-col lg:items-start lg:gap-1">
        <div className="flex items-center gap-2 text-sm font-black text-foreground uppercase tracking-widest">
          <Filter className="h-4 w-4 text-primary" />
          Filtros
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-[10px] font-bold text-primary hover:text-primary/80 transition-colors uppercase"
          >
            <RotateCcw className="h-3 w-3" />
            Limpiar
          </button>
        )}
      </div>

      <div className="flex flex-col gap-6 flex-1 lg:flex-row lg:items-center lg:gap-12">
        {/* Fuentes */}
        <div className="flex-1">
          <p className="mb-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Fuente de origen</p>
          <div className="flex flex-wrap gap-1.5">
            {SOURCES.map((fuente) => {
              const selected = filters.fuentes.includes(fuente);
              return (
                <button
                  key={fuente}
                  onClick={() => toggleFuente(fuente)}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all border",
                    selected
                      ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "bg-muted/50 border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {getSourceLabel(fuente)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Date Range */}
        <div className="lg:w-[400px]">
          <p className="mb-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Rango de fechas</p>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[9px] uppercase text-muted-foreground font-black">Desde</span>
              <input
                type="date"
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : undefined;
                  setDateRange(date, filters.dateRange.to);
                }}
                className="w-full rounded-xl border border-border/50 bg-background/50 p-2 pl-12 text-[11px] outline-none focus:border-primary transition-colors hover:bg-background"
              />
            </div>
            <div className="w-2 h-[1px] bg-border shrink-0" />
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[9px] uppercase text-muted-foreground font-black">Hasta</span>
              <input
                type="date"
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : undefined;
                  setDateRange(filters.dateRange.from, date);
                }}
                className="w-full rounded-xl border border-border/50 bg-background/50 p-2 pl-12 text-[11px] outline-none focus:border-primary transition-colors hover:bg-background"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
