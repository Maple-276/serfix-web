import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Mientras verificamos si hay un usuario autenticado, mostramos un loader
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  // Si no hay usuario, redirigimos al login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si hay usuario, mostramos el contenido protegido
  return <>{children}</>;
};

export default ProtectedRoute; 