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
  InputLabel, 
  InputAdornment,
  IconButton,
  Divider,
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
  EmojiObjects as TipIcon
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
}));

const AuthPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  maxWidth: '1000px',
  overflow: 'hidden',
  borderRadius: 16,
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  zIndex: 2,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const IllustrationContainer = styled(Box)(({ theme }) => ({
  width: '45%',
  background: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(6),
  position: 'relative',
  overflow: 'hidden',
  boxShadow: `inset -10px 0 20px ${alpha('#000', 0.1)}`,
  
  [theme.breakpoints.down('md')]: {
    width: '100%',
    padding: theme.spacing(4),
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `radial-gradient(circle at 20% 70%, ${alpha('#fff', 0.1)} 0%, transparent 50%)`,
    backgroundSize: '150% 150%',
  },
}));

const FormContainer = styled(Box)(({ theme }) => ({
  width: '55%',
  padding: theme.spacing(6),
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    padding: theme.spacing(4),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: '12px 24px',
  fontSize: '1rem',
  boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
  transition: 'all 0.2s',
  
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.6)}`,
  },
  
  '&:active': {
    transform: 'translateY(0)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    background: alpha(theme.palette.common.white, 0.8),
    backdropFilter: 'blur(8px)',
  },
  '& .MuiOutlinedInput-root': {
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 2,
    },
  },
}));

const LoginTip = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(2),
  background: alpha(theme.palette.primary.main, 0.03),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 500,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -2,
    left: 0,
    width: '100%',
    height: 1,
    backgroundColor: theme.palette.primary.main,
    transition: 'transform 0.3s',
    transform: 'scaleX(0)',
    transformOrigin: 'right'
  },
  '&:hover::after': {
    transform: 'scaleX(1)',
    transformOrigin: 'left'
  }
}));

// Principal componente de Login
const LoginPage = () => {
  // Estados
  const [credentials, setCredentials] = useState<AuthCredentials>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Hooks
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Limpiar errores al cambiar inputs
  useEffect(() => {
    if (credentials.email) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
    if (credentials.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  }, [credentials.email, credentials.password]);

  // Manejadores
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const validateForm = (): boolean => {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};
    
    // Validar email
    if (!credentials.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = 'El formato del correo es inválido';
    }
    
    // Validar contraseña
    if (!credentials.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (credentials.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validar formulario
    if (!validateForm()) return;
    
    setErrors({});
    setIsSubmitting(true);
    
    try {
      await login(credentials);
      setIsSubmitting(false);
      navigate('/dashboard');
    } catch (err) {
      setIsSubmitting(false);
      setErrors({
        general: 'Credenciales inválidas. Por favor, intenta nuevamente.'
      });
    }
  };

  return (
    <AuthContainer>
      <Fade in={true} timeout={800}>
        <AuthPaper>
          <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={600}>
            <IllustrationContainer>
              <Box 
                sx={{ 
                  textAlign: 'center',
                  color: 'white',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                  ¡Bienvenido a Serfix!
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                  Sistema de gestión de reparaciones
                </Typography>
                <Box
                  component="img"
                  src={phoneScrewdriver}
                  alt="Teléfono y herramientas de reparación"
                  sx={{
                    maxWidth: '100%',
                    maxHeight: isMobile ? '180px' : '250px',
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))',
                    transition: 'transform 0.3s ease',
                    transform: 'translateY(0)',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                    }
                  }}
                />
              </Box>
            </IllustrationContainer>
          </Slide>

          <Fade in={true} timeout={1000}>
            <FormContainer>
              <Typography 
                component="h1" 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 1,
                  background: 'linear-gradient(45deg, #111827 30%, #374151 90%)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Inicio de Sesión
              </Typography>

              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ mb: 4 }}
              >
                Ingresa tus credenciales para continuar
              </Typography>

              {errors.general && (
                <Fade in={!!errors.general}>
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mb: 3,
                      borderRadius: 2,
                      '& .MuiAlert-icon': { alignItems: 'center' }
                    }}
                  >
                    {errors.general}
                  </Alert>
                </Fade>
              )}

              <Box 
                component="form" 
                onSubmit={handleSubmit}
                sx={{ 
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3
                }}
              >
                <Box>
                  <InputLabel 
                    htmlFor="email" 
                    sx={{ 
                      mb: 1,
                      color: 'text.primary',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <EmailIcon fontSize="small" color="primary" sx={{ opacity: 0.7 }} />
                    Correo Electrónico
                  </InputLabel>
                  <StyledTextField
                    fullWidth
                    id="email"
                    name="email"
                    placeholder="ejemplo@correo.com"
                    value={credentials.email}
                    onChange={handleChange}
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Box>
                  <InputLabel 
                    htmlFor="password" 
                    sx={{ 
                      mb: 1,
                      color: 'text.primary',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <LockIcon fontSize="small" color="primary" sx={{ opacity: 0.7 }} />
                    Contraseña
                  </InputLabel>
                  <StyledTextField
                    fullWidth
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Introduce tu contraseña"
                    value={credentials.password}
                    onChange={handleChange}
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggleShowPassword}
                            edge="end"
                            size="small"
                          >
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <StyledButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isSubmitting || isLoading}
                  sx={{
                    mt: 2,
                    py: 1.5,
                    fontSize: '1rem',
                  }}
                >
                  {(isSubmitting || isLoading) ? (
                    <CircularProgress size={24} thickness={4} sx={{ color: 'white' }} />
                  ) : (
                    'Iniciar sesión'
                  )}
                </StyledButton>
                
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 1,
                  }}
                >
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                  >
                    ¿No tienes cuenta?{' '}
                    <StyledLink to="/register">
                      Regístrate
                    </StyledLink>
                  </Typography>
                  
                  <Link 
                    to="/recuperar-password" 
                    style={{ 
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                      fontWeight: 500,
                      fontSize: '0.875rem',
                    }}
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Box>
                
                <Divider sx={{ my: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    O continúa con
                  </Typography>
                </Divider>
                
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    py: 1.25,
                    borderWidth: 1,
                    color: 'text.primary',
                    fontWeight: 500,
                  }}
                >
                  Acceso administrativo
                </Button>
                
                <LoginTip>
                  <TipIcon color="primary" sx={{ mt: 0.5 }} />
                  <Box>
                    <Typography variant="body2" fontWeight={500} gutterBottom>
                      ¿Primer inicio de sesión?
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Si es tu primera vez, usa las credenciales proporcionadas 
                      por el administrador. Podrás cambiar tu contraseña después 
                      de iniciar sesión.
                    </Typography>
                  </Box>
                </LoginTip>
              </Box>
            </FormContainer>
          </Fade>
        </AuthPaper>
      </Fade>
    </AuthContainer>
  );
};

export default LoginPage; 