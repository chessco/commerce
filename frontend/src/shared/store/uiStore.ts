import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  adminViewType: 'table' | 'kanban';
  setAdminViewType: (viewType: 'table' | 'kanban') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      adminViewType: 'table',
      setAdminViewType: (viewType) => set({ adminViewType: viewType }),
    }),
    {
      name: 'voltia-ui-storage',
    }
  )
);
