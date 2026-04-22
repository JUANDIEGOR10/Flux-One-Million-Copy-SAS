'use client';

import { useLeadFilters } from '@/hooks/useLeadFilters';
import { useLeads } from '@/hooks/useLeads';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LeadPagination() {
  const { filters, setPage } = useLeadFilters();
  const { data } = useLeads(filters);

  if (!data || data.totalPages <= 1) return null;

  const { page } = filters;
  const { totalPages, total } = data;

  const goToPage = (p: number) => {
    if (p >= 1 && p <= totalPages) {
      setPage(p);
    }
  };

  const startIdx = (page - 1) * filters.limit + 1;
  const endIdx = Math.min(page * filters.limit, total);

  return (
    <div className="flex flex-col items-center justify-between gap-4 py-4 md:flex-row">
      <p className="text-xs text-muted-foreground">
        Mostrando <span className="font-bold text-foreground">{startIdx}-{endIdx}</span> de <span className="font-bold text-foreground">{total}</span> leads
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => goToPage(1)}
          disabled={page === 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg border bg-card/50 text-muted-foreground transition-all hover:bg-muted hover:text-foreground disabled:opacity-30"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg border bg-card/50 text-muted-foreground transition-all hover:bg-muted hover:text-foreground disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-1 mx-2">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            // Simple window logic for pages
            let p = i + 1;
            if (totalPages > 5 && page > 3) p = page - 3 + i + 1;
            if (p > totalPages) return null;

            return (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={cn(
                  "h-8 min-w-[32px] rounded-lg border text-xs font-bold transition-all",
                  page === p 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "bg-card/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {p}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
          className="flex h-8 w-8 items-center justify-center rounded-lg border bg-card/50 text-muted-foreground transition-all hover:bg-muted hover:text-foreground disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          onClick={() => goToPage(totalPages)}
          disabled={page === totalPages}
          className="flex h-8 w-8 items-center justify-center rounded-lg border bg-card/50 text-muted-foreground transition-all hover:bg-muted hover:text-foreground disabled:opacity-30"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
