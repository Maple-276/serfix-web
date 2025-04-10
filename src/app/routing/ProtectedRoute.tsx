// Ruta: src/app/routing/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/contexts/AuthContext';
// Asume la existencia de este componente básico en lib
// import { Spinner } from '../../lib/components/feedback/Spinner';

// --- Mock Componentes de UI (reemplazar con los reales de lib) ---
const Spinner = ({ fullPage = false }: { fullPage?: boolean }) => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: fullPage ? '100vh' : 'auto', padding: '20px' }}>
        <div>Cargando...</div> {/* Placeholder simple */}
    </div>
);
// --- Fin Mock Componentes ---

interface ProtectedRouteProps {
  children?: React.ReactNode; // Although Outlet is preferred, children prop is a valid pattern too
}

/**
 * Componente de Ruta Protegida.
 * Verifica si el usuario está autenticado usando useAuth.
 * - Muestra un spinner mientras se verifica la autenticación inicial.
 * - Redirige a /login si el usuario no está autenticado, guardando la ubicación original.
 * - Renderiza el contenido anidado (a través de <Outlet />) si está autenticado.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation(); // Obtiene la ubicación actual

  // 1. Estado de carga inicial (verificando localStorage)
  if (isLoading) {
    // Muestra un indicador de carga a pantalla completa mientras se determina el estado
    return <Spinner fullPage={true} />;
  }

  // 2. Usuario no autenticado
  if (!isAuthenticated) {
    // Redirige al usuario a la página de login
    // Guarda la ubicación actual en el estado 'from' para poder redirigir de vuelta después del login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Usuario autenticado
  // Renderiza el componente hijo (si se usa el patrón children) o el Outlet (preferido para layouts)
  return children ? <>{children}</> : <Outlet />;
};
