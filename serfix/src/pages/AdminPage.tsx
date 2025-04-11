import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Divider, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  DialogContentText,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tabs,
  Tab,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Badge,
  Tooltip,
  SelectChangeEvent,
  TablePagination
} from '@mui/material';
import {
  Backup,
  Refresh,
  Storage,
  Download,
  Delete as DeleteIcon,
  PersonAdd as PersonAddIcon,
  Settings as SettingsIcon,
  Backup as BackupIcon,
  BarChart as BarChartIcon,
  Search as SearchIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

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
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
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
    id: `admin-tab-${index}`,
    'aria-controls': `admin-tabpanel-${index}`,
  };
}

interface User {
  name: string;
  email: string;
  role: string;
  status: string;
}

const AdminPage: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<User>({
    name: '',
    email: '',
    role: 'Administrador',
    status: 'Activo'
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteConfirm = () => {
    setDeleteConfirmOpen(true);
  };

  const handleCloseDeleteConfirm = () => {
    setDeleteConfirmOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (name) {
      setNewUser({
        ...newUser,
        [name]: value
      });
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    });
  };

  const handleSaveUser = () => {
    // Implementar la lógica para guardar el nuevo usuario
    console.log('Guardando nuevo usuario:', newUser);
    handleCloseDialog();
  };

  const handleDeleteUser = () => {
    // Implementar la lógica para eliminar el usuario seleccionado
    console.log('Eliminando usuario:', selectedUser);
    handleCloseDeleteConfirm();
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setNewUser(user);
    setOpenDialog(true);
  };

  const users: User[] = [
    { name: 'Administrador Principal', email: 'admin@serfix.com', role: 'admin', status: 'activo' },
    { name: 'Técnico Uno', email: 'tecnico1@serfix.com', role: 'tecnico', status: 'activo' },
    { name: 'Recepcionista', email: 'recepcion@serfix.com', role: 'recepcion', status: 'inactivo' }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Administración
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Panel para gestionar usuarios, sistema y configuración avanzada.
        </Typography>
      </Box>
      
      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="admin tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Usuarios" {...a11yProps(0)} />
            <Tab label="Sistema" {...a11yProps(1)} />
            <Tab label="Base de Datos" {...a11yProps(2)} />
            <Tab label="Logs" {...a11yProps(3)} />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom sx={{ 
            borderBottom: `2px solid ${theme.palette.primary.main}`,
            pb: 1,
            mb: 3
          }}>
            Gestión de Usuarios
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            gap: 3,
            mb: 4
          }}>
            <Box sx={{ 
              flex: { xs: '1 1 100%', md: '4 1 0%' }, 
              display: 'flex', 
              flexDirection: 'column'
            }}>
              <Card sx={{
                borderRadius: 2,
                boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.15)}`,
                  transform: 'translateY(-4px)'
                }
              }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Visión general
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">Usuarios activos</Typography>
                      <Typography variant="body2" fontWeight="bold">24 / 30</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={80} color="primary" sx={{ height: 8, borderRadius: 4 }} />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">Espacio de almacenamiento</Typography>
                      <Typography variant="body2" fontWeight="bold">4.2 GB / 10 GB</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={42} color="secondary" sx={{ height: 8, borderRadius: 4 }} />
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Roles de usuarios</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip 
                      label="Administradores (3)" 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                    />
                    <Chip 
                      label="Técnicos (12)" 
                      size="small" 
                      color="secondary" 
                      variant="outlined" 
                    />
                    <Chip 
                      label="Recepcionistas (9)" 
                      size="small" 
                      color="info" 
                      variant="outlined" 
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
            
            <Box sx={{ 
              flex: { xs: '1 1 100%', md: '8 1 0%' }, 
              display: 'flex', 
              flexDirection: 'column' 
            }}>
              <Card sx={{
                borderRadius: 2,
                boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                height: '100%'
              }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Acciones rápidas
                  </Typography>
                  
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2, mt: 2 }}>
            <Button
                      fullWidth 
                      variant="outlined" 
              color="primary"
                      startIcon={<PersonAddIcon />} 
              onClick={handleOpenDialog}
                      sx={{ 
                        py: 1.5, 
                        borderRadius: 2,
                        fontWeight: 500,
                        borderWidth: '2px',
                        '&:hover': {
                          borderWidth: '2px',
                          backgroundColor: alpha(theme.palette.primary.main, 0.08)
                        }
                      }}
                    >
                      Añadir usuario
                    </Button>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      color="info" 
                      startIcon={<SettingsIcon />}
                      sx={{ 
                        py: 1.5, 
                        borderRadius: 2,
                        fontWeight: 500,
                        borderWidth: '2px',
                        '&:hover': {
                          borderWidth: '2px',
                          backgroundColor: alpha(theme.palette.info.main, 0.08)
                        }
                      }}
                    >
                      Configuración avanzada
                    </Button>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      color="success" 
                      startIcon={<BackupIcon />}
                      sx={{ 
                        py: 1.5, 
                        borderRadius: 2,
                        fontWeight: 500,
                        borderWidth: '2px',
                        '&:hover': {
                          borderWidth: '2px',
                          backgroundColor: alpha(theme.palette.success.main, 0.08)
                        }
                      }}
                    >
                      Realizar copia de seguridad
                    </Button>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      color="warning" 
                      startIcon={<BarChartIcon />}
                      sx={{ 
                        py: 1.5, 
                        borderRadius: 2,
                        fontWeight: 500,
                        borderWidth: '2px',
                        '&:hover': {
                          borderWidth: '2px',
                          backgroundColor: alpha(theme.palette.warning.main, 0.08)
                        }
                      }}
                    >
                      Reportes de sistema
            </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'center' }}>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 0%' } }}>
                <TextField
                  select
                  fullWidth
                  label="Filtrar por rol"
                  variant="outlined"
                  defaultValue="todos"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: '2px'
                      }
                    }
                  }}
                >
                  <MenuItem value="todos">Todos los roles</MenuItem>
                  <MenuItem value="admin">Administrador</MenuItem>
                  <MenuItem value="tecnico">Técnico</MenuItem>
                  <MenuItem value="recepcion">Recepcionista</MenuItem>
                </TextField>
              </Box>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 0%' } }}>
                <TextField
                  select
                  fullWidth
                  label="Filtrar por estado"
                  variant="outlined"
                  defaultValue="todos"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: '2px'
                      }
                    }
                  }}
                >
                  <MenuItem value="todos">Todos los estados</MenuItem>
                  <MenuItem value="activo">Activo</MenuItem>
                  <MenuItem value="inactivo">Inactivo</MenuItem>
                  <MenuItem value="bloqueado">Bloqueado</MenuItem>
                </TextField>
              </Box>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 0%' } }}>
                <TextField
                  fullWidth
                  label="Buscar usuario"
                  variant="outlined"
                  placeholder="Nombre, correo o rol..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: '2px'
                      }
                    }
                  }}
                />
              </Box>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 0%' } }}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  color="primary" 
                  startIcon={<SearchIcon />}
                  sx={{ 
                    py: 1.7, 
                    borderRadius: 2,
                    fontWeight: 600,
                    boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
                    '&:hover': {
                      boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.6)}`,
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Buscar
                </Button>
              </Box>
            </Box>
          </Box>
          
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white' }}>Nombre</TableCell>
                  <TableCell sx={{ color: 'white' }}>Correo</TableCell>
                  <TableCell sx={{ color: 'white' }}>Rol</TableCell>
                  <TableCell sx={{ color: 'white' }}>Estado</TableCell>
                  <TableCell sx={{ color: 'white' }} align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Administrador Principal</TableCell>
                  <TableCell>admin@serfix.com</TableCell>
                  <TableCell>Administrador</TableCell>
                  <TableCell>
                    <Chip size="small" label="Activo" color="success" />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="primary">
                      <Backup />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Técnico Uno</TableCell>
                  <TableCell>tecnico1@serfix.com</TableCell>
                  <TableCell>Técnico</TableCell>
                  <TableCell>
                    <Chip size="small" label="Activo" color="success" />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="primary">
                      <Backup />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Recepcionista</TableCell>
                  <TableCell>recepcion@serfix.com</TableCell>
                  <TableCell>Recepcionista</TableCell>
                  <TableCell>
                    <Chip size="small" label="Inactivo" color="error" />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="primary">
                      <Backup />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Configuración del Sistema
          </Typography>
          
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
              <Box sx={{ flex: { xs: '1 1 100%', md: '6 1 0%' } }}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Ajustes generales
                  </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Configura los ajustes básicos del sistema SERFIX
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
                      <Button 
                        fullWidth 
                        variant="outlined" 
                        color="primary"
                        startIcon={<SettingsIcon />}
                        sx={{ 
                          py: 1.5, 
                          borderRadius: 2,
                          fontWeight: 500,
                          borderWidth: '2px',
                          '&:hover': {
                            borderWidth: '2px',
                            backgroundColor: alpha(theme.palette.primary.main, 0.08)
                          }
                        }}
                      >
                        Ajustes generales
                      </Button>
                      <Button 
                        fullWidth 
                        variant="outlined" 
                        color="secondary"
                        startIcon={<SettingsIcon />}
                        sx={{ 
                          py: 1.5, 
                          borderRadius: 2,
                          fontWeight: 500,
                          borderWidth: '2px',
                          '&:hover': {
                            borderWidth: '2px',
                            backgroundColor: alpha(theme.palette.secondary.main, 0.08)
                          }
                        }}
                      >
                        Personalización
                      </Button>
                      <Button 
                        fullWidth 
                        variant="outlined" 
                        color="info"
                        startIcon={<BackupIcon />}
                        sx={{ 
                          py: 1.5, 
                          borderRadius: 2,
                          fontWeight: 500,
                          borderWidth: '2px',
                          '&:hover': {
                            borderWidth: '2px',
                            backgroundColor: alpha(theme.palette.info.main, 0.08)
                          }
                        }}
                      >
                        Copia de seguridad
                      </Button>
                      <Button 
                        fullWidth 
                        variant="outlined" 
                        color="warning"
                        startIcon={<SettingsIcon />}
                        sx={{ 
                          py: 1.5, 
                          borderRadius: 2,
                          fontWeight: 500,
                          borderWidth: '2px',
                          '&:hover': {
                            borderWidth: '2px',
                            backgroundColor: alpha(theme.palette.warning.main, 0.08)
                          }
                        }}
                      >
                        Configuración avanzada
                      </Button>
                    </Box>
                </CardContent>
              </Card>
              </Box>
              <Box sx={{ flex: { xs: '1 1 100%', md: '6 1 0%' } }}>
                <Card>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Estadísticas del sistema
                  </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Revisa el rendimiento y uso de recursos
                    </Typography>
                    <List>
                      <ListItem disableGutters>
                        <ListItemText 
                          primary="CPU" 
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="caption" color="text.secondary">Uso actual: 32%</Typography>
                                <Typography variant="caption" color="primary">Buen rendimiento</Typography>
                              </Box>
                              <LinearProgress variant="determinate" value={32} color="primary" sx={{ height: 6, borderRadius: 3 }} />
                            </Box>
                          }
                        />
                      </ListItem>
                      <ListItem disableGutters>
                        <ListItemText 
                          primary="Memoria" 
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="caption" color="text.secondary">Uso actual: 64%</Typography>
                                <Typography variant="caption" color="secondary">Normal</Typography>
                              </Box>
                              <LinearProgress variant="determinate" value={64} color="secondary" sx={{ height: 6, borderRadius: 3 }} />
                            </Box>
                          }
                        />
                      </ListItem>
                      <ListItem disableGutters>
                        <ListItemText 
                          primary="Almacenamiento" 
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="caption" color="text.secondary">Uso actual: 78%</Typography>
                                <Typography variant="caption" color="warning.main">Verificar pronto</Typography>
                              </Box>
                              <LinearProgress variant="determinate" value={78} color="warning" sx={{ height: 6, borderRadius: 3 }} />
                            </Box>
                          }
                        />
                      </ListItem>
                    </List>
                </CardContent>
              </Card>
              </Box>
            </Box>
          </Paper>
          
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'center' }}>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 0%' } }}>
                <TextField
                  select
                  fullWidth
                  label="Tipo de datos"
                  variant="outlined"
                  defaultValue="uso"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: '2px'
                      }
                    }
                  }}
                >
                  <MenuItem value="uso">Uso del sistema</MenuItem>
                  <MenuItem value="rendimiento">Rendimiento</MenuItem>
                </TextField>
              </Box>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 0%' } }}>
                <TextField
                  fullWidth
                  label="Fecha Inicio"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: '2px'
                      }
                    }
                  }}
                />
              </Box>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 0%' } }}>
                <TextField
                  fullWidth
                  label="Fecha Fin"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: '2px'
                      }
                    }
                  }}
                />
              </Box>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 0%' } }}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  color="primary" 
                  startIcon={<SearchIcon />}
                  sx={{ 
                    py: 1.7, 
                    borderRadius: 2,
                    fontWeight: 600,
                    boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
                    '&:hover': {
                      boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.6)}`,
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Generar
                </Button>
              </Box>
            </Box>
          </Box>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Paper sx={{ p: 3, mb: 4, borderRadius: 2, boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}` }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Usuarios
          </Typography>
          
          <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'center' }}>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 0%' } }}>
                <TextField
                  select
                  fullWidth
                    label="Filtrar por rol"
                    variant="outlined"
                    defaultValue="todos"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: '2px'
                        }
                      }
                    }}
                  >
                    <MenuItem value="todos">Todos los roles</MenuItem>
                    <MenuItem value="admin">Administrador</MenuItem>
                    <MenuItem value="tecnico">Técnico</MenuItem>
                    <MenuItem value="recepcion">Recepcionista</MenuItem>
                </TextField>
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 0%' } }}>
                <TextField
                  select
                  fullWidth
                    label="Filtrar por estado"
                    variant="outlined"
                    defaultValue="todos"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: '2px'
                        }
                      }
                    }}
                  >
                    <MenuItem value="todos">Todos los estados</MenuItem>
                    <MenuItem value="activo">Activo</MenuItem>
                    <MenuItem value="inactivo">Inactivo</MenuItem>
                    <MenuItem value="bloqueado">Bloqueado</MenuItem>
                </TextField>
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 0%' } }}>
                <TextField
                  fullWidth
                  label="Opciones adicionales"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: '2px'
                        }
                      }
                    }}
                  />
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 0%' } }}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  color="primary"
                    startIcon={<SearchIcon />}
                    sx={{ 
                      py: 1.7, 
                      borderRadius: 2,
                      fontWeight: 600,
                      boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
                      '&:hover': {
                        boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.6)}`,
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Buscar
                </Button>
                </Box>
              </Box>
          </Box>
          
            <TableContainer>
              <Table>
              <TableHead>
                  <TableRow sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.8) }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Usuario</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Correo</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Rol</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Estado</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={index} sx={{ 
                      '&:hover': { 
                        backgroundColor: alpha(theme.palette.primary.main, 0.05) 
                      },
                      transition: 'background-color 0.2s ease'
                    }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar 
                            sx={{ 
                              mr: 2, 
                              bgcolor: 
                                user.role === 'admin' ? theme.palette.primary.main : 
                                user.role === 'tecnico' ? theme.palette.secondary.main : 
                                theme.palette.info.main
                            }}
                          >
                            {user.name.charAt(0)}
                          </Avatar>
                          <Typography variant="body1">{user.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Chip 
                          label={
                            user.role === 'admin' ? 'Administrador' : 
                            user.role === 'tecnico' ? 'Técnico' : 
                            'Recepcionista'
                          } 
                          size="small" 
                          color={
                            user.role === 'admin' ? 'primary' : 
                            user.role === 'tecnico' ? 'secondary' : 
                            'info'
                          } 
                          variant="outlined" 
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={
                            user.status === 'activo' ? 'Activo' : 
                            user.status === 'inactivo' ? 'Inactivo' : 
                            'Bloqueado'
                          } 
                          size="small" 
                          color={
                            user.status === 'activo' ? 'success' : 
                            user.status === 'inactivo' ? 'warning' : 
                            'error'
                          } 
                          sx={{
                            bgcolor: user.status === 'activo' 
                              ? alpha(theme.palette.success.main, 0.1)
                              : user.status === 'inactivo'
                              ? alpha(theme.palette.warning.main, 0.1)
                              : alpha(theme.palette.error.main, 0.1)
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Editar">
                          <IconButton 
                            color="primary" 
                            size="small" 
                            onClick={() => handleEditUser(user)}
                            sx={{ 
                              mr: 1,
                              '&:hover': { 
                                backgroundColor: alpha(theme.palette.primary.main, 0.1) 
                              }
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <IconButton 
                            color="error" 
                            size="small" 
                            onClick={handleDeleteConfirm}
                            sx={{ 
                              '&:hover': { 
                                backgroundColor: alpha(theme.palette.error.main, 0.1) 
                              }
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
            <TablePagination
              component="div"
              count={100}
              page={0}
              onPageChange={() => {}}
              rowsPerPage={10}
              onRowsPerPageChange={() => {}}
              sx={{ 
                borderRadius: 0,
                '& .MuiTablePagination-selectIcon': {
                  color: theme.palette.primary.main
                }
              }}
            />
          </Paper>
        </TabPanel>
        
        <TabPanel value={tabValue} index={3}>
          <Paper sx={{ p: 3, mb: 4, borderRadius: 2, boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}` }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Estadísticas
          </Typography>
          
          <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'center' }}>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 0%' } }}>
                <TextField
                  select
                  fullWidth
                    label="Tipo de datos"
                    variant="outlined"
                    defaultValue="uso"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: '2px'
                        }
                      }
                    }}
                  >
                    <MenuItem value="uso">Uso del sistema</MenuItem>
                    <MenuItem value="rendimiento">Rendimiento</MenuItem>
                </TextField>
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 0%' } }}>
                <TextField
                  fullWidth
                  label="Fecha Inicio"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: '2px'
                        }
                      }
                    }}
                  />
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 0%' } }}>
                <TextField
                  fullWidth
                  label="Fecha Fin"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: '2px'
                        }
                      }
                    }}
                  />
                </Box>
                <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 0%' } }}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  color="primary"
                    startIcon={<SearchIcon />}
                    sx={{ 
                      py: 1.7, 
                      borderRadius: 2,
                      fontWeight: 600,
                      boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
                      '&:hover': {
                        boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.6)}`,
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Generar
                </Button>
                </Box>
              </Box>
          </Box>
          
            <Card sx={{ 
              mb: 3, 
              borderRadius: 2, 
              boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
              overflow: 'hidden'
            }}>
              <CardContent sx={{ pb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Rendimiento del sistema
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Resumen del rendimiento del sistema en el período seleccionado
                </Typography>

                <Box sx={{ mt: 3 }}>
                  <List>
                    <ListItem disableGutters>
                      <ListItemText 
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="subtitle2">Usuarios activos</Typography>
                            <Typography variant="subtitle2" fontWeight="bold" color="primary.main">86%</Typography>
          </Box>
                        } 
                        secondary={
                          <LinearProgress variant="determinate" value={86} color="primary" sx={{ height: 8, borderRadius: 4 }} />
                        }
                      />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemText 
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="subtitle2">Reparaciones completadas</Typography>
                            <Typography variant="subtitle2" fontWeight="bold" color="success.main">74%</Typography>
                          </Box>
                        } 
                        secondary={
                          <LinearProgress variant="determinate" value={74} color="success" sx={{ height: 8, borderRadius: 4 }} />
                        }
                      />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemText 
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="subtitle2">Crecimiento de clientes</Typography>
                            <Typography variant="subtitle2" fontWeight="bold" color="secondary.main">63%</Typography>
                          </Box>
                        } 
                        secondary={
                          <LinearProgress variant="determinate" value={63} color="secondary" sx={{ height: 8, borderRadius: 4 }} />
                        }
                      />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemText 
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="subtitle2">Satisfacción de clientes</Typography>
                            <Typography variant="subtitle2" fontWeight="bold" color="info.main">92%</Typography>
                          </Box>
                        } 
                        secondary={
                          <LinearProgress variant="determinate" value={92} color="info" sx={{ height: 8, borderRadius: 4 }} />
                        }
                      />
                    </ListItem>
                  </List>
                </Box>
              </CardContent>
            </Card>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
              <Card sx={{ 
                flex: 1, 
                borderRadius: 2, 
                boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                overflow: 'hidden'
              }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Usuarios registrados
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2, mb: 2 }}>
                    <Typography variant="h2" color="primary.main" fontWeight="bold">28</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary">Este mes</Typography>
                      <Typography variant="body2" fontWeight="bold" color="success.main">+5</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary">Total</Typography>
                      <Typography variant="body2" fontWeight="bold">28</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary">Activos</Typography>
                      <Typography variant="body2" fontWeight="bold" color="primary.main">24</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ 
                flex: 1, 
                borderRadius: 2, 
                boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                overflow: 'hidden'
              }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Backups realizados
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2, mb: 2 }}>
                    <Typography variant="h2" color="secondary.main" fontWeight="bold">12</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary">Este mes</Typography>
                      <Typography variant="body2" fontWeight="bold" color="success.main">+3</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary">Total</Typography>
                      <Typography variant="body2" fontWeight="bold">12</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary">Tamaño</Typography>
                      <Typography variant="body2" fontWeight="bold" color="info.main">2.4 GB</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Paper>
        </TabPanel>
      </Paper>
      
      {/* Dialog para crear/editar usuario */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {selectedUser ? 'Editar Usuario' : 'Nuevo Usuario'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <TextField
                  fullWidth
                  label="Nombre completo"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: '2px'
                      }
                    }
                  }}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: '2px'
                      }
                    }
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <Box sx={{ flex: { xs: '1', sm: '1' } }}>
                  <FormControl fullWidth sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: '2px'
                      }
                    }
                  }}>
                  <InputLabel>Rol</InputLabel>
                  <Select
                    name="role"
                    value={newUser.role}
                      onChange={handleSelectChange}
                    label="Rol"
                    >
                      <MenuItem value="admin">Administrador</MenuItem>
                      <MenuItem value="tecnico">Técnico</MenuItem>
                      <MenuItem value="recepcion">Recepcionista</MenuItem>
                  </Select>
                </FormControl>
                </Box>
                <Box sx={{ flex: { xs: '1', sm: '1' } }}>
                  <FormControl fullWidth sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: '2px'
                      }
                    }
                  }}>
                  <InputLabel>Estado</InputLabel>
                  <Select
                    name="status"
                    value={newUser.status}
                      onChange={handleSelectChange}
                    label="Estado"
                  >
                      <MenuItem value="activo">Activo</MenuItem>
                      <MenuItem value="inactivo">Inactivo</MenuItem>
                      <MenuItem value="bloqueado">Bloqueado</MenuItem>
                  </Select>
                </FormControl>
                </Box>
              </Box>
              {!selectedUser && (
                <Box>
                  <TextField
                    fullWidth
                    label="Contraseña temporal"
                    name="password"
                    type="password"
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: '2px'
                        }
                      }
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button 
            onClick={handleSaveUser} 
            variant="contained" 
            color="primary"
            disabled={!newUser.name || !newUser.email || !newUser.role || !newUser.status}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Dialog de confirmación para eliminar usuario */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={handleCloseDeleteConfirm}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar al usuario <strong>{selectedUser?.name}</strong>?
            Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm}>Cancelar</Button>
          <Button onClick={handleDeleteUser} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPage; 