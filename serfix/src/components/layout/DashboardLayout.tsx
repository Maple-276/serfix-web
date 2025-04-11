import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  List, 
  Typography, 
  Divider, 
  IconButton, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Avatar,
  Tooltip,
  styled,
  useTheme,
  useMediaQuery,
  Button,
  alpha
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  Build as BuildIcon,
  Computer as ComputerIcon,
  People as PeopleIcon,
  HelpOutline as HelpIcon,
  Settings as SettingsIcon,
  AdminPanelSettings as AdminIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 240;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: 'linear-gradient(45deg, #d32f2f 30%, #f44336 90%)',
  boxShadow: '0 4px 20px rgba(211, 47, 47, 0.4)',
  backdropFilter: 'blur(8px)',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    background: '#fafafa',
    backgroundImage: `linear-gradient(to bottom, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.default, 0.9)}), 
                     linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.05)}, transparent)`,
    boxSizing: 'border-box',
    borderRight: 'none',
    boxShadow: '4px 0 20px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
  minHeight: '100vh',
  transition: theme.transitions.create('all', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  }),
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: '8px 10px',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&.Mui-selected': {
    background: 'rgba(211, 47, 47, 0.1)',
    color: '#d32f2f',
    fontWeight: 600,
    boxShadow: '0 2px 8px rgba(211, 47, 47, 0.15)',
    '&:hover': {
      background: 'rgba(211, 47, 47, 0.15)',
    },
    '& .MuiListItemIcon-root': {
      color: '#d32f2f',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      width: '4px',
      background: 'linear-gradient(to bottom, #d32f2f, #f44336)',
      borderRadius: '0 2px 2px 0',
    }
  },
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.04)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.07)',
  }
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  color: 'white',
  marginRight: theme.spacing(2),
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'rotate(90deg)',
  }
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  flexGrow: 1,
  letterSpacing: '0.05em',
  background: 'linear-gradient(90deg, #fff, #f5f5f5)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginRight: theme.spacing(1),
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255,255,255,0.1)',
  }
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  color: 'white',
  borderColor: 'rgba(255, 255, 255, 0.5)',
  borderRadius: '20px',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: 'white',
    background: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-2px)',
  }
}));

// Define la estructura de los items del menú
const menuItems = [
  { path: '/dashboard', icon: <DashboardIcon />, text: 'Dashboard' },
  { path: '/reparaciones', icon: <BuildIcon />, text: 'Reparaciones' },
  { path: '/equipos', icon: <ComputerIcon />, text: 'Equipos' },
  { path: '/clientes', icon: <PeopleIcon />, text: 'Clientes' },
  { path: '/ayuda', icon: <HelpIcon />, text: 'Ayuda' },
  { path: '/configuracion', icon: <SettingsIcon />, text: 'Configuración' },
  { path: '/admin', icon: <AdminIcon />, text: 'Administración' },
];

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Determinar qué item del menú está activo
  const getIsActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledAppBar position="fixed">
        <Toolbar>
          <MenuButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
          >
            <MenuIcon />
          </MenuButton>
          <Logo variant="h6" noWrap>
            SERFIX
          </Logo>
          {user && (
            <UserBox>
              <Tooltip title={user.email || 'Usuario'}>
                <Avatar sx={{ bgcolor: '#e0e0e0', color: '#d32f2f' }}>
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
              </Tooltip>
              <LogoutButton variant="outlined" onClick={handleLogout} startIcon={<LogoutIcon />} size="small">
                Salir
              </LogoutButton>
            </UserBox>
          )}
        </Toolbar>
      </StyledAppBar>
      
      <StyledDrawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={isMobile ? handleDrawerToggle : undefined}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <StyledListItemButton 
                  selected={getIsActive(item.path)}
                  onClick={() => handleNavigation(item.path)}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </StyledListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </StyledDrawer>
      
      <Box component="main" sx={{ flexGrow: 1, p: 3, background: '#ffffff', minHeight: '100vh' }}>
        <Toolbar />
        <Box sx={{ py: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout; 