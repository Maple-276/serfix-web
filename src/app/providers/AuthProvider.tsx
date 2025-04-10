// Ruta: src/app/providers/AuthProvider.tsx
import React from 'react';
import { AuthProviderInternal } from '../../lib/contexts/AuthContext'; // Importa la implementación

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Componente wrapper para el AuthProvider.
 * Mantiene la estructura de providers organizada en la carpeta app/providers.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Simplemente renderiza el provider interno que contiene la lógica.
  // No llama a initializeAuth aquí, eso se hace dentro de AuthProviderInternal.
  return <AuthProviderInternal>{children}</AuthProviderInternal>;
};
