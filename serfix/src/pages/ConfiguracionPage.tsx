import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
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
  Alert
} from '@mui/material';
import {
  Save as SaveIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
  Edit as EditIcon,
  PhotoCamera as PhotoCameraIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

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
      <Typography variant="h4" component="h1" gutterBottom>
        Configuración
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Personaliza tu experiencia y configura las opciones de tu cuenta.
        </Typography>
      </Box>
      
      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="configuración tabs"
            variant="scrollable"
            scrollButtons="auto"
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
          <Alert severity="success" sx={{ m: 2 }}>
            Cambios guardados con éxito
          </Alert>
        )}
        
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ mb: 2 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box sx={{ position: 'relative' }}>
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        bgcolor: theme.palette.primary.main,
                        fontSize: '3rem',
                        mb: 2
                      }}
                    >
                      {perfilData.nombre.charAt(0)}
                    </Avatar>
                    <IconButton
                      sx={{
                        position: 'absolute',
                        bottom: 10,
                        right: 0,
                        bgcolor: 'background.paper'
                      }}
                      aria-label="cambiar foto de perfil"
                    >
                      <PhotoCameraIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {perfilData.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {perfilData.cargo}
                  </Typography>
                </CardContent>
              </Card>
              
              <Typography variant="subtitle2" gutterBottom>
                Información de la cuenta
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="Usuario desde" 
                    secondary="01/01/2023" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Último acceso" 
                    secondary="Hoy, 14:35" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Plan" 
                    secondary="Profesional" 
                  />
                </ListItem>
              </List>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom sx={{ 
                borderBottom: `2px solid ${theme.palette.primary.main}`,
                pb: 1,
                mb: 3
              }}>
                Información Personal
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nombre completo"
                    name="nombre"
                    value={perfilData.nombre}
                    onChange={handlePerfilChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Correo electrónico"
                    name="email"
                    type="email"
                    value={perfilData.email}
                    onChange={handlePerfilChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Teléfono"
                    name="telefono"
                    value={perfilData.telefono}
                    onChange={handlePerfilChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Cargo"
                    name="cargo"
                    value={perfilData.cargo}
                    onChange={handlePerfilChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      onClick={handleSavePerfil}
                    >
                      Guardar Cambios
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom sx={{ 
            borderBottom: `2px solid ${theme.palette.primary.main}`,
            pb: 1,
            mb: 3
          }}>
            Cambiar Contraseña
          </Typography>
          
          <Grid container spacing={2} maxWidth="md">
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contraseña actual"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nueva contraseña"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirmar nueva contraseña"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                error={passwordData.newPassword !== passwordData.confirmPassword && passwordData.confirmPassword !== ''}
                helperText={passwordData.newPassword !== passwordData.confirmPassword && passwordData.confirmPassword !== '' ? 'Las contraseñas no coinciden' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleChangePassword}
                  disabled={!passwordData.currentPassword || !passwordData.newPassword || passwordData.newPassword !== passwordData.confirmPassword}
                >
                  Cambiar Contraseña
                </Button>
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h6" gutterBottom sx={{ 
            borderBottom: `2px solid ${theme.palette.primary.main}`,
            pb: 1,
            mb: 3
          }}>
            Sesiones Activas
          </Typography>
          
          <List>
            <ListItem secondaryAction={
              <Button size="small" variant="outlined" color="error">
                Cerrar
              </Button>
            }>
              <ListItemText
                primary="Computadora Windows (Actual)"
                secondary="Chrome • IP: 192.168.1.100 • Último acceso: Hace 5 minutos"
              />
            </ListItem>
            <Divider component="li" />
            <ListItem secondaryAction={
              <Button size="small" variant="outlined" color="error">
                Cerrar
              </Button>
            }>
              <ListItemText
                primary="iPhone 13"
                secondary="Safari • IP: 192.168.1.101 • Último acceso: Ayer, 18:45"
              />
            </ListItem>
          </List>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom sx={{ 
            borderBottom: `2px solid ${theme.palette.primary.main}`,
            pb: 1,
            mb: 3
          }}>
            Preferencias de Notificaciones
          </Typography>
          
          <List>
            <ListItem>
              <ListItemText 
                primary="Notificaciones por correo electrónico"
                secondary="Recibe alertas importantes y actualizaciones por correo"
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={perfilData.notificacionesEmail}
                    onChange={handlePerfilChange}
                    name="notificacionesEmail"
                    color="primary"
                  />
                }
                label=""
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText 
                primary="Notificaciones push"
                secondary="Recibe alertas en tiempo real en el navegador"
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={perfilData.notificacionesPush}
                    onChange={handlePerfilChange}
                    name="notificacionesPush"
                    color="primary"
                  />
                }
                label=""
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText 
                primary="Recordatorios de seguimiento"
                secondary="Recibe recordatorios para dar seguimiento a reparaciones pendientes"
              />
              <FormControlLabel
                control={
                  <Switch 
                    defaultChecked
                    color="primary"
                  />
                }
                label=""
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText 
                primary="Actualizaciones del sistema"
                secondary="Recibe notificaciones sobre nuevas funciones y mejoras"
              />
              <FormControlLabel
                control={
                  <Switch 
                    defaultChecked
                    color="primary"
                  />
                }
                label=""
              />
            </ListItem>
          </List>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSavePerfil}
            >
              Guardar Preferencias
            </Button>
          </Box>
        </TabPanel>
        
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom sx={{ 
            borderBottom: `2px solid ${theme.palette.primary.main}`,
            pb: 1,
            mb: 3
          }}>
            Tema y Apariencia
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
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
                  }}
                  onClick={() => setPerfilData({ ...perfilData, tema: 'oscuro' })}
                >
                  Oscuro
                </Paper>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
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
                  }}
                  onClick={() => setPerfilData({ ...perfilData, idioma: 'español' })}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <LanguageIcon sx={{ mb: 1 }} />
                    Español
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
                  }}
                  onClick={() => setPerfilData({ ...perfilData, idioma: 'inglés' })}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <LanguageIcon sx={{ mb: 1 }} />
                    English
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSavePerfil}
            >
              Aplicar Cambios
            </Button>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default ConfiguracionPage; 