import { useQuery } from '@tanstack/react-query';
import { Lead, LeadFilters, LeadsResponse } from '../types/lead';
import { isWithinInterval, parseISO } from 'date-fns';
import { useLeadsDataStore } from '../store/leads-data-store';

const fetchLeads = async (filters: LeadFilters): Promise<LeadsResponse> => {
  // Simulate minor delay to show skeletons/loading states
  await new Promise((resolve) => setTimeout(resolve, 300));

  const allLeads = useLeadsDataStore.getState().leads;
  let filteredLeads = [...allLeads];

  // Search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredLeads = filteredLeads.filter(
      (lead) =>
        lead.nombre.toLowerCase().includes(searchLower) ||
        lead.email.toLowerCase().includes(searchLower)
    );
  }

  // Source filter
  if (filters.fuentes.length > 0) {
    filteredLeads = filteredLeads.filter((lead) =>
      filters.fuentes.includes(lead.fuente)
    );
  }

  // Date range filter
  if (filters.dateRange.from && filters.dateRange.to) {
    filteredLeads = filteredLeads.filter((lead) => {
      const creationDate = parseISO(lead.fecha_creacion);
      return isWithinInterval(creationDate, {
        start: filters.dateRange.from!,
        end: filters.dateRange.to!,
      });
    });
  }

  // Sorting
  filteredLeads.sort((a, b) => {
    const field = filters.sortBy as keyof Lead;
    const order = filters.sortOrder === 'asc' ? 1 : -1;

    const valA = a[field];
    const valB = b[field];

    if (typeof valA === 'string' && typeof valB === 'string') {
      return valA.localeCompare(valB) * order;
    }

    if (typeof valA === 'number' && typeof valB === 'number') {
      return (valA - valB) * order;
    }

    // Default sorting for dates/other fields
    if (field === 'fecha_creacion') {
      return (new Date(a.fecha_creacion).getTime() - new Date(b.fecha_creacion).getTime()) * order;
    }

    return 0;
  });

  // Pagination
  const total = filteredLeads.length;
  const totalPages = Math.ceil(total / filters.limit);
  const start = (filters.page - 1) * filters.limit;
  const paginatedLeads = filteredLeads.slice(start, start + filters.limit);

  return {
    leads: paginatedLeads,
    total,
    totalPages,
  };
};

export const useLeads = (filters: LeadFilters) => {
  return useQuery({
    queryKey: ['leads', filters],
    queryFn: () => fetchLeads(filters),
    placeholderData: (previousData) => previousData,
  });
};
