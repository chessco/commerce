// frontend/src/store/authStore.ts
import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  tenantId: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (user, token) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('tenant_id', user.tenantId);
    
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('tenant_id');
    
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuth: () => {
    const isAuthStr = localStorage.getItem('isAuthenticated');
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('access_token');
    
    if (isAuthStr === 'true' && userStr && token) {
      set({
        user: JSON.parse(userStr),
        token: token,
        isAuthenticated: true,
      });
    } else {
      set({ user: null, token: null, isAuthenticated: false });
    }
  },
}));
