import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  CardActions, 
  Grid, 
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
  Chip
} from '@mui/material';
import {
  Backup,
  Refresh,
  Storage,
  Download,
  Delete as DeleteIcon
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

  const handleInputChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = e.target.name as string;
    const value = e.target.value as string;
    setNewUser(prev => ({ ...prev, [name]: value }));
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
          
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialog}
            >
              Nuevo Usuario
            </Button>
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
          <Typography variant="h6" gutterBottom sx={{ 
            borderBottom: `2px solid ${theme.palette.primary.main}`,
            pb: 1,
            mb: 3
          }}>
            Información del Sistema
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Estado del Sistema
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Espacio en disco:</span>
                      <span>2.4 GB / 20 GB</span>
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Memoria:</span>
                      <span>1.2 GB / 4 GB</span>
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Conexiones:</span>
                      <span>12 activas</span>
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Último Backup:</span>
                      <span>10/11/2023</span>
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Ver Detalles
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Acciones de Base de Datos
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={6}>
                      <Button 
                        fullWidth 
                        variant="outlined" 
                        color="primary"
                        startIcon={<Backup />}
                      >
                        Realizar Backup
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button 
                        fullWidth 
                        variant="outlined" 
                        color="secondary"
                        startIcon={<Refresh />}
                      >
                        Optimizar Tablas
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button 
                        fullWidth 
                        variant="outlined" 
                        color="info"
                        startIcon={<Refresh />}
                      >
                        Verificar Integridad
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button 
                        fullWidth 
                        variant="outlined" 
                        color="warning"
                        startIcon={<Storage />}
                      >
                        Ver Logs
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              
              <Card sx={{ mt: 3 }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Backups Recientes
                  </Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Fecha</TableCell>
                          <TableCell>Tamaño</TableCell>
                          <TableCell>Tipo</TableCell>
                          <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>10/11/2023 03:00 AM</TableCell>
                          <TableCell>245 MB</TableCell>
                          <TableCell>Automático</TableCell>
                          <TableCell align="right">
                            <IconButton size="small" color="primary">
                              <Download />
                            </IconButton>
                            <IconButton size="small" color="error">
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>09/11/2023 03:00 AM</TableCell>
                          <TableCell>243 MB</TableCell>
                          <TableCell>Automático</TableCell>
                          <TableCell align="right">
                            <IconButton size="small" color="primary">
                              <Download />
                            </IconButton>
                            <IconButton size="small" color="error">
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>08/11/2023 15:45 PM</TableCell>
                          <TableCell>242 MB</TableCell>
                          <TableCell>Manual</TableCell>
                          <TableCell align="right">
                            <IconButton size="small" color="primary">
                              <Download />
                            </IconButton>
                            <IconButton size="small" color="error">
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom sx={{ 
            borderBottom: `2px solid ${theme.palette.primary.main}`,
            pb: 1,
            mb: 3
          }}>
            Base de Datos
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Acción"
                  defaultValue="backup"
                >
                  <MenuItem value="backup">Backup</MenuItem>
                  <MenuItem value="optimize">Optimizar</MenuItem>
                  <MenuItem value="repair">Reparar</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Tablas"
                  defaultValue="all"
                >
                  <MenuItem value="all">Todas</MenuItem>
                  <MenuItem value="users">Usuarios</MenuItem>
                  <MenuItem value="repairs">Reparaciones</MenuItem>
                  <MenuItem value="clients">Clientes</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Opciones adicionales"
                  placeholder="Opciones adicionales"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  color="primary"
                >
                  Ejecutar
                </Button>
              </Grid>
            </Grid>
          </Box>
          
          <Typography variant="subtitle1" gutterBottom>
            Estadísticas de la Base de Datos
          </Typography>
          
          <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Tabla</TableCell>
                  <TableCell>Registros</TableCell>
                  <TableCell>Tamaño</TableCell>
                  <TableCell>Última Actualización</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>usuarios</TableCell>
                  <TableCell>15</TableCell>
                  <TableCell>1.2 MB</TableCell>
                  <TableCell>10/11/2023</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>clientes</TableCell>
                  <TableCell>203</TableCell>
                  <TableCell>5.7 MB</TableCell>
                  <TableCell>10/11/2023</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>reparaciones</TableCell>
                  <TableCell>845</TableCell>
                  <TableCell>18.3 MB</TableCell>
                  <TableCell>10/11/2023</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>equipos</TableCell>
                  <TableCell>312</TableCell>
                  <TableCell>7.5 MB</TableCell>
                  <TableCell>09/11/2023</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom sx={{ 
            borderBottom: `2px solid ${theme.palette.primary.main}`,
            pb: 1,
            mb: 3
          }}>
            Logs del Sistema
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Tipo de Log"
                  defaultValue="all"
                >
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="error">Errores</MenuItem>
                  <MenuItem value="warning">Advertencias</MenuItem>
                  <MenuItem value="info">Información</MenuItem>
                  <MenuItem value="debug">Debug</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Fecha Inicio"
                  type="date"
                  defaultValue="2023-11-01"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Fecha Fin"
                  type="date"
                  defaultValue="2023-11-10"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  color="primary"
                >
                  Filtrar
                </Button>
              </Grid>
            </Grid>
          </Box>
          
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Fecha y Hora</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Mensaje</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>10/11/2023 16:32:45</TableCell>
                  <TableCell>
                    <Chip size="small" label="ERROR" color="error" />
                  </TableCell>
                  <TableCell>admin@serfix.com</TableCell>
                  <TableCell>Error al conectar con el servidor SMTP</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>10/11/2023 14:20:33</TableCell>
                  <TableCell>
                    <Chip size="small" label="INFO" color="info" />
                  </TableCell>
                  <TableCell>admin@serfix.com</TableCell>
                  <TableCell>Usuario 'Técnico Uno' actualizado</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>10/11/2023 12:10:15</TableCell>
                  <TableCell>
                    <Chip size="small" label="WARNING" color="warning" />
                  </TableCell>
                  <TableCell>sistema</TableCell>
                  <TableCell>Uso de almacenamiento superior al 60%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>10/11/2023 09:45:22</TableCell>
                  <TableCell>
                    <Chip size="small" label="INFO" color="info" />
                  </TableCell>
                  <TableCell>gerente@serfix.com</TableCell>
                  <TableCell>Acceso al sistema desde nueva IP: 192.168.1.101</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>09/11/2023 17:55:12</TableCell>
                  <TableCell>
                    <Chip size="small" label="ERROR" color="error" />
                  </TableCell>
                  <TableCell>sistema</TableCell>
                  <TableCell>Fallo en la generación de reporte mensual</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>09/11/2023 10:30:44</TableCell>
                  <TableCell>
                    <Chip size="small" label="INFO" color="info" />
                  </TableCell>
                  <TableCell>tecnico1@serfix.com</TableCell>
                  <TableCell>Inicio de sesión exitoso</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button 
              variant="outlined" 
              color="primary"
              sx={{ mr: 2 }}
            >
              Exportar Logs
            </Button>
            <Button 
              variant="outlined" 
              color="secondary"
            >
              Limpiar Logs Antiguos
            </Button>
          </Box>
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre completo"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange as any}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  value={newUser.email}
                  onChange={handleInputChange as any}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Rol</InputLabel>
                  <Select
                    name="role"
                    value={newUser.role}
                    label="Rol"
                    onChange={handleInputChange as any}
                  >
                    <MenuItem value="Administrador">Administrador</MenuItem>
                    <MenuItem value="Gerente">Gerente</MenuItem>
                    <MenuItem value="Técnico">Técnico</MenuItem>
                    <MenuItem value="Recepcionista">Recepcionista</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Estado</InputLabel>
                  <Select
                    name="status"
                    value={newUser.status}
                    label="Estado"
                    onChange={handleInputChange as any}
                  >
                    <MenuItem value="Activo">Activo</MenuItem>
                    <MenuItem value="Inactivo">Inactivo</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {!selectedUser && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Contraseña temporal"
                    type="password"
                    defaultValue="serfix2023"
                  />
                </Grid>
              )}
            </Grid>
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