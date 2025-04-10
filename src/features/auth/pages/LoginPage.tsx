// Ruta: src/features/auth/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../../../lib/contexts/AuthContext';
import { Credentials } from '../types';
// Asume la existencia de este componente básico en lib
// import { Alert } from '../../../lib/components/feedback/Alert';

// --- Mock Componentes de UI (reemplazar con los reales de lib) ---
const Alert = ({ message, type }: { message: string; type: 'error' | 'success' }) => (
  <div style={{ padding: '10px', margin: '10px 0', border: `1px solid ${type === 'error' ? 'red' : 'green'}`, color: type === 'error' ? 'red' : 'green', backgroundColor: type === 'error' ? '#ffe0e0' : '#e0ffe0' }}>
    {message}
  </div>
);
// --- Fin Mock Componentes ---

/**
 * Página de inicio de sesión.
 * Renderiza el LoginForm y maneja la lógica de autenticación y navegación.
 */
export const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  // Determina a dónde redirigir después del login exitoso
  // Intenta usar la ubicación desde la que fue redirigido, o por defecto '/'
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (credentials: Credentials) => {
    setError(null); // Limpia errores previos
    try {
      await login(credentials);
      // Navega a la página anterior o al dashboard después del login exitoso
      navigate(from, { replace: true });
    } catch (err: any) {
      // Muestra el error proveniente del AuthContext
      setError(err.message || 'Ocurrió un error inesperado.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      {/* Puedes añadir un layout específico para páginas de autenticación si es necesario */}
      {/* <AuthLayout> */}
      <LoginForm
        onSubmit={handleLogin}
        isLoading={isLoading}
        error={error} // Pasa el error local al LoginForm
      />
      {/* </AuthLayout> */}
      {/* Información de prueba */}
      <div style={{marginTop: '20px', fontSize: '0.9em', color: '#555', textAlign: 'center'}}>
          <p>Usuarios de prueba:</p>
          <p>admin@serfix.com / password</p>
          <p>tech@serfix.com / password</p>
      </div>
    </div>
  );
};
