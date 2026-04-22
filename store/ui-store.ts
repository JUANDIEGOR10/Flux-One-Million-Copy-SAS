import { create } from 'zustand';

interface UIState {
  isLeadDrawerOpen: boolean;
  drawerMode: 'create' | 'edit' | 'view';
  selectedLeadId: string | null;
  openLeadDrawer: (mode: 'create' | 'edit' | 'view', leadId?: string | null) => void;
  closeLeadDrawer: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLeadDrawerOpen: false,
  drawerMode: 'create',
  selectedLeadId: null,

  openLeadDrawer: (mode, leadId = null) => set({
    isLeadDrawerOpen: true,
    drawerMode: mode,
    selectedLeadId: leadId
  }),

  closeLeadDrawer: () => set({
    isLeadDrawerOpen: false,
    selectedLeadId: null
  })
}));
