/**
 * Define las credenciales necesarias para iniciar sesión.
 */
export interface Credentials {
  email: string;
  password: string; // En una aplicación real, nunca manejar la contraseña en texto plano en el frontend después del envío.
}

/**
 * Define la estructura de la sesión del usuario autenticado.
 */
export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'technician' | 'sales'; // Roles básicos para el MVP
}
