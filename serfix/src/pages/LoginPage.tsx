import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AuthCredentials } from '../types/user';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Alert, 
  InputAdornment,
  IconButton,
  Slide,
  Fade,
  CircularProgress,
  useMediaQuery
} from '@mui/material';
import { styled, useTheme, alpha } from '@mui/material/styles';
import { 
  Visibility, 
  VisibilityOff, 
  Email as EmailIcon,
  Lock as LockIcon,
  EmojiObjects as TipIcon,
  Person as PersonIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import phoneScrewdriver from '../assets/phone-screwdriver.svg';

// Componentes estilizados
const AuthContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  backgroundColor: '#f8f9fa',
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `radial-gradient(${alpha(theme.palette.primary.main, 0.15)} 1px, transparent 1px), 
                      radial-gradient(${alpha(theme.palette.primary.main, 0.1)} 1px, transparent 1px)`,
    backgroundSize: '20px 20px, 20px 20px',
    backgroundPosition: '0 0, 10px 10px',
    zIndex: 1,
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '30%',
    background: `linear-gradient(to top, ${alpha(theme.palette.primary.main, 0.05)}, transparent)`,
    zIndex: 0,
    pointerEvents: 'none'
  }
}));

const AuthPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  maxWidth: '1000px',
  overflow: 'hidden',
  borderRadius: 24,
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
  position: 'relative',
  zIndex: 2,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

interface IllustrationContainerProps {
  isRegister: boolean;
}

const IllustrationContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isRegister',
})<IllustrationContainerProps>(({ theme, isRegister }) => ({
  width: '45%',
  background: isRegister 
    ? 'linear-gradient(135deg, #388e3c 0%, #4caf50 100%)' 
    : 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(6),
  position: 'relative',
  overflow: 'hidden',
  boxShadow: isRegister 
    ? `inset 10px 0 20px ${alpha('#000', 0.1)}` 
    : `inset -10px 0 20px ${alpha('#000', 0.1)}`,
  order: isRegister ? 2 : 0,
  transition: 'all 0.8s ease-in-out',
  
  [theme.breakpoints.down('md')]: {
    width: '100%',
    padding: theme.spacing(4),
    order: 0,
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(circle at 20% 70%, ${alpha('#fff', 0.1)} 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, ${alpha('#fff', 0.08)} 0%, transparent 40%)
    `,
    backgroundSize: '150% 150%',
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '10%',
    right: isRegister ? 'auto' : '-15%',
    left: isRegister ? '-15%' : 'auto',
    width: '60%',
    height: '60%',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${alpha('#fff', 0.1)} 0%, transparent 70%)`,
    filter: 'blur(40px)',
    transition: 'all 0.8s ease-in-out',
  }
}));

interface FormContainerProps {
  isRegister: boolean;
}

const FormContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isRegister',
})<FormContainerProps>(({ theme, isRegister }) => ({
  width: '55%',
  padding: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  background: '#ffffff',
  position: 'relative',
  overflow: 'hidden',
  order: isRegister ? 0 : 1,
  transition: 'all 0.8s ease-in-out',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: isRegister ? 0 : 'auto',
    left: isRegister ? 'auto' : 0,
    width: '100%',
    height: '100%',
    background: isRegister
      ? `radial-gradient(circle at 0% 0%, ${alpha(theme.palette.primary.light, 0.05)} 0%, transparent 50%)`
      : `radial-gradient(circle at 100% 0%, ${alpha(theme.palette.primary.light, 0.05)} 0%, transparent 50%)`,
    zIndex: 0,
    transition: 'all 0.8s ease-in-out',
  },
  
  [theme.breakpoints.down('md')]: {
    width: '100%',
    padding: theme.spacing(5, 4),
    order: 1,
  },
}));

interface StyledButtonProps {
  isRegister?: boolean;
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isRegister',
})<StyledButtonProps>(({ theme, isRegister }) => ({
  padding: '14px 28px',
  fontSize: '1rem',
  fontWeight: 700,
  borderRadius: 12,
  background: isRegister
    ? 'linear-gradient(135deg, #4caf50 0%, #388e3c 50%, #1b5e20 100%)'
    : 'linear-gradient(135deg, #f5d742 0%, #daa520 50%, #b8860b 100%)',
  color: '#ffffff',
  boxShadow: isRegister
    ? '0 10px 20px rgba(76, 175, 80, 0.3)'
    : '0 10px 20px rgba(218, 165, 32, 0.3)',
  transition: 'all 0.3s',
  position: 'relative',
  overflow: 'hidden',
  border: isRegister
    ? '1px solid rgba(76, 175, 80, 0.5)'
    : '1px solid rgba(218, 165, 32, 0.5)',
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to right, rgba(255, 255, 255, 0.1), transparent, rgba(255, 255, 255, 0.1))',
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s',
  },
  
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: isRegister
      ? '0 15px 30px rgba(76, 175, 80, 0.4)'
      : '0 15px 30px rgba(218, 165, 32, 0.4)',
    background: isRegister
      ? 'linear-gradient(135deg, #66bb6a 0%, #43a047 50%, #2e7d32 100%)'
      : 'linear-gradient(135deg, #f7df5e 0%, #e6b422 50%, #cd9b1d 100%)',
    
    '&::after': {
      transform: 'translateX(100%)',
    }
  },
  
  '&:active': {
    transform: 'translateY(-1px)',
  },
}));

// Componente de campo de texto estilizado
const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  
  '& .MuiInputBase-root': {
    background: alpha(theme.palette.common.white, 0.8),
    backdropFilter: 'blur(8px)',
    borderRadius: 12,
    transition: 'all 0.3s ease',
    
    '&:hover': {
      boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.1)}`,
    },
  },
  
  // Estilos para el campo de texto
  '& .MuiOutlinedInput-root': {
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: 2,
        boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`,
      }
    },
  },
  
  // Estilos para el label
  '& .MuiInputLabel-root': {
    fontWeight: 500,
    
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    }
  },
  
  '& .MuiInputAdornment-root': {
    '& .MuiSvgIcon-root': {
      color: alpha(theme.palette.text.primary, 0.5)
    }
  }
}));

interface LoginTipProps {
  isRegister: boolean;
}

const LoginTip = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isRegister',
})<LoginTipProps>(({ theme, isRegister }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  background: isRegister
    ? alpha(theme.palette.success.main, 0.03)
    : alpha(theme.palette.primary.main, 0.03),
  borderRadius: 12,
  border: isRegister
    ? `1px solid ${alpha(theme.palette.success.main, 0.1)}`
    : `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  boxShadow: isRegister
    ? `0 4px 12px ${alpha(theme.palette.success.main, 0.05)}`
    : `0 4px 12px ${alpha(theme.palette.primary.main, 0.05)}`,
  
  '& .MuiSvgIcon-root': {
    color: isRegister
      ? theme.palette.success.main
      : theme.palette.primary.main,
    fontSize: 24,
  }
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 600,
  position: 'relative',
  
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -2,
    left: 0,
    width: '100%',
    height: 2,
    background: alpha(theme.palette.primary.main, 0.3),
    transform: 'scaleX(0)',
    transformOrigin: 'right',
    transition: 'transform 0.3s ease-out',
  },
  
  '&:hover': {
    color: theme.palette.primary.dark,
    
    '&::after': {
      transform: 'scaleX(1)',
      transformOrigin: 'left',
    }
  }
}));

const SwitchButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  padding: '6px 12px',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
  fontWeight: 600,
  borderWidth: 2,
  transition: 'all 0.3s',
  
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
    borderWidth: 2,
  }
}));

interface RegisterData extends AuthCredentials {
  name: string;
  confirmPassword: string;
}

const BackButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: 20,
  left: 20,
  minWidth: 'auto',
  borderRadius: 8,
  padding: '8px 12px',
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  color: theme.palette.text.secondary,
  fontWeight: 600,
  zIndex: 10,
  transition: 'all 0.3s',
  
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
    transform: 'translateX(-3px)',
  }
}));

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isRegister, setIsRegister] = useState(false);
  const [animating, setAnimating] = useState(false);
  
  const [credentials, setCredentials] = useState<AuthCredentials>({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  const handleToggleMode = () => {
    setAnimating(true);
    setTimeout(() => {
      setIsRegister(!isRegister);
      setAuthError(null);
      setErrors({});
    }, 400);
  };
  
  useEffect(() => {
    if (animating) {
      const timer = setTimeout(() => {
        setAnimating(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [animating]);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
    
    // Borrar error cuando el usuario comienza a escribir
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };
  
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
    
    // Borrar error cuando el usuario comienza a escribir
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateLoginForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    // Validar email
    if (!credentials.email) {
      newErrors.email = 'El correo electrónico es requerido';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = 'El correo electrónico no es válido';
      isValid = false;
    }
    
    // Validar contraseña
    if (!credentials.password) {
      newErrors.password = 'La contraseña es requerida';
      isValid = false;
    } else if (credentials.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const validateRegisterForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    // Validar nombre
    if (!registerData.name) {
      newErrors.name = 'El nombre es requerido';
      isValid = false;
    } else if (registerData.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
      isValid = false;
    }
    
    // Validar email
    if (!registerData.email) {
      newErrors.email = 'El correo electrónico es requerido';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
      isValid = false;
    }
    
    // Validar contraseña
    if (!registerData.password) {
      newErrors.password = 'La contraseña es requerida';
      isValid = false;
    } else if (registerData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }
    
    // Validar confirmación de contraseña
    if (!registerData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
      isValid = false;
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateLoginForm()) return;
    
    setIsLoading(true);
    setAuthError(null);
    
    try {
      await login(credentials);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during login:', error);
      setAuthError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateRegisterForm()) return;
    
    setIsLoading(true);
    setAuthError(null);
    
    try {
      // Llamar a la función de registro con los datos necesarios
      await register({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password
      });
      
      // Redirigir al usuario al dashboard o mostrar un mensaje de éxito
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during registration:', error);
      setAuthError('No se pudo completar el registro. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoginForm = () => (
    <Box component="form" onSubmit={handleLoginSubmit}>
      <StyledTextField
        fullWidth
        label="Correo Electrónico"
        type="email"
        name="email"
        autoComplete="email"
        value={credentials.email}
        onChange={handleLoginChange}
        error={!!errors.email}
        helperText={errors.email}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <StyledTextField
        fullWidth
        label="Contraseña"
        name="password"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        value={credentials.password}
        onChange={handleLoginChange}
        error={!!errors.password}
        helperText={errors.password}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={toggleShowPassword}
                edge="end"
                size="small"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <StyledLink to="/reset-password">
          ¿Olvidaste tu contraseña?
        </StyledLink>
      </Box>
      
      <StyledButton
        fullWidth
        variant="contained"
        size="large"
        type="submit"
        disabled={isLoading}
        sx={{ 
          mb: 2,
          '&.Mui-disabled': {
            background: 'linear-gradient(135deg, #e6d38a 0%, #c9b980 100%)',
            color: 'rgba(255, 255, 255, 0.7)'
          }
        }}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Iniciar Sesión"
        )}
      </StyledButton>
      
      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleToggleMode}
        sx={{ 
          mb: 3,
          borderWidth: 2,
          color: '#FFFFFF',
          borderColor: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.main,
          fontWeight: 600,
          padding: '14px 28px',
          fontSize: '1rem',
          borderRadius: 12,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            borderColor: theme.palette.primary.dark,
          }
        }}
      >
        Crear una cuenta nueva
      </Button>
      
      <LoginTip isRegister={false}>
        <TipIcon />
        <Box>
          <Typography variant="subtitle2" gutterBottom fontWeight="600">
            Acceso para demostración
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: demo@serfix.com<br />
            Contraseña: demo1234
          </Typography>
        </Box>
      </LoginTip>
    </Box>
  );
  
  const renderRegisterForm = () => (
    <Box component="form" onSubmit={handleRegisterSubmit}>
      <StyledTextField
        fullWidth
        label="Nombre completo"
        name="name"
        autoComplete="name"
        value={registerData.name}
        onChange={handleRegisterChange}
        error={!!errors.name}
        helperText={errors.name}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <StyledTextField
        fullWidth
        label="Correo Electrónico"
        type="email"
        name="email"
        autoComplete="email"
        value={registerData.email}
        onChange={handleRegisterChange}
        error={!!errors.email}
        helperText={errors.email}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <StyledTextField
        fullWidth
        label="Contraseña"
        name="password"
        type={showPassword ? 'text' : 'password'}
        autoComplete="new-password"
        value={registerData.password}
        onChange={handleRegisterChange}
        error={!!errors.password}
        helperText={errors.password}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={toggleShowPassword}
                edge="end"
                size="small"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      
      <StyledTextField
        fullWidth
        label="Confirmar Contraseña"
        name="confirmPassword"
        type={showConfirmPassword ? 'text' : 'password'}
        autoComplete="new-password"
        value={registerData.confirmPassword}
        onChange={handleRegisterChange}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={toggleShowConfirmPassword}
                edge="end"
                size="small"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      
      <Button
        fullWidth
        variant="contained"
        size="large"
        type="submit"
        disabled={isLoading}
        sx={{ 
          mb: 2,
          mt: 2,
          padding: '14px 28px',
          fontSize: '1rem',
          fontWeight: 700,
          borderRadius: 12,
          background: 'linear-gradient(135deg, #4caf50 0%, #388e3c 50%, #1b5e20 100%)',
          color: '#ffffff',
          boxShadow: '0 10px 20px rgba(76, 175, 80, 0.3)',
          transition: 'all 0.3s',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(76, 175, 80, 0.5)',
          
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0.1), transparent, rgba(255, 255, 255, 0.1))',
            transform: 'translateX(-100%)',
            transition: 'transform 0.6s',
          },
          
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 15px 30px rgba(76, 175, 80, 0.4)',
            background: 'linear-gradient(135deg, #66bb6a 0%, #43a047 50%, #2e7d32 100%)',
          },
          
          '&:active': {
            transform: 'translateY(-1px)',
          },
          
          '&.Mui-disabled': {
            background: 'linear-gradient(135deg, #a5d6a7 0%, #81c784 100%)',
            color: 'rgba(255, 255, 255, 0.7)'
          }
        }}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Crear Cuenta"
        )}
      </Button>
      
      <Button
        fullWidth
        variant="outlined"
        size="large"
        onClick={handleToggleMode}
        sx={{ 
          mb: 3,
          borderWidth: 2,
          color: '#212121',
          borderColor: theme.palette.success.main,
          backgroundColor: alpha(theme.palette.success.light, 0.1),
          fontWeight: 600,
          padding: '14px 28px',
          fontSize: '1rem',
          borderRadius: 12,
          '&:hover': {
            backgroundColor: alpha(theme.palette.success.light, 0.2),
            borderColor: theme.palette.success.dark,
          }
        }}
      >
        Volver al inicio de sesión
      </Button>
      
      <LoginTip isRegister={true}>
        <TipIcon />
        <Box>
          <Typography variant="subtitle2" gutterBottom fontWeight="600">
            Beneficios de registrarte
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Seguimiento de tus reparaciones<br />
            • Historial de servicios<br />
            • Notificaciones de estado
          </Typography>
        </Box>
      </LoginTip>
    </Box>
  );

  return (
    <AuthContainer>
      <BackButton
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
      >
        Volver
      </BackButton>
      
      <Fade in={true} timeout={800}>
        <AuthPaper elevation={10}>
          <IllustrationContainer isRegister={isRegister}>
            <Slide 
              direction={isRegister ? "left" : "right"} 
              in={!animating} 
              timeout={500} 
              mountOnEnter 
              unmountOnExit
            >
              <Box
                component="img"
                src={phoneScrewdriver}
                alt="Phone Repair Illustration"
                sx={{
                  width: '100%',
                  maxWidth: 350,
                  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))',
                  transform: isRegister
                    ? 'perspective(1500px) rotateY(10deg) rotateX(5deg)'
                    : 'perspective(1500px) rotateY(-10deg) rotateX(5deg)',
                  zIndex: 2,
                  transition: 'transform 0.8s ease-in-out',
                }}
              />
            </Slide>
          </IllustrationContainer>
          
          <FormContainer isRegister={isRegister}>
            <Fade 
              in={!animating} 
              timeout={800}
            >
              <Box component="div">
                <Typography 
                  variant="h4" 
                  component="h1" 
                  gutterBottom
                  fontWeight="700"
                  sx={{ mb: 1 }}
                >
                  {isRegister ? "Crear cuenta en SERFIX" : "Bienvenido a SERFIX"}
                </Typography>
                
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  {isRegister 
                    ? "Regístrate para comenzar a gestionar tus reparaciones" 
                    : "Inicia sesión para gestionar tus reparaciones"
                  }
                </Typography>
                
                {authError && (
                  <Fade in={!!authError}>
                    <Alert 
                      severity="error" 
                      sx={{ 
                        mb: 3, 
                        borderRadius: 2,
                        animation: 'shake 0.5s',
                        '@keyframes shake': {
                          '0%, 100%': { transform: 'translateX(0)' },
                          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
                          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
                        },
                      }}
                    >
                      {authError}
                    </Alert>
                  </Fade>
                )}
                
                {isRegister ? renderRegisterForm() : renderLoginForm()}
              </Box>
            </Fade>
          </FormContainer>
        </AuthPaper>
      </Fade>
    </AuthContainer>
  );
};

export default LoginPage; 