import React, { useState } from 'react';
import { 
  Typography, 
  Paper, 
  Box, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

interface Equipo {
  id: string;
  nombre: string;
  tipo: string;
  marca: string;
  modelo: string;
  serial: string;
  estado: 'Activo' | 'En reparación' | 'Dado de baja';
}

const equiposIniciales: Equipo[] = [
  { 
    id: '1', 
    nombre: 'Laptop Dell XPS', 
    tipo: 'Laptop', 
    marca: 'Dell', 
    modelo: 'XPS 15', 
    serial: 'DL123456',
    estado: 'Activo'
  },
  { 
    id: '2', 
    nombre: 'iPhone 13 Pro', 
    tipo: 'Smartphone', 
    marca: 'Apple', 
    modelo: 'iPhone 13 Pro', 
    serial: 'AP789012',
    estado: 'En reparación'
  },
  { 
    id: '3', 
    nombre: 'Monitor LG Ultrawide', 
    tipo: 'Monitor', 
    marca: 'LG', 
    modelo: 'Ultrawide 34"', 
    serial: 'LG345678',
    estado: 'Activo'
  },
];

const EquiposPage: React.FC = () => {
  const theme = useTheme();
  const [equipos, setEquipos] = useState<Equipo[]>(equiposIniciales);
  const [busqueda, setBusqueda] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [equipoEditando, setEquipoEditando] = useState<Equipo | null>(null);
  const [nuevoEquipo, setNuevoEquipo] = useState<Omit<Equipo, 'id'>>({
    nombre: '',
    tipo: '',
    marca: '',
    modelo: '',
    serial: '',
    estado: 'Activo'
  });

  const handleOpenDialog = (equipo?: Equipo) => {
    if (equipo) {
      setEquipoEditando(equipo);
      setNuevoEquipo({
        nombre: equipo.nombre,
        tipo: equipo.tipo,
        marca: equipo.marca,
        modelo: equipo.modelo,
        serial: equipo.serial,
        estado: equipo.estado
      });
    } else {
      setEquipoEditando(null);
      setNuevoEquipo({
        nombre: '',
        tipo: '',
        marca: '',
        modelo: '',
        serial: '',
        estado: 'Activo'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setNuevoEquipo({
      ...nuevoEquipo,
      [name as string]: value
    });
  };

  const handleGuardar = () => {
    if (equipoEditando) {
      // Actualizar equipo existente
      setEquipos(equipos.map(eq => 
        eq.id === equipoEditando.id 
          ? { ...eq, ...nuevoEquipo } 
          : eq
      ));
    } else {
      // Crear nuevo equipo
      const id = `eq-${Date.now().toString(36)}`;
      setEquipos([...equipos, { id, ...nuevoEquipo as any }]);
    }
    handleCloseDialog();
  };

  const handleEliminar = (id: string) => {
    setEquipos(equipos.filter(eq => eq.id !== id));
  };

  const equiposFiltrados = equipos.filter(equipo => 
    equipo.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    equipo.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
    equipo.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
    equipo.modelo.toLowerCase().includes(busqueda.toLowerCase()) ||
    equipo.serial.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Equipos
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Nuevo Equipo
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box display="flex" alignItems="center">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar equipos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
            }}
            sx={{ mr: 2 }}
          />
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {equiposFiltrados.map((equipo) => (
          <Grid item xs={12} sm={6} md={4} key={equipo.id}>
            <Card 
              elevation={2}
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {equipo.nombre}
                </Typography>
                <Box 
                  sx={{ 
                    display: 'inline-block', 
                    px: 1, 
                    py: 0.5, 
                    borderRadius: 1, 
                    mb: 2,
                    backgroundColor: 
                      equipo.estado === 'Activo' 
                        ? 'success.light'
                        : equipo.estado === 'En reparación'
                          ? 'warning.light'
                          : 'error.light',
                    color: '#fff'
                  }}
                >
                  {equipo.estado}
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Tipo:</strong> {equipo.tipo}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Marca:</strong> {equipo.marca}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Modelo:</strong> {equipo.modelo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Serial:</strong> {equipo.serial}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <IconButton 
                  size="small" 
                  onClick={() => handleOpenDialog(equipo)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => handleEliminar(equipo.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog para crear/editar equipo */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{equipoEditando ? 'Editar Equipo' : 'Nuevo Equipo'}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  value={nuevoEquipo.nombre}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tipo"
                  name="tipo"
                  value={nuevoEquipo.tipo}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Marca"
                  name="marca"
                  value={nuevoEquipo.marca}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Modelo"
                  name="modelo"
                  value={nuevoEquipo.modelo}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Serial"
                  name="serial"
                  value={nuevoEquipo.serial}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Estado</InputLabel>
                  <Select
                    name="estado"
                    value={nuevoEquipo.estado}
                    label="Estado"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Activo">Activo</MenuItem>
                    <MenuItem value="En reparación">En reparación</MenuItem>
                    <MenuItem value="Dado de baja">Dado de baja</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button 
            onClick={handleGuardar} 
            variant="contained" 
            color="primary"
            disabled={!nuevoEquipo.nombre || !nuevoEquipo.tipo || !nuevoEquipo.marca || !nuevoEquipo.modelo || !nuevoEquipo.serial}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EquiposPage; 