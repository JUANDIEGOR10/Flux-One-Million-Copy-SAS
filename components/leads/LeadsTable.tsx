'use client';

import { useState } from 'react';
import { useLeads } from '@/hooks/useLeads';
import { useLeadFilters } from '@/hooks/useLeadFilters';
import { useLeadsDataStore } from '@/store/leads-data-store';
import { useUIStore } from '@/store/ui-store';
import LeadRow from './LeadRow';
import { Lead } from '@/types/lead';
import { ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import LeadEmptyState from './LeadEmptyState';
import LeadErrorState from './LeadErrorState';
import LeadDrawer from './LeadDrawer';
import DeleteConfirm from '../ui/DeleteConfirm';

export default function LeadsTable() {
  const { filters, setSortBy, setSortOrder } = useLeadFilters();
  const { data, isLoading, isError, refetch } = useLeads(filters);
  const { deleteLead } = useLeadsDataStore();
  const { 
    isLeadDrawerOpen, 
    drawerMode, 
    selectedLeadId, 
    openLeadDrawer, 
    closeLeadDrawer 
  } = useUIStore();

  const [deleteConfig, setDeleteConfig] = useState<{
    isOpen: boolean;
    leadId: string | null;
    leadName: string;
  }>({
    isOpen: false,
    leadId: null,
    leadName: '',
  });

  const handleSort = (column: keyof Lead) => {
    if (filters.sortBy === column) {
      setSortOrder(filters.sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const handleCloseDrawer = () => {
    closeLeadDrawer();
    refetch(); // Refresh after create/edit
  };

  const openDelete = (lead: Lead) => {
    setDeleteConfig({ isOpen: true, leadId: lead.id, leadName: lead.nombre });
  };

  const confirmDelete = () => {
    if (deleteConfig.leadId) {
      deleteLead(deleteConfig.leadId);
      refetch();
    }
  };

  const SortIcon = ({ column }: { column: keyof Lead }) => {
    if (filters.sortBy !== column) return null;
    return filters.sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  if (isError) return <LeadErrorState onRetry={() => refetch()} />;

  const leads = data?.leads || [];

  return (
    <>
      <div className="relative overflow-x-auto rounded-2xl border bg-card/30 backdrop-blur-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors">
            <tr>
              <th className="px-6 py-4">Usuario</th>
              <th className="px-6 py-4 cursor-pointer hover:text-foreground" onClick={() => handleSort('fuente')}>
                <div className="flex items-center gap-1">
                  Fuente <SortIcon column="fuente" />
                </div>
              </th>
              <th className="px-6 py-4">Producto</th>
              <th className="px-6 py-4 cursor-pointer hover:text-foreground" onClick={() => handleSort('presupuesto')}>
                <div className="flex items-center gap-1">
                  Presupuesto <SortIcon column="presupuesto" />
                </div>
              </th>
              <th className="px-6 py-4 cursor-pointer hover:text-foreground" onClick={() => handleSort('fecha_creacion')}>
                <div className="flex items-center gap-1">
                  Fecha <SortIcon column="fecha_creacion" />
                </div>
              </th>
              <th className="px-6 py-4">Estado / Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={6} className="px-6 py-8">
                    <div className="h-10 w-full rounded-lg bg-muted/40" />
                  </td>
                </tr>
              ))
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-20">
                  <LeadEmptyState />
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <LeadRow 
                  key={lead.id} 
                  lead={lead} 
                  onView={(id) => openLeadDrawer('view', id)}
                  onEdit={(id) => openLeadDrawer('edit', id)}
                  onDelete={() => openDelete(lead)}
                />
              ))
            )}
          </tbody>
        </table>
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-card/10 backdrop-blur-[1px]">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        )}
      </div>

      {/* Global Components */}
      <LeadDrawer 
        isOpen={isLeadDrawerOpen}
        onClose={handleCloseDrawer}
        mode={drawerMode}
        leadId={selectedLeadId}
      />

      <DeleteConfirm 
        isOpen={deleteConfig.isOpen}
        onClose={() => setDeleteConfig((p) => ({ ...p, isOpen: false }))}
        onConfirm={confirmDelete}
        title="¿Eliminar Lead?"
        message={`Esta acción eliminará permanentemente a "${deleteConfig.leadName}". Esta operación no se puede deshacer.`}
      />
    </>
  );
}
