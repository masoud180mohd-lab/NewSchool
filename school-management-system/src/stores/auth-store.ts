import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, Role } from '@/types';
import { authService } from '@/services/auth-service';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const result = await authService.login({ email, password });
          set({ 
            user: result.user, 
            token: result.token, 
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
      logout: async () => {
        await authService.logout();
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false 
        });
      },
      
      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user });
      },
      
      setToken: (token: string | null) => {
        set({ token });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
