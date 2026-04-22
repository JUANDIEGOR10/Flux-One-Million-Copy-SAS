import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Lead } from '../types/lead';
import { MOCK_LEADS } from '../lib/mock-data';

interface LeadsDataState {
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'fecha_creacion' | 'estado'>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  getLeadById: (id: string) => Lead | undefined;
}

export const useLeadsDataStore = create<LeadsDataState>()(
  persist(
    (set, get) => ({
      leads: MOCK_LEADS,

      addLead: (newLeadData) => set((state) => {
        const newLead: Lead = {
          ...newLeadData,
          id: Math.random().toString(36).substring(2, 9),
          fecha_creacion: new Date().toISOString(),
          estado: 'nuevo'
        };
        return { leads: [newLead, ...state.leads] };
      }),

      updateLead: (id, updates) => set((state) => ({
        leads: state.leads.map((lead) => 
          lead.id === id ? { ...lead, ...updates } : lead
        )
      })),

      deleteLead: (id) => set((state) => ({
        leads: state.leads.filter((lead) => lead.id !== id)
      })),

      getLeadById: (id) => get().leads.find((lead) => lead.id === id),
    }),
    {
      name: 'flux-leads-data',
    }
  )
);
