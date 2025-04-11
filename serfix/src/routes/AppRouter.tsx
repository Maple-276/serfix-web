import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import HomePage from '../pages/HomePage';
import RepairFormPage from '../pages/RepairFormPage';
import RepairListPage from '../pages/RepairListPage';
import RepairDetailPage from '../pages/RepairDetailPage';
import EquiposPage from '../pages/EquiposPage';
import ClientesPage from '../pages/ClientesPage';
import AyudaPage from '../pages/AyudaPage';
import ConfiguracionPage from '../pages/ConfiguracionPage';
import AdminPage from '../pages/AdminPage';
import ProtectedRoute from '../components/ProtectedRoute';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';

const AppRouter = () => {
  const { user } = useAuth();
  
  // Rutas protegidas que requieren autenticación
  const protectedRoutes = [
    {
      path: 'dashboard',
      element: <DashboardPage />,
    },
    {
      path: 'reparaciones',
      element: <RepairListPage />,
    },
    {
      path: 'reparaciones/nueva',
      element: <RepairFormPage />,
    },
    {
      path: 'reparaciones/:repairId',
      element: <RepairDetailPage />,
    },
    {
      path: 'equipos',
      element: <EquiposPage />,
    },
    {
      path: 'clientes',
      element: <ClientesPage />,
    },
    {
      path: 'ayuda',
      element: <AyudaPage />,
    },
    {
      path: 'configuracion',
      element: <ConfiguracionPage />,
    },
    {
      path: 'admin',
      element: <AdminPage />,
    }
  ];

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/login',
      element: user ? <Navigate to="/dashboard" replace /> : <LoginPage />
    },
    {
      // Layout para el área protegida con el menú lateral
      path: '/',
      element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
      // Rutas hijas que se renderizan dentro del layout usando <Outlet />
      children: [
        // Redirección de la raíz del área protegida al dashboard
        {
          path: '',
          element: <Navigate to="/dashboard" replace />,
        },
        // Incluir todas las rutas protegidas
        ...protectedRoutes,
      ]
    },
    {
      // Ruta para cualquier otra URL no definida
      path: '*',
      element: <Navigate to="/" replace />
    }
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter; 