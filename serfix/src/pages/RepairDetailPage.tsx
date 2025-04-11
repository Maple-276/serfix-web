import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Alert, 
  Box, 
  Button, 
  Chip, 
  Container, 
  Divider, 
  Grid, 
  Paper, 
  Typography,
  Avatar,
  Fade,
  IconButton,
  Tooltip,
  LinearProgress,
  Card,
  CardContent,
  Skeleton,
  Tab,
  Tabs,
  Breadcrumbs,
  Stack,
  useMediaQuery
} from '@mui/material';
import { styled, useTheme, alpha } from '@mui/material/styles';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  DevicesOther as DeviceIcon,
  Description as DescriptionIcon,
  Notes as NotesIcon,
  ArrowBack as ArrowBackIcon,
  List as ListIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CompletedIcon,
  Pending as PendingIcon,
  Engineering as InProgressIcon,
  Cancel as CancelIcon,
  Smartphone as SmartphoneIcon,
  Tablet as TabletIcon,
  Computer as ComputerIcon,
  Tv as TvIcon,
  HomeRepairService as ApplianceIcon,
  QuestionMark as OtherIcon,
  Edit as EditIcon,
  AttachMoney as MoneyIcon,
  ReceiptLong as ReceiptIcon,
  QrCode as QrCodeIcon
} from '@mui/icons-material';
import { useRepairs } from '../contexts/RepairsContext';
import { RepairRequest, RepairStatus, DeviceType } from '../types/repair';

// Componentes estilizados
const DetailHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

const DetailCard = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)',
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    boxShadow: '0 10px 24px rgba(0, 0, 0, 0.08)',
  },
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  borderRadius: 20,
  fontWeight: 600,
  padding: '0 12px',
  height: 32,
  '& .MuiChip-icon': {
    marginLeft: 8,
  },
  '& .MuiChip-label': {
    padding: '0 12px 0 8px',
  },
}));

const SectionBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  height: '100%',
  boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.08)}`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 12px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
  }
}));

const SectionTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  paddingBottom: theme.spacing(1.5),
  borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  '& .MuiTypography-root': {
    fontWeight: 600,
    fontSize: '1.1rem',
  }
}));

const InfoLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  color: theme.palette.text.secondary,
  fontWeight: 600,
  marginBottom: theme.spacing(0.5),
  letterSpacing: '0.5px',
}));

const InfoValue = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  color: theme.palette.text.primary,
  fontWeight: 500,
}));

const DetailBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiBreadcrumbs-separator': {
    margin: theme.spacing(0, 1),
  },
  '& a': {
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  textTransform: 'none',
  fontWeight: 600,
  padding: '10px 20px',
  boxShadow: 'none',
  '&.MuiButton-contained': {
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
    '&:hover': {
      boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.25)}`,
    },
  },
}));

const HeaderChip = styled(Chip)(({ theme }) => ({
  borderRadius: 12,
  fontWeight: 600,
  padding: '0 8px',
  boxShadow: `0 2px 6px ${alpha(theme.palette.primary.main, 0.15)}`,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  border: 'none',
}));

const IdChip = styled(Box)(({ theme }) => ({
  borderRadius: 6,
  backgroundColor: alpha(theme.palette.secondary.main, 0.08),
  color: theme.palette.secondary.main,
  padding: theme.spacing(0.5, 1),
  fontSize: '0.8rem',
  fontWeight: 500,
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  fontFamily: '"Roboto Mono", monospace',
  '& svg': {
    fontSize: '0.85rem',
  },
}));

// Funciones auxiliares
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatShortDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const getStatusColor = (status: RepairStatus): 'primary' | 'success' | 'error' | 'warning' | 'info' => {
  switch (status) {
    case 'pendiente':
      return 'warning';
    case 'en_progreso':
      return 'primary';
    case 'completada':
      return 'success';
    case 'cancelada':
      return 'error';
    default:
      return 'info';
  }
};

const getStatusIcon = (status: RepairStatus) => {
  switch (status) {
    case 'pendiente':
      return <PendingIcon fontSize="small" />;
    case 'en_progreso':
      return <InProgressIcon fontSize="small" />;
    case 'completada':
      return <CompletedIcon fontSize="small" />;
    case 'cancelada':
      return <CancelIcon fontSize="small" />;
    default:
      return <PendingIcon fontSize="small" />;
  }
};

const getStatusLabel = (status: RepairStatus): string => {
  switch (status) {
    case 'pendiente':
      return 'Pendiente';
    case 'en_progreso':
      return 'En Progreso';
    case 'completada':
      return 'Completada';
    case 'cancelada':
      return 'Cancelada';
    default:
      return status;
  }
};

const getStatusDescription = (status: RepairStatus): string => {
  switch (status) {
    case 'pendiente':
      return 'Esta reparación está pendiente de inicio. Aún no ha sido asignada a un técnico.';
    case 'en_progreso':
      return 'Esta reparación está siendo trabajada por nuestro equipo técnico.';
    case 'completada':
      return 'Esta reparación ha sido completada exitosamente.';
    case 'cancelada':
      return 'Esta reparación ha sido cancelada.';
    default:
      return '';
  }
};

const getDeviceTypeIcon = (type: DeviceType) => {
  switch (type) {
    case 'smartphone':
      return <SmartphoneIcon />;
    case 'tablet':
      return <TabletIcon />;
    case 'computadora':
      return <ComputerIcon />;
    case 'televisor':
      return <TvIcon />;
    case 'electrodoméstico':
      return <ApplianceIcon />;
    default:
      return <OtherIcon />;
  }
};

const getDeviceTypeLabel = (type: string): string => {
  const types: Record<string, string> = {
    'smartphone': 'Smartphone',
    'tablet': 'Tablet',
    'computadora': 'Computadora',
    'televisor': 'Televisor',
    'electrodoméstico': 'Electrodoméstico',
    'otro': 'Otro'
  };
  
  return types[type] || type;
};

const getProgressPercentage = (status: RepairStatus): number => {
  switch (status) {
    case 'pendiente':
      return 25;
    case 'en_progreso':
      return 65;
    case 'completada':
      return 100;
    case 'cancelada':
      return 100;
    default:
      return 0;
  }
};

const RepairDetailPage = () => {
  const { repairId } = useParams<{ repairId: string }>();
  const { getRepairById } = useRepairs();
  const [repair, setRepair] = useState<RepairRequest | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  useEffect(() => {
    const fetchRepair = async () => {
      setIsLoading(true);
      
    if (repairId) {
        try {
          // Simular una carga para mejor UX
          await new Promise(resolve => setTimeout(resolve, 500));
          
      const foundRepair = getRepairById(repairId);
      if (foundRepair) {
        setRepair(foundRepair);
            setError(null);
      } else {
            setError('No se encontró la reparación con el ID especificado');
            setRepair(null);
          }
        } catch (err) {
          setError('Error al cargar los detalles de la reparación');
          setRepair(null);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchRepair();
  }, [repairId, getRepairById]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
        <DetailBreadcrumbs aria-label="breadcrumb">
          <Link to="/dashboard">Inicio</Link>
          <Link to="/reparaciones">Reparaciones</Link>
          <Typography color="text.primary">Detalle</Typography>
        </DetailBreadcrumbs>
        
        <Alert 
          severity="error" 
          sx={{ 
            borderRadius: 2, 
            mb: 3,
            boxShadow: theme.shadows[2]
          }}
        >
          {error}
        </Alert>
        
        <StyledButton 
          variant="contained" 
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIcon />}
        >
            Volver
        </StyledButton>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
        <DetailBreadcrumbs aria-label="breadcrumb">
          <Link to="/dashboard">Inicio</Link>
          <Link to="/reparaciones">Reparaciones</Link>
          <Typography color="text.primary">Cargando detalles...</Typography>
        </DetailBreadcrumbs>
        
        <DetailHeader>
          <Box>
            <Skeleton variant="text" width={300} height={60} />
            <Skeleton variant="text" width={200} height={24} />
          </Box>
          <Skeleton variant="rounded" width={120} height={40} />
        </DetailHeader>
        
        <DetailCard>
          <LinearProgress />
          <Box sx={{ p: 3 }}>
            <SectionBox>
              <Skeleton variant="text" width={200} height={40} />
              <Box>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' }, 
                  flexWrap: 'wrap', 
                  gap: 3 
                }}>
                  {[1, 2, 3, 4].map((item) => (
                    <Box key={item} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)' } }}>
                      <Skeleton variant="text" width={100} height={20} />
                      <Skeleton variant="text" width={150} height={30} />
                    </Box>
                  ))}
                </Box>
              </Box>
            </SectionBox>
            
            <Divider sx={{ my: 3 }} />
            
            <SectionBox>
              <Skeleton variant="text" width={200} height={40} />
              <Box>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' }, 
                  flexWrap: 'wrap', 
                  gap: 3 
                }}>
                  {[1, 2, 3, 4].map((item) => (
                    <Box key={item} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)' } }}>
                      <Skeleton variant="text" width={100} height={20} />
                      <Skeleton variant="text" width={150} height={30} />
                    </Box>
                  ))}
                </Box>
              </Box>
            </SectionBox>
          </Box>
        </DetailCard>
      </Container>
    );
  }

  if (!repair) {
    return null; // No debería llegar aquí, pero por si acaso
  }

  const progress = getProgressPercentage(repair.status);
  const statusColor = getStatusColor(repair.status);
  const statusIcon = getStatusIcon(repair.status);
  const statusLabel = getStatusLabel(repair.status);
  const statusDescription = getStatusDescription(repair.status);
  const formattedDate = formatDate(repair.entryDate);
  const formattedCompletionDate = repair.completionDate ? formatDate(repair.completionDate) : null;
  const deviceIcon = getDeviceTypeIcon(repair.deviceType);
  const deviceLabel = getDeviceTypeLabel(repair.deviceType);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <DetailBreadcrumbs aria-label="breadcrumb">
        <Link to="/dashboard">Inicio</Link>
        <Link to="/reparaciones">Reparaciones</Link>
        <Typography color="text.primary">Detalle de Reparación</Typography>
      </DetailBreadcrumbs>
      
      <DetailHeader>
        <Box>
          <Typography 
            variant="h4" 
            component="h1" 
            fontWeight="bold" 
            gutterBottom
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 1 
            }}
          >
            Reparación {isSmallScreen && <br />}
            <IdChip sx={{ ml: isSmallScreen ? 0 : 1 }}>
              <QrCodeIcon />
              {repair.id.substring(0, 8)}
            </IdChip>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            <CalendarIcon fontSize="small" />
            Ingresado el {formatShortDate(repair.entryDate)}
              </Typography>
        </Box>
        
        <StatusChip 
          label={statusLabel}
          color={statusColor}
          icon={statusIcon}
          sx={{ 
            px: 1,
            fontWeight: 600,
            height: 36
          }}
        />
      </DetailHeader>
      
      <Card 
        sx={{ 
          mb: 4, 
          borderRadius: 2,
          backgroundColor: alpha(theme.palette[statusColor].light, 0.05),
          border: `1px solid ${alpha(theme.palette[statusColor].main, 0.1)}`,
          boxShadow: 'none'
        }}
      >
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            sx={{ 
              bgcolor: alpha(theme.palette[statusColor].main, 0.1),
              color: theme.palette[statusColor].main,
              width: 40,
              height: 40
            }}
          >
            {statusIcon}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Estado: {statusLabel}
          </Typography>
              <Typography variant="body2" color="text.secondary">
              {statusDescription}
              </Typography>
          </Box>
        </CardContent>
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          color={statusColor}
          sx={{ 
            height: 6,
            borderBottomLeftRadius: theme.shape.borderRadius,
            borderBottomRightRadius: theme.shape.borderRadius,
          }}
        />
      </Card>
      
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant={isSmallScreen ? "scrollable" : "standard"}
          scrollButtons={isSmallScreen ? "auto" : undefined}
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              minWidth: 'auto',
              fontWeight: 600,
              px: 2,
            },
          }}
        >
          <Tab label="Detalles" icon={<DescriptionIcon />} iconPosition="start" />
          <Tab label="Cliente" icon={<PersonIcon />} iconPosition="start" />
          <Tab label="Dispositivo" icon={<DeviceIcon />} iconPosition="start" />
        </Tabs>
      </Box>
      
      <DetailCard>
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          {/* Pestaña de Detalles */}
          {tabValue === 0 && (
            <Fade in={tabValue === 0}>
              <Box>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', md: 'row' }, 
                  gap: 3 
                }}>
                  <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
                    <SectionBox>
                      <SectionTitle>
                        <DescriptionIcon />
                        Información General
                      </SectionTitle>
                      <Stack spacing={2}>
                        <Box>
                          <InfoLabel>Estado</InfoLabel>
                          <Chip 
                            label={statusLabel}
                            color={statusColor}
                            size="small"
                            icon={statusIcon}
                          />
                        </Box>
                        
                        <Box>
                          <InfoLabel>ID de Reparación</InfoLabel>
                          <InfoValue>{repair.id}</InfoValue>
                        </Box>
                        
                        <Box>
                          <InfoLabel>Fecha de Ingreso</InfoLabel>
                          <InfoValue>{formattedDate}</InfoValue>
                        </Box>
                        
                        {formattedCompletionDate && (
                          <Box>
                            <InfoLabel>Fecha de Finalización</InfoLabel>
                            <InfoValue>{formattedCompletionDate}</InfoValue>
                          </Box>
                        )}
                      </Stack>
                    </SectionBox>
        </Box>
        
                  <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
                    <SectionBox>
                      <SectionTitle>
                        <DeviceIcon />
                        Dispositivo
                      </SectionTitle>
                      <Stack spacing={2}>
                        <Box>
                          <InfoLabel>Tipo de Dispositivo</InfoLabel>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar 
                              sx={{ 
                                width: 28, 
                                height: 28, 
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: theme.palette.primary.main
                              }}
                            >
                              {deviceIcon}
                            </Avatar>
                            <InfoValue>{deviceLabel}</InfoValue>
                          </Box>
                        </Box>
            
            {repair.brand && (
                          <Box>
                            <InfoLabel>Marca</InfoLabel>
                            <InfoValue>{repair.brand}</InfoValue>
                          </Box>
            )}
            
            {repair.model && (
                          <Box>
                            <InfoLabel>Modelo</InfoLabel>
                            <InfoValue>{repair.model}</InfoValue>
                          </Box>
                        )}
                      </Stack>
                    </SectionBox>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 4 }} />
                
                <SectionBox>
                  <SectionTitle>
                    <DescriptionIcon />
                    Descripción del Problema
                  </SectionTitle>
                  <Typography variant="body1" sx={{ 
                    whiteSpace: 'pre-wrap',
                    p: 2,
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.background.default, 0.5),
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  }}>
                    {repair.problemDescription}
                </Typography>
                </SectionBox>
                
                {repair.notes && (
                  <SectionBox>
                    <SectionTitle>
                      <NotesIcon />
                      Notas Adicionales
                    </SectionTitle>
                    <Typography variant="body1" sx={{ 
                      whiteSpace: 'pre-wrap',
                      p: 2,
                      borderRadius: 1,
                      bgcolor: alpha(theme.palette.background.default, 0.5),
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    }}>
                      {repair.notes}
                </Typography>
                  </SectionBox>
            )}
            
            {repair.estimatedCost !== undefined && (
                  <SectionBox>
                    <SectionTitle>
                      <MoneyIcon />
                      Información de Costos
                    </SectionTitle>
                    <Card 
                      sx={{ 
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.success.light, 0.05),
                        border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`, 
                        boxShadow: 'none'
                      }}
                    >
                      <CardContent>
                        <Box sx={{ 
                          display: 'flex', 
                          flexDirection: { xs: 'column', sm: 'row' }, 
                          flexWrap: 'wrap', 
                          gap: 2 
                        }}>
                          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' } }}>
                            <InfoLabel>Costo Estimado</InfoLabel>
                            <Typography variant="h5" color="primary" fontWeight="bold">
                  ${repair.estimatedCost.toFixed(2)}
                </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </SectionBox>
                )}
              </Box>
            </Fade>
          )}
          
          {/* Pestaña de Cliente */}
          {tabValue === 1 && (
            <Fade in={tabValue === 1}>
              <Box>
                <SectionBox>
                  <SectionTitle>
                    <PersonIcon />
                    Información del Cliente
                  </SectionTitle>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' }, 
                    flexWrap: 'wrap', 
                    gap: 3 
                  }}>
                    <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)' } }}>
                      <Box>
                        <InfoLabel>Nombre</InfoLabel>
                        <InfoValue>{repair.clientName}</InfoValue>
                      </Box>
                    </Box>
                    
                    <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)' } }}>
                      <Box>
                        <InfoLabel>Email</InfoLabel>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <EmailIcon fontSize="small" color="action" />
                          <InfoValue>{repair.email}</InfoValue>
                        </Box>
                      </Box>
                    </Box>
                    
                    {repair.phone && (
                      <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)' } }}>
                        <Box>
                          <InfoLabel>Teléfono</InfoLabel>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PhoneIcon fontSize="small" color="action" />
                            <InfoValue>{repair.phone}</InfoValue>
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </SectionBox>
              </Box>
            </Fade>
          )}
          
          {/* Pestaña de Dispositivo */}
          {tabValue === 2 && (
            <Fade in={tabValue === 2}>
              <Box>
                <SectionBox>
                  <SectionTitle>
                    <DeviceIcon />
                    Información del Dispositivo
                  </SectionTitle>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' }, 
                    flexWrap: 'wrap', 
                    gap: 3 
                  }}>
                    <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)' } }}>
                      <Box>
                        <InfoLabel>Tipo de Dispositivo</InfoLabel>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar 
                            sx={{ 
                              width: 28, 
                              height: 28, 
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main
                            }}
                          >
                            {deviceIcon}
                          </Avatar>
                          <InfoValue>{deviceLabel}</InfoValue>
                        </Box>
                      </Box>
        </Box>
        
                    {repair.brand && (
                      <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)' } }}>
                        <Box>
                          <InfoLabel>Marca</InfoLabel>
                          <InfoValue>{repair.brand}</InfoValue>
                        </Box>
                      </Box>
                    )}
                    
                    {repair.model && (
                      <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)' } }}>
                        <Box>
                          <InfoLabel>Modelo</InfoLabel>
                          <InfoValue>{repair.model}</InfoValue>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </SectionBox>
                
                <SectionBox>
                  <SectionTitle>
                    <DescriptionIcon />
            Descripción del Problema
                  </SectionTitle>
                  <Typography variant="body1" sx={{ 
                    whiteSpace: 'pre-wrap',
                    p: 2,
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.background.default, 0.5),
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, 
                  }}>
            {repair.problemDescription}
          </Typography>
                </SectionBox>
              </Box>
            </Fade>
          )}
        </Box>
      </DetailCard>
      
      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <StyledButton 
          variant="outlined" 
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIcon />}
        >
          Volver
        </StyledButton>
        
        <StyledButton 
          variant="outlined" 
          onClick={() => navigate('/reparaciones')}
          startIcon={<ListIcon />}
        >
          Todas las Reparaciones
        </StyledButton>

        <Box sx={{ flexGrow: 1 }} />
        
        <Tooltip title="Editar reparación">
          <StyledButton 
            variant="contained" 
            onClick={() => navigate(`/reparaciones/editar/${repair.id}`)}
            startIcon={<EditIcon />}
          >
            Editar
          </StyledButton>
        </Tooltip>
      </Box>
    </Container>
  );
};

export default RepairDetailPage; 