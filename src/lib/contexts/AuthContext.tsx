// Ruta: src/lib/contexts/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { Credentials, UserSession } from '../../features/auth/types'; // Asegúrate que la ruta sea correcta

// --- Mock User Data (Simula una base de datos) ---
const MOCK_USERS: Record<string, { password: string; user: UserSession }> = {
  'admin@serfix.com': {
    password: 'password',
    user: { id: 'user-001', email: 'admin@serfix.com', name: 'Admin User', role: 'admin' },
  },
  'tech@serfix.com': {
    password: 'password',
    user: { id: 'user-002', email: 'tech@serfix.com', name: 'Tech User', role: 'technician' },
  },
};

// --- Context Definition ---
interface AuthContextType {
  user: UserSession | null;
  isLoading: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean; // Helper derived state
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Auth Provider Component ---
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProviderInternal: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start loading to check localStorage

  const initializeAuth = useCallback(() => {
    setIsLoading(true);
    try {
      const storedUser = localStorage.getItem('userSession');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user session from localStorage", error);
      localStorage.removeItem('userSession'); // Clean up corrupted data
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Run initialization only once on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (credentials: Credentials): Promise<void> => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const potentialUser = MOCK_USERS[credentials.email];
        if (potentialUser && potentialUser.password === credentials.password) {
          const userSession = potentialUser.user;
          setUser(userSession);
          localStorage.setItem('userSession', JSON.stringify(userSession));
          setIsLoading(false);
          resolve();
        } else {
          setUser(null); // Clear user state on failed login
          localStorage.removeItem('userSession'); // Clear storage on failed login
          setIsLoading(false);
          reject(new Error('Credenciales inválidas'));
        }
      }, 1000); // Simulate 1 second network delay
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userSession');
    // No need to set loading state here, it's an immediate action
  };

  const isAuthenticated = !!user; // Derived state: true if user is not null

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// --- Custom Hook for Consuming Context ---
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
