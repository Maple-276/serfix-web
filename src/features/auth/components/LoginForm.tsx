// Ruta: src/features/auth/components/LoginForm.tsx
import React, { useState, FormEvent } from 'react';
import { Credentials } from '../types';
// Asume la existencia de estos componentes básicos en lib
// import { Input } from '../../../lib/components/core/Input';
// import { Button } from '../../../lib/components/core/Button';
// import { Alert } from '../../../lib/components/feedback/Alert';
// import { Spinner } from '../../../lib/components/feedback/Spinner'; // Opcional para el botón

// --- Mock Componentes de UI (reemplazar con los reales de lib) ---
const Input = ({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div style={{ marginBottom: '10px' }}>
    <label style={{ display: 'block', marginBottom: '5px' }}>{label}</label>
    <input {...props} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
  </div>
);
const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...props} style={{ padding: '10px 15px', cursor: 'pointer' }}>
    {children}
  </button>
);
const Alert = ({ message, type }: { message: string; type: 'error' | 'success' }) => (
  <div style={{ padding: '10px', margin: '10px 0', border: `1px solid ${type === 'error' ? 'red' : 'green'}`, color: type === 'error' ? 'red' : 'green', backgroundColor: type === 'error' ? '#ffe0e0' : '#e0ffe0' }}>
    {message}
  </div>
);
// --- Fin Mock Componentes ---


interface LoginFormProps {
  onSubmit: (credentials: Credentials) => Promise<void>; // La función que se llama al enviar
  isLoading: boolean; // Para mostrar feedback de carga
  error: string | null; // Para mostrar mensajes de error del intento de login
}

/**
 * Formulario para que los usuarios introduzcan sus credenciales de inicio de sesión.
 * Utiliza estado local para manejar los inputs.
 * Muestra feedback de carga y errores.
 * TODO: Considerar usar react-hook-form para manejo de formularios más complejo y validaciones.
 */
export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading, error }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Previene la recarga de la página
    if (!isLoading) { // Evita envíos múltiples mientras carga
        onSubmit({ email, password });
    }
  };

  return (
    // Asigna una clase para posible estilado con CSS Modules o global
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Iniciar Sesión</h2>

      {/* Muestra un mensaje de error si existe */}
      {error && <Alert message={error} type="error" />}

      <Input
        label="Correo Electrónico:"
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isLoading} // Deshabilita inputs mientras carga
        autoComplete="email"
      />

      <Input
        label="Contraseña:"
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={isLoading} // Deshabilita inputs mientras carga
        autoComplete="current-password"
      />

      <Button type="submit" disabled={isLoading}>
        {/* Muestra texto diferente o un spinner si está cargando */}
        {isLoading ? 'Iniciando...' : 'Entrar'}
        {/* {isLoading && <Spinner size="small" />} Alternativa con spinner */}
      </Button>
    </form>
  );
};
