import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UIState {
  isLeadDrawerOpen: boolean;
  drawerMode: 'create' | 'edit' | 'view';
  selectedLeadId: string | null;
  theme: 'dark' | 'light';
  openLeadDrawer: (mode: 'create' | 'edit' | 'view', leadId?: string | null) => void;
  closeLeadDrawer: () => void;
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isLeadDrawerOpen: false,
      drawerMode: 'create',
      selectedLeadId: null,
      theme: 'dark', // Default according to user

      openLeadDrawer: (mode, leadId = null) => set({
        isLeadDrawerOpen: true,
        drawerMode: mode,
        selectedLeadId: leadId
      }),

      closeLeadDrawer: () => set({
        isLeadDrawerOpen: false,
        selectedLeadId: null
      }),

      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'dark' ? 'light' : 'dark' 
      })),

      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'flux-omcs-ui-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
