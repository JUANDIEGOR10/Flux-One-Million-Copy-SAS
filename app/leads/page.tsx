'use client';

import LeadSearch from '@/components/leads/LeadSearch';
import LeadFilters from '@/components/leads/LeadFilters';
import LeadsTable from '@/components/leads/LeadsTable';
import LeadPagination from '@/components/leads/LeadPagination';
import { useUIStore } from '@/store/ui-store';
import { Download, Plus, List, LayoutGrid } from 'lucide-react';

export default function LeadsPage() {
  const { openLeadDrawer } = useUIStore();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
            Gestión de <span className="text-primary">Leads</span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            Visualiza, filtra y administra los prospectos de tus embudos de marketing.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex h-11 items-center gap-2 rounded-xl border bg-card px-4 text-sm font-bold text-foreground transition-all hover:bg-muted active:scale-95">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Exportar CSV</span>
          </button>
          <button 
            onClick={() => openLeadDrawer('create')}
            className="flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Nuevo Lead
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Horizontal Filters Bar */}
        <div className="rounded-2xl border bg-card/30 p-4 backdrop-blur-sm shadow-xl shadow-primary/5">
          <LeadFilters />
        </div>

        {/* Main Content Area */}
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <LeadSearch />
            
            <div className="flex items-center gap-2 rounded-xl border bg-card/50 p-1">
              <button className="rounded-lg bg-primary/10 p-1.5 text-primary">
                <List className="h-4 w-4" />
              </button>
              <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted">
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>

          <LeadsTable />
          
          <LeadPagination />
        </div>
      </div>
    </div>
  );
}
