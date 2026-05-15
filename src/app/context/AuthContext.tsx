/**
 * Tour Arcade — AuthContext
 * Drop into: src/app/context/AuthContext.tsx
 *
 * Wraps the entire app. Provides auth state + helpers to every component.
 * Replace the mock data in useGameState.ts by reading from this context.
 */

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { authApi, tokenStorage, type UserProfile } from '../utils/api';

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthContextValue {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<UserProfile>) => void;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  email: string;
  username: string;
  password: string;
  password_confirm: string;
  date_of_birth?: string;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    // Hydrate from localStorage on first render to avoid flash
    try {
      const cached = localStorage.getItem('ta_user');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  // On mount — verify the stored token is still valid
  useEffect(() => {
    const verify = async () => {
      if (!tokenStorage.getAccess()) {
        setIsLoading(false);
        return;
      }
      try {
        const fresh = await authApi.me();
        setUser(fresh);
        localStorage.setItem('ta_user', JSON.stringify(fresh));
      } catch {
        // Token invalid/expired — clear everything
        tokenStorage.clear();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    verify();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await authApi.login({ email, password });
    tokenStorage.set(data.access, data.refresh);
    setUser(data.user);
    localStorage.setItem('ta_user', JSON.stringify(data.user));
    localStorage.setItem('ta_username', data.user.username);
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    const res = await authApi.register(data);
    tokenStorage.set(res.access, res.refresh);
    setUser(res.user);
    localStorage.setItem('ta_user', JSON.stringify(res.user));
    localStorage.setItem('ta_username', res.user.username);
  }, []);

  const logout = useCallback(async () => {
    const refresh = tokenStorage.getRefresh();
    try {
      if (refresh) await authApi.logout(refresh);
    } catch {
      // Ignore — clear locally regardless
    }
    tokenStorage.clear();
    setUser(null);
  }, []);

  const updateUser = useCallback((data: Partial<UserProfile>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem('ta_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const fresh = await authApi.me();
      setUser(fresh);
      localStorage.setItem('ta_user', JSON.stringify(fresh));
    } catch {
      // Silently fail — user stays as-is
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateUser,
      refreshUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
