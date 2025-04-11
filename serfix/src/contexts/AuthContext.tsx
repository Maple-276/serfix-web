import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthCredentials } from '../types/user';

interface AuthContextType {
  user: User | null;
  login: (credentials: AuthCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error al parsear el usuario almacenado:', error);
        localStorage.removeItem('auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: AuthCredentials): Promise<void> => {
    // Aquí iría la lógica real de autenticación con el backend
    // Por ahora, simulamos una respuesta exitosa
    
    try {
      // Simular petición al servidor
      setIsLoading(true);
      
      // Simulación de delay para la petición
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular respuesta exitosa
      const loggedUser: User = {
        id: '1',
        email: credentials.email,
        name: 'Usuario Demo',
        role: 'user',
        createdAt: new Date().toISOString()
      };
      
      // Guardar en localStorage
      localStorage.setItem('auth_user', JSON.stringify(loggedUser));
      setUser(loggedUser);
    } catch (error) {
      console.error('Error durante el login:', error);
      throw new Error('Error de autenticación');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem('auth_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 