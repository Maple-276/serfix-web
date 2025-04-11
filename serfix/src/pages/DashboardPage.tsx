import { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
  LinearProgress, 
  Divider,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Chip,
  styled,
  useTheme
} from '@mui/material';
import {
  Build as BuildIcon,
  CheckCircle as CheckCircleIcon,
  NotificationsActive as NotificationsActiveIcon,
  Science as ScienceIcon,
  Paid as PaidIcon,
  DeviceHub as DeviceHubIcon,
  NavigateNext as NavigateNextIcon,
  Phone as PhoneIcon,
  Computer as ComputerIcon,
  Tv as TvIcon,
  Devices as DevicesIcon,
  CalendarToday as CalendarTodayIcon,
  Timeline as TimelineIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useRepairs } from '../contexts/RepairsContext';
import { RepairStatus, DeviceType } from '../types/repair';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '16px',
  transition: 'transform 0.3s, box-shadow 0.3s',
  background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.05)',
  border: '1px solid rgba(0, 0, 0, 0.05)',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
  },
}));

const MetricCard = styled(StyledCard)(({ theme }) => ({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '6px',
    height: '100%',
    background: '#d32f2f',
    borderTopLeftRadius: '16px',
    borderBottomLeftRadius: '16px',
  },
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 700,
  color: '#333',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const MetricTitle = styled(Typography)(({ theme }) => ({
  color: '#666',
  fontSize: '0.875rem',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}));

const ProgressWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  textTransform: 'none',
  boxShadow: 'none',
  fontWeight: 600,
  padding: '8px 16px',
  background: '#d32f2f',
  '&:hover': {
    background: '#b71c1c',
    boxShadow: '0 4px 8px rgba(211, 47, 47, 0.3)',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  background: 'rgba(211, 47, 47, 0.1)',
  color: '#d32f2f',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  position: 'relative',
  paddingLeft: theme.spacing(1.5),
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '50%',
    width: '4px',
    height: '60%',
    background: '#d32f2f',
    transform: 'translateY(-50%)',
    borderRadius: '4px',
  },
}));

const DeviceTypeChip = styled(Chip)(({ theme }) => ({
  borderRadius: '16px',
  fontWeight: 500,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
}));

const getStatusColor = (status: RepairStatus) => {
  switch (status) {
    case 'pendiente':
      return '#f57c00';
    case 'en_progreso':
      return '#2196f3';
    case 'completada':
      return '#4caf50';
    case 'cancelada':
      return '#f44336';
    default:
      return '#9e9e9e';
  }
};

const getStatusName = (status: RepairStatus) => {
  switch (status) {
    case 'pendiente':
      return 'Pendiente';
    case 'en_progreso':
      return 'En progreso';
    case 'completada':
      return 'Completada';
    case 'cancelada':
      return 'Cancelada';
    default:
      return status;
  }
};

const getDeviceIcon = (deviceType: DeviceType) => {
  switch (deviceType) {
    case 'smartphone':
      return <PhoneIcon />;
    case 'computadora':
      return <ComputerIcon />;
    case 'tablet':
      return <DevicesIcon />;
    case 'televisor':
      return <TvIcon />;
    default:
      return <DeviceHubIcon />;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
};

const DashboardPage = () => {
  const { getRepairs } = useRepairs();
  const navigate = useNavigate();
  const repairs = getRepairs();
  const theme = useTheme();
  
  // Filtros por estado
  const pendingRepairs = repairs.filter(repair => repair.status === 'pendiente');
  const inProgressRepairs = repairs.filter(repair => repair.status === 'en_progreso');
  const completedRepairs = repairs.filter(repair => repair.status === 'completada');
  
  // Últimas 5 reparaciones
  const recentRepairs = [...repairs].sort((a, b) => 
    new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime()
  ).slice(0, 5);
  
  // Próximas a completar (en progreso)
  const upcomingCompletions = [...inProgressRepairs].slice(0, 5);
  
  // Análisis por tipo de dispositivo
  const deviceTypes = repairs.reduce((acc, repair) => {
    acc[repair.deviceType] = (acc[repair.deviceType] || 0) + 1;
    return acc;
  }, {} as Record<DeviceType, number>);
  
  // Porcentaje de completitud
  const completionRate = repairs.length > 0 
    ? Math.round((completedRepairs.length / repairs.length) * 100) 
    : 0;
  
  // Ingresos estimados (de reparaciones completadas)
  const totalRevenue = completedRepairs.reduce((acc, repair) => 
    acc + (repair.estimatedCost || 0), 0
  );
  
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Bienvenido al panel de control de SerFix
        </Typography>
      </Box>
      
      {/* Tarjetas de métricas principales */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <Box sx={{ flex: '1 1 calc(25% - 24px)', minWidth: 240 }}>
          <MetricCard>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <MetricTitle color="textSecondary">
                  Reparaciones Pendientes
                </MetricTitle>
                <StyledAvatar>
                  <BuildIcon />
                </StyledAvatar>
              </Box>
              <MetricValue>
                {pendingRepairs.length}
              </MetricValue>
              <Divider />
              <Box sx={{ mt: 2 }}>
                <ActionButton 
                  variant="contained" 
                  size="small" 
                  endIcon={<NavigateNextIcon />}
                  onClick={() => navigate('/reparaciones')}
                >
                  Ver pendientes
                </ActionButton>
              </Box>
            </CardContent>
          </MetricCard>
        </Box>

        <Box sx={{ flex: '1 1 calc(25% - 24px)', minWidth: 240 }}>
          <MetricCard>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <MetricTitle color="textSecondary">
                  En Progreso
                </MetricTitle>
                <StyledAvatar>
                  <ScienceIcon />
                </StyledAvatar>
              </Box>
              <MetricValue>
                {inProgressRepairs.length}
              </MetricValue>
              <Divider />
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  {inProgressRepairs.length > 0 ? `${Math.round((inProgressRepairs.length / repairs.length) * 100)}% del total` : 'Sin reparaciones en progreso'}
                </Typography>
              </Box>
            </CardContent>
          </MetricCard>
        </Box>

        <Box sx={{ flex: '1 1 calc(25% - 24px)', minWidth: 240 }}>
          <MetricCard>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <MetricTitle color="textSecondary">
                  Completadas
                </MetricTitle>
                <StyledAvatar>
                  <CheckCircleIcon />
                </StyledAvatar>
              </Box>
              <MetricValue>
                {completedRepairs.length}
              </MetricValue>
              <ProgressWrapper>
                <LinearProgress 
                  variant="determinate" 
                  value={completionRate} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: 'rgba(211, 47, 47, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#d32f2f',
                    }
                  }} 
                />
              </ProgressWrapper>
              <Typography variant="caption" color="text.secondary">
                {completionRate}% tasa de finalización
              </Typography>
            </CardContent>
          </MetricCard>
        </Box>

        <Box sx={{ flex: '1 1 calc(25% - 24px)', minWidth: 240 }}>
          <MetricCard>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <MetricTitle color="textSecondary">
                  Ingresos Estimados
                </MetricTitle>
                <StyledAvatar>
                  <PaidIcon />
                </StyledAvatar>
              </Box>
              <MetricValue>
                ${totalRevenue.toLocaleString()}
              </MetricValue>
              <Divider />
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                <Chip 
                  label={`${completedRepairs.length} reparaciones facturadas`} 
                  size="small" 
                  sx={{ 
                    background: 'rgba(76, 175, 80, 0.1)', 
                    color: '#4caf50',
                    fontWeight: 600
                  }} 
                />
              </Box>
            </CardContent>
          </MetricCard>
        </Box>
      </Box>

      {/* Secciones principales */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {/* Últimas reparaciones */}
        <Box sx={{ flex: '1 1 58%', minWidth: 500 }}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <SectionTitle variant="h6">
                  Últimas reparaciones
                </SectionTitle>
                <Button 
                  size="small" 
                  endIcon={<NavigateNextIcon />}
                  onClick={() => navigate('/reparaciones')}
                  sx={{ color: '#d32f2f' }}
                >
                  Ver todas
                </Button>
              </Box>
              <List sx={{ width: '100%' }}>
                {recentRepairs.length > 0 ? (
                  recentRepairs.map((repair) => (
                    <Box key={repair.id} sx={{ mb: 1 }}>
                      <ListItem 
                        secondaryAction={
                          <IconButton edge="end" onClick={() => navigate(`/reparaciones/${repair.id}`)}>
                            <NavigateNextIcon />
                          </IconButton>
                        }
                        sx={{ 
                          border: '1px solid rgba(0, 0, 0, 0.05)',
                          borderRadius: '8px',
                          mb: 1,
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.01)'
                          }
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'rgba(211, 47, 47, 0.1)', color: '#d32f2f' }}>
                            {getDeviceIcon(repair.deviceType)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography sx={{ fontWeight: 600 }}>
                                {repair.clientName}
                              </Typography>
                              <Chip 
                                label={getStatusName(repair.status)} 
                                size="small" 
                                sx={{ 
                                  ml: 1, 
                                  backgroundColor: `${getStatusColor(repair.status)}15`, 
                                  color: getStatusColor(repair.status),
                                  fontWeight: 600,
                                  fontSize: '0.7rem'
                                }} 
                              />
                            </Box>
                          }
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                                <DeviceHubIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5, fontSize: '0.875rem' }} />
                                <Typography variant="body2" color="text.secondary">
                                  {repair.deviceType}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CalendarTodayIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5, fontSize: '0.875rem' }} />
                                <Typography variant="body2" color="text.secondary">
                                  {formatDate(repair.entryDate)}
                                </Typography>
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
                    No hay reparaciones recientes
                  </Typography>
                )}
              </List>
              {repairs.length > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <ActionButton 
                    variant="contained" 
                    onClick={() => navigate('/reparaciones/nueva')}
                    startIcon={<BuildIcon />}
                  >
                    Nueva reparación
                  </ActionButton>
                </Box>
              )}
            </CardContent>
          </StyledCard>
        </Box>

        {/* Estadísticas y Distribución */}
        <Box sx={{ flex: '1 1 38%', minWidth: 300, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <StyledCard>
              <CardContent>
                <SectionTitle variant="h6">
                  Distribución por dispositivo
                </SectionTitle>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                  {Object.entries(deviceTypes).map(([type, count]) => (
                    <DeviceTypeChip 
                      key={type}
                      icon={getDeviceIcon(type as DeviceType)}
                      label={`${type} (${count})`}
                      sx={{ 
                        backgroundColor: 'rgba(211, 47, 47, 0.1)',
                        color: '#d32f2f',
                        border: '1px solid rgba(211, 47, 47, 0.2)',
                        '& .MuiChip-icon': {
                          color: '#d32f2f'
                        }
                      }}
                    />
                  ))}
                  
                  {Object.keys(deviceTypes).length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ py: 2, width: '100%', textAlign: 'center' }}>
                      No hay datos disponibles
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </StyledCard>
          </Box>

          <Box>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <SectionTitle variant="h6">
                    Próximas a completar
                  </SectionTitle>
                  <Chip 
                    icon={<TimelineIcon fontSize="small" />}
                    label="En progreso" 
                    size="small"
                    sx={{ 
                      backgroundColor: 'rgba(33, 150, 243, 0.1)', 
                      color: '#2196f3',
                      '& .MuiChip-icon': {
                        color: '#2196f3'
                      }
                    }}
                  />
                </Box>
                
                {upcomingCompletions.length > 0 ? (
                  <List sx={{ width: '100%' }}>
                    {upcomingCompletions.map((repair) => (
                      <ListItem 
                        key={repair.id}
                        sx={{ 
                          px: 2, 
                          py: 1, 
                          borderRadius: '8px',
                          border: '1px solid rgba(0, 0, 0, 0.05)',
                          mb: 1,
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.01)'
                          }
                        }}
                        secondaryAction={
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#d32f2f' }}>
                            ${repair.estimatedCost || 0}
                          </Typography>
                        }
                      >
                        <ListItemText
                          primary={repair.clientName}
                          secondary={repair.deviceType}
                          primaryTypographyProps={{
                            fontWeight: 600,
                            variant: 'body2'
                          }}
                          secondaryTypographyProps={{
                            variant: 'caption'
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
                    No hay reparaciones en progreso
                  </Typography>
                )}
              </CardContent>
            </StyledCard>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage; 