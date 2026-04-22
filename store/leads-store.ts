import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { LeadFilters, LeadSource } from '../types/lead';

interface LeadsState {
  filters: LeadFilters;
  setSearch: (search: string) => void;
  setFuentes: (fuentes: LeadSource[]) => void;
  setDateRange: (from: Date | undefined, to: Date | undefined) => void;
  setPage: (page: number) => void;
  setSortBy: (sortBy: LeadFilters['sortBy']) => void;
  setSortOrder: (sortOrder: 'asc' | 'desc') => void;
  resetFilters: () => void;
}

const initialFilters: LeadFilters = {
  search: '',
  fuentes: [],
  dateRange: {
    from: undefined,
    to: undefined,
  },
  page: 1,
  limit: 10,
  sortBy: 'fecha_creacion',
  sortOrder: 'desc',
};

export const useLeadsStore = create<LeadsState>()(
  persist(
    (set) => ({
      filters: initialFilters,
      setSearch: (search) => 
        set((state) => ({ 
          filters: { ...state.filters, search, page: 1 } 
        })),
      setFuentes: (fuentes) => 
        set((state) => ({ 
          filters: { ...state.filters, fuentes, page: 1 } 
        })),
      setDateRange: (from, to) => 
        set((state) => ({ 
          filters: { ...state.filters, dateRange: { from, to }, page: 1 } 
        })),
      setPage: (page) => 
        set((state) => ({ 
          filters: { ...state.filters, page } 
        })),
      setSortBy: (sortBy) => 
        set((state) => ({ 
          filters: { ...state.filters, sortBy } 
        })),
      setSortOrder: (sortOrder) => 
        set((state) => ({ 
          filters: { ...state.filters, sortOrder } 
        })),
      resetFilters: () => 
        set({ filters: initialFilters }),
    }),
    {
      name: 'flux-omcs-leads-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
