import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography, 
  Paper, 
  MenuItem, 
  Snackbar,
  Alert,
  InputAdornment,
  Stack
} from '@mui/material';
import { useRepairs } from '../contexts/RepairsContext';
import { NewRepairFormData, DeviceType } from '../types/repair';
import { useTheme } from '@mui/material/styles';

const deviceTypeOptions: { value: DeviceType; label: string }[] = [
  { value: 'smartphone', label: 'Smartphone' },
  { value: 'tablet', label: 'Tablet' },
  { value: 'computadora', label: 'Computadora' },
  { value: 'televisor', label: 'Televisor' },
  { value: 'electrodoméstico', label: 'Electrodoméstico' },
  { value: 'otro', label: 'Otro' }
];

const RepairFormPage = () => {
  const [formData, setFormData] = useState<NewRepairFormData>({
    clientName: '',
    email: '',
    phone: '',
    deviceType: 'smartphone',
    brand: '',
    model: '',
    problemDescription: '',
    estimatedCost: undefined,
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newRepairId, setNewRepairId] = useState<string | null>(null);
  
  const { addRepair } = useRepairs();
  const navigate = useNavigate();
  const theme = useTheme();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.clientName.trim()) {
      newErrors.clientName = 'El nombre del cliente es obligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Introduce un correo electrónico válido';
    }
    
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Introduce un número de teléfono válido (10 dígitos)';
    }
    
    if (!formData.problemDescription.trim()) {
      newErrors.problemDescription = 'La descripción del problema es obligatoria';
    } else if (formData.problemDescription.trim().length < 10) {
      newErrors.problemDescription = 'La descripción debe tener al menos 10 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Para el campo de costo estimado, convertimos a número
    if (name === 'estimatedCost') {
      setFormData(prev => ({ 
        ...prev, 
        [name]: value ? parseFloat(value) : undefined 
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Eliminar el error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Añadir la nueva reparación
      const newRepairId = addRepair(formData);
      
      // Guardar el ID de la nueva reparación
      setNewRepairId(newRepairId);
      
      // Mostrar notificación de éxito
      setOpenSnackbar(true);
      
      // Resetear el formulario
      setFormData({
        clientName: '',
        email: '',
        phone: '',
        deviceType: 'smartphone',
        brand: '',
        model: '',
        problemDescription: '',
        estimatedCost: undefined,
        notes: ''
      });
      
    } catch (error) {
      console.error('Error al guardar la reparación:', error);
      setErrors({ submit: 'Ocurrió un error al guardar la solicitud. Inténtalo nuevamente.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleViewRepair = () => {
    if (newRepairId) {
      navigate(`/reparaciones/${newRepairId}`);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Nueva Solicitud de Reparación
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          {errors.submit && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {errors.submit}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Typography variant="h6" color="primary" sx={{ borderBottom: `2px solid ${theme.palette.primary.main}`, pb: 1, mb: 2 }}>
                Datos del Cliente
              </Typography>
            
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  required
                  fullWidth
                  id="clientName"
                  name="clientName"
                  label="Nombre del Cliente"
                  placeholder="Nombre completo"
                  value={formData.clientName}
                  onChange={handleChange}
                  error={!!errors.clientName}
                  helperText={errors.clientName}
                  InputProps={{
                    sx: { backgroundColor: '#fefefe' }
                  }}
                />
                
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Correo Electrónico"
                  type="email"
                  placeholder="ejemplo@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    sx: { backgroundColor: '#fefefe' }
                  }}
                />
              </Stack>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Teléfono"
                  placeholder="10 dígitos"
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone || "Formato: 10 dígitos sin espacios"}
                  InputProps={{
                    sx: { backgroundColor: '#fefefe' }
                  }}
                />
              </Stack>

              <Typography variant="h6" color="primary" sx={{ borderBottom: `2px solid ${theme.palette.primary.main}`, pb: 1, mb: 2, mt: 2 }}>
                Datos del Dispositivo
              </Typography>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  required
                  fullWidth
                  select
                  id="deviceType"
                  name="deviceType"
                  label="Tipo de Dispositivo"
                  value={formData.deviceType}
                  onChange={handleChange}
                  InputProps={{
                    sx: { backgroundColor: '#fefefe' }
                  }}
                >
                  {deviceTypeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  fullWidth
                  id="brand"
                  name="brand"
                  label="Marca"
                  placeholder="Ej: Samsung, Apple, LG..."
                  value={formData.brand}
                  onChange={handleChange}
                  InputProps={{
                    sx: { backgroundColor: '#fefefe' }
                  }}
                />
              </Stack>
              
              <TextField
                fullWidth
                id="model"
                name="model"
                label="Modelo"
                placeholder="Modelo específico del dispositivo"
                value={formData.model}
                onChange={handleChange}
                InputProps={{
                  sx: { backgroundColor: '#fefefe' }
                }}
              />

              <Typography variant="h6" color="primary" sx={{ borderBottom: `2px solid ${theme.palette.primary.main}`, pb: 1, mb: 2, mt: 2 }}>
                Detalles del Problema
              </Typography>
              
              <TextField
                required
                fullWidth
                multiline
                rows={5}
                id="problemDescription"
                name="problemDescription"
                label="Descripción del Problema"
                placeholder="Describe detalladamente el problema que presenta el dispositivo (síntomas, cuándo comenzó, etc.)"
                value={formData.problemDescription}
                onChange={handleChange}
                error={!!errors.problemDescription}
                helperText={errors.problemDescription || "Proporciona detalles específicos para ayudarnos a diagnosticar correctamente el problema"}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff9f9',
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                  mb: 1
                }}
              />
              
              <Typography variant="caption" color="textSecondary" sx={{ mb: 2 }}>
                Consejo: Incluye información como tiempo que lleva el problema, si ocurrió después de algún evento específico, e intentos previos de solución.
              </Typography>
              
              <TextField
                fullWidth
                id="estimatedCost"
                name="estimatedCost"
                label="Costo Estimado"
                type="number"
                placeholder="0.00"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  sx: { backgroundColor: '#fefefe' }
                }}
                value={formData.estimatedCost || ''}
                onChange={handleChange}
                helperText="Opcional: Estimado inicial del costo de reparación"
              />
              
              <TextField
                fullWidth
                multiline
                rows={3}
                id="notes"
                name="notes"
                label="Notas Adicionales"
                placeholder="Información adicional relevante para la reparación"
                value={formData.notes}
                onChange={handleChange}
                InputProps={{
                  sx: { backgroundColor: '#fefefe' }
                }}
                helperText="Opcional: Comentarios o instrucciones especiales"
              />
              
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2, mb: 2 }}>
                (*) Campos obligatorios
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate('/reparaciones')}
                  sx={{ mt: 2, mr: 2 }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting}
                  sx={{ 
                    mt: 2,
                    px: 4,
                    py: 1,
                    fontWeight: 'bold'
                  }}
                >
                  {submitting ? 'Guardando...' : 'Registrar Reparación'}
                </Button>
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Box>
      
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={handleViewRepair}
            >
              VER DETALLES
            </Button>
          }
        >
          ¡Solicitud de reparación registrada con éxito!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RepairFormPage; 