import { useLeadsStore } from '../store/leads-store';

export const useLeadFilters = () => {
  const { 
    filters, 
    setSearch, 
    setFuentes, 
    setDateRange, 
    setPage, 
    setSortBy, 
    setSortOrder,
    resetFilters 
  } = useLeadsStore();

  return {
    filters,
    setSearch,
    setFuentes,
    setDateRange,
    setPage,
    setSortBy,
    setSortOrder,
    resetFilters,
  };
};
