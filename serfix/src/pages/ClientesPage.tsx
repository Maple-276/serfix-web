import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    Typography,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Avatar,
    Chip,
    Divider,
    Tabs,
    Tab,
    InputAdornment
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    History as HistoryIcon,
    Build as BuildIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    PersonOutline as PersonIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface Cliente {
    id: string;
    nombre: string;
    correo: string;
    telefono: string;
    direccion: string;
    fechaRegistro: string;
    equipos: number;
    reparaciones: number;
}

const clientesIniciales: Cliente[] = [
    {
        id: '1',
        nombre: 'Juan Pérez',
        correo: 'juan.perez@ejemplo.com',
        telefono: '555-123-4567',
        direccion: 'Calle Principal 123, Ciudad',
        fechaRegistro: '2023-05-15',
        equipos: 2,
        reparaciones: 3
    },
    {
        id: '2',
        nombre: 'María López',
        correo: 'maria.lopez@ejemplo.com',
        telefono: '555-987-6543',
        direccion: 'Avenida Central 456, Ciudad',
        fechaRegistro: '2023-06-20',
        equipos: 1,
        reparaciones: 1
    },
    {
        id: '3',
        nombre: 'Carlos Rodríguez',
        correo: 'carlos.rodriguez@ejemplo.com',
        telefono: '555-567-8901',
        direccion: 'Calle Secundaria 789, Ciudad',
        fechaRegistro: '2023-07-10',
        equipos: 3,
        reparaciones: 4
    },
    {
        id: '4',
        nombre: 'Ana Martínez',
        correo: 'ana.martinez@ejemplo.com',
        telefono: '555-345-6789',
        direccion: 'Avenida Norte 234, Ciudad',
        fechaRegistro: '2023-08-05',
        equipos: 1,
        reparaciones: 2
    },
];

const ClientesPage: React.FC = () => {
    const theme = useTheme();
    const [clientes, setClientes] = useState<Cliente[]>(clientesIniciales);
    const [busqueda, setBusqueda] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
    const [nuevoCliente, setNuevoCliente] = useState<Omit<Cliente, 'id' | 'equipos' | 'reparaciones' | 'fechaRegistro'>>({
        nombre: '',
        correo: '',
        telefono: '',
        direccion: ''
    });
    const [errores, setErrores] = useState<{
        nombre?: string;
        correo?: string;
        telefono?: string;
        direccion?: string;
    }>({});
    const [tabValue, setTabValue] = useState(0);

    // Efecto para validar el formulario cada vez que cambie nuevoCliente
    useEffect(() => {
        const validar = () => {
            const nuevosErrores: typeof errores = {};
            if (!nuevoCliente.nombre.trim()) {
                nuevosErrores.nombre = 'El nombre es requerido';
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nuevoCliente.correo)) {
                nuevosErrores.correo = 'Correo inválido';
            }
            if (!/^\d{3}-\d{3}-\d{4}$/.test(nuevoCliente.telefono)) {
                nuevosErrores.telefono = 'Formato inválido. Use: 555-123-4567';
            }
            if (!nuevoCliente.direccion.trim()) {
                nuevosErrores.direccion = 'La dirección es requerida';
            }
            setErrores(nuevosErrores);
        };

        validar();
    }, [nuevoCliente]);

    // Astucia: si no hay errores, el formulario es válido
    const isFormValid = useMemo(() => Object.keys(errores).length === 0, [errores]);

    const handleTabChange = useCallback((_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    }, []);

    const handleOpenDialog = useCallback((cliente?: Cliente) => {
        if (cliente) {
            setClienteEditando(cliente);
            setNuevoCliente({
                nombre: cliente.nombre,
                correo: cliente.correo,
                telefono: cliente.telefono,
                direccion: cliente.direccion
            });
        } else {
            setClienteEditando(null);
            setNuevoCliente({
                nombre: '',
                correo: '',
                telefono: '',
                direccion: ''
            });
        }
        setOpenDialog(true);
    }, []);

    const handleCloseDialog = useCallback(() => {
        setOpenDialog(false);
    }, []);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNuevoCliente((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }, []);

    const handleGuardar = useCallback(() => {
        // Antes de guardar, se valida el formulario
        if (!isFormValid) return;
        const fechaActual = new Date().toISOString().split('T')[0];

        if (clienteEditando) {
            // Actualización de cliente existente
            setClientes((prevClientes) =>
                prevClientes.map((cliente) =>
                    cliente.id === clienteEditando.id
                        ? { ...cliente, ...nuevoCliente }
                        : cliente
                )
            );
        } else {
            // Crear nuevo cliente
            const id = `cl-${Date.now().toString(36)}`;
            setClientes((prevClientes) => [
                ...prevClientes,
                {
                    id,
                    ...nuevoCliente,
                    fechaRegistro: fechaActual,
                    equipos: 0,
                    reparaciones: 0
                }
            ]);
        }
        handleCloseDialog();
    }, [clienteEditando, isFormValid, nuevoCliente, handleCloseDialog]);

    const handleEliminar = useCallback((id: string) => {
        setClientes((prevClientes) => prevClientes.filter((cliente) => cliente.id !== id));
    }, []);

    const clientesFiltrados = useMemo(() => {
        return clientes.filter((cliente) =>
            cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            cliente.correo.toLowerCase().includes(busqueda.toLowerCase()) ||
            cliente.telefono.includes(busqueda) ||
            cliente.direccion.toLowerCase().includes(busqueda.toLowerCase())
        );
    }, [busqueda, clientes]);

    return (
        <Box sx={{ padding: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Clientes
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                >
                    Nuevo Cliente
                </Button>
            </Box>
            <Paper sx={{ p: 2, mb: 3 }}>
                <Box display="flex" alignItems="center">
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Buscar clientes..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>
            </Paper>
            <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
                <Tab label="Vista de Tabla" />
                <Tab label="Vista de Tarjetas" />
            </Tabs>

            {tabValue === 0 ? (
                <TableContainer component={Paper} elevation={2}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: theme.palette.primary.dark }}>
                                <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>Nombre</TableCell>
                                <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>Correo</TableCell>
                                <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>Teléfono</TableCell>
                                <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }}>Dirección</TableCell>
                                <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }} align="center">
                                    Equipos
                                </TableCell>
                                <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }} align="center">
                                    Reparaciones
                                </TableCell>
                                <TableCell sx={{ color: theme.palette.common.white, fontWeight: 'bold' }} align="center">
                                    Acciones
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clientesFiltrados.map((cliente) => (
                                <TableRow
                                    key={cliente.id}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'action.hover'
                                        }
                                    }}
                                >
                                    <TableCell>{cliente.nombre}</TableCell>
                                    <TableCell>{cliente.correo}</TableCell>
                                    <TableCell>{cliente.telefono}</TableCell>
                                    <TableCell>{cliente.direccion}</TableCell>
                                    <TableCell align="center">
                                        <Chip label={cliente.equipos} size="small" color="primary" variant="outlined" />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip label={cliente.reparaciones} size="small" color="secondary" variant="outlined" />
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton size="small" color="primary" onClick={() => handleOpenDialog(cliente)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton size="small" color="error" onClick={() => handleEliminar(cliente.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 3,
                    mb: 4
                }}>
                    {clientesFiltrados.map((cliente) => (
                        <Box key={cliente.id} sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Paper elevation={3} sx={{
                                p: 3,
                                borderRadius: 2,
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: 6
                                }
                            }}>
                                <Box display="flex" alignItems="center" mb={2}>
                                    <Avatar sx={{
                                        bgcolor: 'primary.main',
                                        width: 56,
                                        height: 56,
                                        mr: 2
                                    }}>
                                        {cliente.nombre.charAt(0)}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h6">{cliente.nombre}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Cliente desde {new Date(cliente.fechaRegistro).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                                    <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                    <Typography variant="body2">{cliente.correo}</Typography>
                                </Box>
                                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                                    <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                    <Typography variant="body2">{cliente.telefono}</Typography>
                                </Box>
                                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                    <PersonIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                    <Typography variant="body2">{cliente.direccion}</Typography>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    gap: 2,
                                    mt: 2,
                                    mb: 2
                                }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Box display="flex" flexDirection="column" alignItems="center">
                                            <Box display="flex" alignItems="center" mb={0.5}>
                                                <BuildIcon fontSize="small" sx={{ mr: 0.5, color: 'primary.main' }} />
                                                <Typography variant="subtitle2">Equipos registrados</Typography>
                                            </Box>
                                            <Typography variant="h5" fontWeight="bold" color="primary.main">
                                                {cliente.equipos}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box display="flex" flexDirection="column" alignItems="center">
                                            <Box display="flex" alignItems="center" mb={0.5}>
                                                <HistoryIcon fontSize="small" sx={{ mr: 0.5, color: 'secondary.main' }} />
                                                <Typography variant="subtitle2">Reparaciones</Typography>
                                            </Box>
                                            <Typography variant="h5" fontWeight="bold" color="secondary.main">
                                                {cliente.reparaciones}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box display="flex" justifyContent="flex-end" mt={2}>
                                    <IconButton size="small" color="primary" onClick={() => handleOpenDialog(cliente)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton size="small" color="error" onClick={() => handleEliminar(cliente.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Paper>
                        </Box>
                    ))}
                </Box>
            )}

            {/* Diálogo para crear/editar cliente */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle>
                    {clienteEditando ? 'Editar Cliente' : 'Nuevo Cliente'}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            fullWidth
                            label="Nombre completo"
                            name="nombre"
                            value={nuevoCliente.nombre}
                            onChange={handleInputChange}
                            error={Boolean(errores.nombre)}
                            helperText={errores.nombre}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: theme.palette.primary.main,
                                        borderWidth: '2px'
                                    }
                                }
                            }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                            <TextField
                                fullWidth
                                label="Correo electrónico"
                                name="correo"
                                type="email"
                                value={nuevoCliente.correo}
                                onChange={handleInputChange}
                                error={Boolean(errores.correo)}
                                helperText={errores.correo}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: theme.palette.primary.main,
                                            borderWidth: '2px'
                                        }
                                    }
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Teléfono (formato: 555-123-4567)"
                                name="telefono"
                                value={nuevoCliente.telefono}
                                onChange={handleInputChange}
                                error={Boolean(errores.telefono)}
                                helperText={errores.telefono}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: theme.palette.primary.main,
                                            borderWidth: '2px'
                                        }
                                    }
                                }}
                            />
                        </Box>
                        <TextField
                            fullWidth
                            label="Dirección"
                            name="direccion"
                            value={nuevoCliente.direccion}
                            onChange={handleInputChange}
                            error={Boolean(errores.direccion)}
                            helperText={errores.direccion}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: theme.palette.primary.main,
                                        borderWidth: '2px'
                                    }
                                }
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleGuardar} variant="contained" color="primary" disabled={!isFormValid}>
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ClientesPage;