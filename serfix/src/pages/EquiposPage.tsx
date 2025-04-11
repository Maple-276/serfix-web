import React, { useState } from 'react';
import { 
  Typography, 
  Paper, 
  Box, 
  Button, 
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
  MenuItem,
  InputAdornment,
  Chip,
  Tooltip,
  SelectChangeEvent
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled, useTheme, alpha } from '@mui/material/styles';

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

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%', 
  display: 'flex', 
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.2)}`
  }
}));

const StatusChip = styled(Chip)(({ theme, color }) => ({
  fontWeight: 600,
  borderRadius: 6,
  fontSize: '0.75rem',
  cursor: 'default',
  '& .MuiChip-label': {
    padding: '0 8px',
  }
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  transition: 'all 0.2s',
  '&:hover': {
    transform: 'scale(1.15)',
  }
}));

const SearchPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.05)}`,
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: `0 6px 24px ${alpha(theme.palette.common.black, 0.08)}`,
  }
}));

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoEquipo({
      ...nuevoEquipo,
      [name]: value
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
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

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Activo':
        return 'success';
      case 'En reparación':
        return 'warning';
      case 'Dado de baja':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{
            fontWeight: 700,
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Equipos
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            borderRadius: 8,
            fontWeight: 600,
            padding: '10px 24px',
            boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.25)}`,
            transition: 'all 0.3s',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
            }
          }}
        >
          Nuevo Equipo
        </Button>
      </Box>

      <SearchPaper sx={{ mb: 4 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar equipos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon color="primary" /></InputAdornment>
            }}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: 10,
                transition: 'all 0.2s',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderWidth: 2,
                    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`
                  }
                }
              }
            }}
          />
          <Tooltip title="Filtros avanzados">
            <IconButton
              color="primary"
              sx={{ 
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                borderRadius: 2,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                }
              }}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </SearchPaper>

      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)'
          },
          gap: 3
        }}
      >
        {equiposFiltrados.map((equipo) => (
          <Box key={equipo.id}>
            <StyledCard elevation={1}>
              <CardContent sx={{ p: 3, flexGrow: 1 }}>
                <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
                  <Typography 
                    variant="h6" 
                    component="h2" 
                    sx={{ 
                      fontWeight: 600, 
                      color: theme.palette.text.primary,
                      transition: 'color 0.2s',
                      '&:hover': {
                        color: theme.palette.primary.main
                      }
                    }}
                  >
                    {equipo.nombre}
                  </Typography>
                  
                  <StatusChip 
                    label={equipo.estado} 
                    size="small"
                    color={getEstadoColor(equipo.estado) as any}
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 1,
                  '& .property': {
                    display: 'flex',
                    justifyContent: 'space-between'
                  },
                  '& .label': {
                    color: theme.palette.text.secondary,
                    fontWeight: 500,
                    fontSize: '0.875rem'
                  },
                  '& .value': {
                    color: theme.palette.text.primary,
                    fontWeight: 500,
                    fontSize: '0.875rem'
                  }
                }}>
                  <Box className="property">
                    <Typography className="label">Tipo:</Typography>
                    <Typography className="value">{equipo.tipo}</Typography>
                  </Box>
                  <Box className="property">
                    <Typography className="label">Marca:</Typography>
                    <Typography className="value">{equipo.marca}</Typography>
                  </Box>
                  <Box className="property">
                    <Typography className="label">Modelo:</Typography>
                    <Typography className="value">{equipo.modelo}</Typography>
                  </Box>
                  <Box className="property">
                    <Typography className="label">Serial:</Typography>
                    <Typography className="value">{equipo.serial}</Typography>
                  </Box>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
                <Tooltip title="Editar equipo">
                  <ActionButton 
                    size="small" 
                    onClick={() => handleOpenDialog(equipo)}
                    color="primary"
                    sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
                  >
                    <EditIcon fontSize="small" />
                  </ActionButton>
                </Tooltip>
                <Tooltip title="Eliminar equipo">
                  <ActionButton 
                    size="small" 
                    onClick={() => handleEliminar(equipo.id)}
                    color="error"
                    sx={{ bgcolor: alpha(theme.palette.error.main, 0.1) }}
                  >
                    <DeleteIcon fontSize="small" />
                  </ActionButton>
                </Tooltip>
              </CardActions>
            </StyledCard>
          </Box>
        ))}
      </Box>

      {/* Dialog para crear/editar equipo */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ 
          fontSize: '1.5rem', 
          fontWeight: 600,
          pb: 1,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
        }}>
          {equipoEditando ? 'Editar Equipo' : 'Nuevo Equipo'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              fullWidth
              label="Nombre"
              name="nombre"
              value={nuevoEquipo.nombre}
              onChange={handleInputChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  transition: 'all 0.2s',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderWidth: 2,
                      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`
                    }
                  }
                }
              }}
            />
            
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <TextField
                fullWidth
                label="Tipo"
                name="tipo"
                value={nuevoEquipo.tipo}
                onChange={handleInputChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.2s',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main,
                    },
                    '&.Mui-focused': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: 2,
                        boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`
                      }
                    }
                  }
                }}
              />
              <TextField
                fullWidth
                label="Marca"
                name="marca"
                value={nuevoEquipo.marca}
                onChange={handleInputChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.2s',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main,
                    },
                    '&.Mui-focused': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: 2,
                        boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`
                      }
                    }
                  }
                }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <TextField
                fullWidth
                label="Modelo"
                name="modelo"
                value={nuevoEquipo.modelo}
                onChange={handleInputChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.2s',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main,
                    },
                    '&.Mui-focused': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: 2,
                        boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`
                      }
                    }
                  }
                }}
              />
              <TextField
                fullWidth
                label="Serial"
                name="serial"
                value={nuevoEquipo.serial}
                onChange={handleInputChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.2s',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main,
                    },
                    '&.Mui-focused': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: 2,
                        boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`
                      }
                    }
                  }
                }}
              />
            </Box>
            
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel id="estado-label">Estado</InputLabel>
              <Select
                labelId="estado-label"
                name="estado"
                value={nuevoEquipo.estado}
                label="Estado"
                onChange={handleSelectChange}
                sx={{
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderWidth: 2,
                      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`
                    }
                  }
                }}
              >
                <MenuItem value="Activo">Activo</MenuItem>
                <MenuItem value="En reparación">En reparación</MenuItem>
                <MenuItem value="Dado de baja">Dado de baja</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
          <Button 
            onClick={handleCloseDialog}
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 500,
              '&:hover': {
                backgroundColor: alpha(theme.palette.action.active, 0.05)
              }
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleGuardar} 
            variant="contained" 
            color="primary"
            disabled={!nuevoEquipo.nombre || !nuevoEquipo.tipo || !nuevoEquipo.marca || !nuevoEquipo.modelo || !nuevoEquipo.serial}
            sx={{
              borderRadius: 8,
              fontWeight: 600,
              px: 3,
              boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.25)}`,
              '&:hover': {
                boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
              }
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EquiposPage; 