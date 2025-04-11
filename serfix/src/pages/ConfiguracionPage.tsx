import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Avatar,
  Card,
  CardContent,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Slider,
  Chip
} from '@mui/material';
import {
  Save as SaveIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
  Edit as EditIcon,
  PhotoCamera as PhotoCameraIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { styled, useTheme, alpha } from '@mui/material/styles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`config-tabpanel-${index}`}
      aria-labelledby={`config-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `config-tab-${index}`,
    'aria-controls': `config-tabpanel-${index}`,
  };
}

const SectionTitle = styled(Typography)(({ theme }) => ({
  borderBottom: `2px solid ${theme.palette.primary.main}`,
  paddingBottom: theme.spacing(1),
  marginBottom: theme.spacing(3),
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main
  }
}));

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.08)}`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 12px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  padding: '10px 24px',
  fontWeight: 600,
  boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.25)}`,
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.35)}`,
  }
}));

const ConfiguracionPage: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [perfilData, setPerfilData] = useState({
    nombre: 'Usuario Demo',
    email: 'usuario@demo.com',
    telefono: '555-123-4567',
    cargo: 'Administrador',
    notificacionesEmail: true,
    notificacionesPush: true,
    tema: 'claro',
    idioma: 'español'
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePerfilChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setPerfilData(prev => ({
      ...prev,
      [name]: e.target.type === 'checkbox' ? checked : value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSavePerfil = () => {
    // Aquí iría la lógica para guardar los cambios del perfil
    console.log("Guardando datos del perfil:", perfilData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleChangePassword = () => {
    // Aquí iría la lógica para cambiar la contraseña
    console.log("Cambiando contraseña:", passwordData);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom
        sx={{
          fontWeight: 700,
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2
        }}
      >
        Configuración
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Personaliza tu experiencia y configura las opciones de tu cuenta.
        </Typography>
      </Box>
      
      <Paper 
        sx={{ 
          width: '100%', 
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="configuración tabs"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minHeight: 64,
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.04)
                }
              },
              '& .Mui-selected': {
                fontWeight: 600,
                color: theme.palette.primary.main
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0'
              }
            }}
          >
            <Tab 
              label="Perfil de Usuario" 
              icon={<PersonIcon />} 
              iconPosition="start" 
              {...a11yProps(0)} 
            />
            <Tab 
              label="Seguridad" 
              icon={<SecurityIcon />} 
              iconPosition="start" 
              {...a11yProps(1)} 
            />
            <Tab 
              label="Notificaciones" 
              icon={<NotificationsIcon />} 
              iconPosition="start" 
              {...a11yProps(2)} 
            />
            <Tab 
              label="Apariencia" 
              icon={<PaletteIcon />} 
              iconPosition="start" 
              {...a11yProps(3)} 
            />
          </Tabs>
        </Box>
        
        {saveSuccess && (
          <Alert 
            severity="success" 
            sx={{ 
              m: 2, 
              borderRadius: 2,
              animation: 'fadeIn 0.5s',
              '@keyframes fadeIn': {
                '0%': { opacity: 0, transform: 'translateY(-10px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' }
              },
              display: 'flex',
              alignItems: 'center',
              '& .MuiAlert-icon': {
                color: theme.palette.success.main,
                fontSize: 24
              }
            }}
            icon={<CheckCircleIcon fontSize="inherit" />}
          >
            Cambios guardados con éxito
          </Alert>
        )}
        
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '4 1 0%' }, display: 'flex', flexDirection: 'column' }}>
              <StyledCard sx={{ mb: 2 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box sx={{ position: 'relative' }}>
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        bgcolor: theme.palette.primary.main,
                        fontSize: '3rem',
                        mb: 2,
                        boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.25)}`
                      }}
                    >
                      {perfilData.nombre.charAt(0)}
                    </Avatar>
                    <IconButton
                      sx={{
                        position: 'absolute',
                        bottom: 10,
                        right: 0,
                        bgcolor: 'background.paper',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: theme.palette.primary.main,
                          color: '#fff'
                        }
                      }}
                      aria-label="cambiar foto de perfil"
                    >
                      <PhotoCameraIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {perfilData.nombre}
                  </Typography>
                  <Chip 
                    label={perfilData.cargo}
                    color="primary"
                    size="small"
                    sx={{ 
                      fontWeight: 500,
                      borderRadius: '6px',
                      px: 1
                    }}
                  />
                </CardContent>
              </StyledCard>
              
              <Typography variant="subtitle2" gutterBottom fontWeight={600} sx={{ mt: 2 }}>
                Información de la cuenta
              </Typography>
              <List dense sx={{ 
                bgcolor: alpha(theme.palette.background.paper, 0.6),
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
              }}>
                <ListItem sx={{ py: 1.5 }}>
                  <ListItemText 
                    primary={<Typography variant="body2" fontWeight={500} color="text.primary">Usuario desde</Typography>}
                    secondary={<Typography variant="body2" color="text.secondary">01/01/2023</Typography>}
                  />
                </ListItem>
                <Divider component="li" sx={{ opacity: 0.5 }} />
                <ListItem sx={{ py: 1.5 }}>
                  <ListItemText 
                    primary={<Typography variant="body2" fontWeight={500} color="text.primary">Último acceso</Typography>}
                    secondary={<Typography variant="body2" color="text.secondary">Hoy, 14:35</Typography>}
                  />
                </ListItem>
                <Divider component="li" sx={{ opacity: 0.5 }} />
                <ListItem sx={{ py: 1.5 }}>
                  <ListItemText 
                    primary={<Typography variant="body2" fontWeight={500} color="text.primary">Plan</Typography>}
                    secondary={<Typography variant="body2" color="text.secondary">Profesional</Typography>}
                  />
                </ListItem>
              </List>
            </Box>
            
            <Box sx={{ flex: { xs: '1 1 100%', md: '8 1 0%' } }}>
              <SectionTitle variant="h6" gutterBottom>
                <PersonIcon /> Información Personal
              </SectionTitle>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <TextField
                    fullWidth
                    label="Nombre completo"
                    name="nombre"
                    value={perfilData.nombre}
                    onChange={handlePerfilChange}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        transition: 'all 0.2s',
                        '&:hover': {
                          boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`
                        },
                        '&.Mui-focused': {
                          boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                        }
                      }
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      fullWidth
                      label="Correo electrónico"
                      name="email"
                      type="email"
                      value={perfilData.email}
                      onChange={handlePerfilChange}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          transition: 'all 0.2s',
                          '&:hover': {
                            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`
                          },
                          '&.Mui-focused': {
                            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                          }
                        }
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      fullWidth
                      label="Teléfono"
                      name="telefono"
                      value={perfilData.telefono}
                      onChange={handlePerfilChange}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          transition: 'all 0.2s',
                          '&:hover': {
                            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`
                          },
                          '&.Mui-focused': {
                            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                          }
                        }
                      }}
                    />
                  </Box>
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    label="Cargo"
                    name="cargo"
                    value={perfilData.cargo}
                    onChange={handlePerfilChange}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        transition: 'all 0.2s',
                        '&:hover': {
                          boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`
                        },
                        '&.Mui-focused': {
                          boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                        }
                      }
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <StyledButton
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSavePerfil}
                  >
                    Guardar Cambios
                  </StyledButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <SectionTitle variant="h6" gutterBottom>
            <SecurityIcon /> Cambiar Contraseña
          </SectionTitle>
          
          <Box sx={{ maxWidth: "md", display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <TextField
                fullWidth
                label="Contraseña actual"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.2s',
                    '&:hover': {
                      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`
                    },
                    '&.Mui-focused': {
                      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                    }
                  }
                }}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Nueva contraseña"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.2s',
                    '&:hover': {
                      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`
                    },
                    '&.Mui-focused': {
                      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                    }
                  }
                }}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Confirmar nueva contraseña"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                error={passwordData.newPassword !== passwordData.confirmPassword && passwordData.confirmPassword !== ''}
                helperText={passwordData.newPassword !== passwordData.confirmPassword && passwordData.confirmPassword !== '' ? 'Las contraseñas no coinciden' : ''}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.2s',
                    '&:hover': {
                      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`
                    },
                    '&.Mui-focused': {
                      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`
                    }
                  }
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <StyledButton
                variant="contained"
                color="primary"
                onClick={handleChangePassword}
                disabled={!passwordData.currentPassword || !passwordData.newPassword || passwordData.newPassword !== passwordData.confirmPassword}
              >
                Cambiar Contraseña
              </StyledButton>
            </Box>
          </Box>
          
          <Divider sx={{ my: 4 }} />
          
          <SectionTitle variant="h6" gutterBottom>
            <SecurityIcon /> Sesiones Activas
          </SectionTitle>
          
          <List sx={{ 
            bgcolor: alpha(theme.palette.background.paper, 0.6),
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            overflow: 'hidden'
          }}>
            <ListItem secondaryAction={
              <Button 
                size="small" 
                variant="outlined" 
                color="error"
                sx={{ 
                  borderRadius: 1.5,
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.error.main, 0.08)
                  }
                }}
              >
                Cerrar
              </Button>
            }>
              <ListItemText
                primary={<Typography fontWeight={500}>Computadora Windows (Actual)</Typography>}
                secondary="Chrome • IP: 192.168.1.100 • Último acceso: Hace 5 minutos"
              />
            </ListItem>
            <Divider component="li" />
            <ListItem secondaryAction={
              <Button 
                size="small" 
                variant="outlined" 
                color="error"
                sx={{ 
                  borderRadius: 1.5,
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.error.main, 0.08)
                  }
                }}
              >
                Cerrar
              </Button>
            }>
              <ListItemText
                primary={<Typography fontWeight={500}>iPhone 13</Typography>}
                secondary="Safari • IP: 192.168.1.101 • Último acceso: Ayer, 18:45"
              />
            </ListItem>
          </List>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <SectionTitle variant="h6" gutterBottom>
            <NotificationsIcon /> Preferencias de Notificaciones
          </SectionTitle>
          
          <List sx={{ 
            bgcolor: alpha(theme.palette.background.paper, 0.6),
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            overflow: 'hidden'
          }}>
            <ListItem>
              <ListItemText 
                primary={<Typography fontWeight={500}>Notificaciones por correo electrónico</Typography>}
                secondary="Recibe alertas importantes y actualizaciones por correo"
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={perfilData.notificacionesEmail}
                    onChange={handlePerfilChange}
                    name="notificacionesEmail"
                    color="primary"
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        },
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.5),
                      },
                    }}
                  />
                }
                label=""
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText 
                primary={<Typography fontWeight={500}>Notificaciones push</Typography>}
                secondary="Recibe alertas en tiempo real en el navegador"
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={perfilData.notificacionesPush}
                    onChange={handlePerfilChange}
                    name="notificacionesPush"
                    color="primary"
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        },
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.5),
                      },
                    }}
                  />
                }
                label=""
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText 
                primary={<Typography fontWeight={500}>Recordatorios de seguimiento</Typography>}
                secondary="Recibe recordatorios para dar seguimiento a reparaciones pendientes"
              />
              <FormControlLabel
                control={
                  <Switch 
                    defaultChecked
                    color="primary"
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        },
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.5),
                      },
                    }}
                  />
                }
                label=""
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText 
                primary={<Typography fontWeight={500}>Actualizaciones del sistema</Typography>}
                secondary="Recibe notificaciones sobre nuevas funciones y mejoras"
              />
              <FormControlLabel
                control={
                  <Switch 
                    defaultChecked
                    color="primary"
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        },
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.5),
                      },
                    }}
                  />
                }
                label=""
              />
            </ListItem>
          </List>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <StyledButton
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSavePerfil}
            >
              Guardar Preferencias
            </StyledButton>
          </Box>
        </TabPanel>
        
        <TabPanel value={tabValue} index={3}>
          <SectionTitle variant="h6" gutterBottom>
            <PaletteIcon /> Tema y Apariencia
          </SectionTitle>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 50%' } }}>
              <Typography variant="subtitle1" gutterBottom fontWeight={500}>
                Tema
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <Paper
                  sx={{
                    width: 120,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: perfilData.tema === 'claro' ? `2px solid ${theme.palette.primary.main}` : 'none',
                    bgcolor: '#ffffff',
                    color: '#333333',
                    borderRadius: 2,
                    boxShadow: perfilData.tema === 'claro' 
                      ? `0 0 0 3px ${alpha(theme.palette.primary.main, 0.2)}`
                      : '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s',
                    fontWeight: 500,
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }
                  }}
                  onClick={() => setPerfilData({ ...perfilData, tema: 'claro' })}
                >
                  Claro
                </Paper>
                <Paper
                  sx={{
                    width: 120,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: perfilData.tema === 'oscuro' ? `2px solid ${theme.palette.primary.main}` : 'none',
                    bgcolor: '#333333',
                    color: '#ffffff',
                    borderRadius: 2,
                    boxShadow: perfilData.tema === 'oscuro' 
                      ? `0 0 0 3px ${alpha(theme.palette.primary.main, 0.2)}`
                      : '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s',
                    fontWeight: 500,
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }
                  }}
                  onClick={() => setPerfilData({ ...perfilData, tema: 'oscuro' })}
                >
                  Oscuro
                </Paper>
              </Box>
            </Box>
            
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 50%' } }}>
              <Typography variant="subtitle1" gutterBottom fontWeight={500}>
                Idioma
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Paper
                  sx={{
                    width: 120,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: perfilData.idioma === 'español' ? `2px solid ${theme.palette.primary.main}` : 'none',
                    borderRadius: 2,
                    boxShadow: perfilData.idioma === 'español' 
                      ? `0 0 0 3px ${alpha(theme.palette.primary.main, 0.2)}`
                      : '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }
                  }}
                  onClick={() => setPerfilData({ ...perfilData, idioma: 'español' })}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <LanguageIcon sx={{ mb: 1, color: theme.palette.primary.main }} />
                    <Typography fontWeight={500}>Español</Typography>
                  </Box>
                </Paper>
                <Paper
                  sx={{
                    width: 120,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: perfilData.idioma === 'inglés' ? `2px solid ${theme.palette.primary.main}` : 'none',
                    borderRadius: 2,
                    boxShadow: perfilData.idioma === 'inglés' 
                      ? `0 0 0 3px ${alpha(theme.palette.primary.main, 0.2)}`
                      : '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }
                  }}
                  onClick={() => setPerfilData({ ...perfilData, idioma: 'inglés' })}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <LanguageIcon sx={{ mb: 1, color: theme.palette.primary.main }} />
                    <Typography fontWeight={500}>English</Typography>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <StyledButton
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSavePerfil}
            >
              Aplicar Cambios
            </StyledButton>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default ConfiguracionPage; 