import { useQuery } from '@tanstack/react-query';
import { MOCK_LEADS } from '../lib/mock-data';
import { Lead, LeadFilters, LeadsResponse } from '../types/lead';
import { isWithinInterval, parseISO } from 'date-fns';

const fetchLeads = async (filters: LeadFilters): Promise<LeadsResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  let filteredLeads = [...MOCK_LEADS];

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
    const valA = a[filters.sortBy as keyof Lead];
    const valB = b[filters.sortBy as keyof Lead];

    if (typeof valA === 'string' && typeof valB === 'string') {
      return filters.sortOrder === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    if (typeof valA === 'number' && typeof valB === 'number') {
      return filters.sortOrder === 'asc' ? valA - valB : valB - valA;
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
