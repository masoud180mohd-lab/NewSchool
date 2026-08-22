import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setIsMobile: (mobile: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  isMobile: false,
  
  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },
  
  setSidebarOpen: (open: boolean) => {
    set({ sidebarOpen: open });
  },
  
  setIsMobile: (mobile: boolean) => {
    set({ isMobile: mobile, sidebarOpen: !mobile });
  },
}));
