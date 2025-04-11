import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Tooltip,
  Fade,
  Alert,
  CircularProgress,
  TablePagination,
  Badge,
  Collapse,
  Tabs,
  Tab,
  useMediaQuery,
  TableSortLabel,
  Avatar
} from '@mui/material';
import {
  Add as AddIcon, 
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Phone as PhoneIcon,
  Computer as ComputerIcon,
  Tv as TvIcon,
  PhoneAndroid as TabletIcon,
  Devices as DevicesIcon,
  FormatListBulleted as ListIcon,
  GridView as GridIcon,
  CheckCircle as CheckCircleIcon,
  HighlightOff as CancelIcon,
  DoNotDisturb as PendingIcon,
  Settings as SettingsIcon,
  Sort as SortIcon,
  CalendarToday as CalendarIcon,
  Money as MoneyIcon
} from '@mui/icons-material';
import { useRepairs } from '../contexts/RepairsContext';
import { RepairRequest, RepairStatus, DeviceType } from '../types/repair';
import { alpha, styled, useTheme } from '@mui/material/styles';

// Componentes estilizados
const HeaderRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: theme.spacing(2),
  },
}));

const SearchField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['box-shadow']),
    '&.Mui-focused': {
      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.25)}`,
    },
  },
}));

const FiltersContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  flexWrap: 'wrap',
  alignItems: 'center',
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: 16,
  fontWeight: 500,
  '&.active': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
    borderColor: alpha(theme.palette.primary.main, 0.3),
  },
}));

const StatusCell = styled(TableCell)(({ theme }) => ({
  minWidth: 120,
}));

const ViewButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.04),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
  },
}));

const RepairCardGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: theme.spacing(2),
  width: '100%',
}));

const RepairCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['transform', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const DeviceTypeCell = styled(TableCell)(({ theme }) => ({
  minWidth: 140,
}));

const NoDataCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(6),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: alpha(theme.palette.background.paper, 0.6),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: 'none',
  border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
}));

// Funciones auxiliares
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const getStatusColor = (status: RepairStatus): 'default' | 'primary' | 'success' | 'error' | 'warning' => {
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
      return 'default';
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

const getStatusIcon = (status: RepairStatus) => {
  switch (status) {
    case 'completada':
      return <CheckCircleIcon fontSize="small" />;
    case 'pendiente':
      return <PendingIcon fontSize="small" />;
    case 'en_progreso':
      return <SettingsIcon fontSize="small" />;
    case 'cancelada':
      return <CancelIcon fontSize="small" />;
    default:
      return <PendingIcon fontSize="small" />;
  }
};

const getDeviceTypeIcon = (deviceType: DeviceType) => {
  switch (deviceType) {
    case 'smartphone':
      return <PhoneIcon />;
    case 'tablet':
      return <TabletIcon />;
    case 'computadora':
      return <ComputerIcon />;
    case 'televisor':
      return <TvIcon />;
    default:
      return <DevicesIcon />;
  }
};

// Ordenamiento de datos
type Order = 'asc' | 'desc';
type OrderBy = 'clientName' | 'deviceType' | 'entryDate' | 'status';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const RepairListPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { getRepairs, isLoading } = useRepairs();
  const [repairs, setRepairs] = useState<RepairRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGridView, setIsGridView] = useState(false);
  const [statusFilter, setStatusFilter] = useState<RepairStatus | 'todas'>('todas');
  const [deviceTypeFilter, setDeviceTypeFilter] = useState<DeviceType | 'todas'>('todas');
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<OrderBy>('entryDate');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRepairId, setSelectedRepairId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  
  const navigate = useNavigate();

  // Cargar reparaciones
  useEffect(() => {
    setRepairs(getRepairs());
  }, [getRepairs]);

  // Filtrado de reparaciones
  const filteredRepairs = useMemo(() => {
    return repairs.filter((repair) => {
      // Filtro por búsqueda
      const matchesSearch = searchQuery === '' || 
        repair.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repair.problemDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repair.brand && repair.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (repair.model && repair.model.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Filtro por estado
      const matchesStatus = statusFilter === 'todas' || repair.status === statusFilter;
      
      // Filtro por tipo de dispositivo
      const matchesDeviceType = deviceTypeFilter === 'todas' || repair.deviceType === deviceTypeFilter;
      
      return matchesSearch && matchesStatus && matchesDeviceType;
    });
  }, [repairs, searchQuery, statusFilter, deviceTypeFilter]);

  // Contadores para el menú de pestañas
  const pendingCount = repairs.filter(repair => repair.status === 'pendiente').length;
  const inProgressCount = repairs.filter(repair => repair.status === 'en_progreso').length;
  const completedCount = repairs.filter(repair => repair.status === 'completada').length;
  const canceledCount = repairs.filter(repair => repair.status === 'cancelada').length;

  // Reparaciones ordenadas y paginadas
  const sortedAndPaginatedRepairs = useMemo(() => {
    const sorted = stableSort(filteredRepairs, getComparator(order, orderBy));
    return sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredRepairs, order, orderBy, page, rowsPerPage]);

  // Manejadores de eventos
  const handleViewDetail = (repairId: string) => {
    navigate(`/reparaciones/${repairId}`);
  };

  const handleNewRepair = () => {
    navigate('/reparaciones/nueva');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, repairId: string) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedRepairId(repairId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedRepairId(null);
  };

  const handleStatusFilterChange = (status: RepairStatus | 'todas') => {
    setStatusFilter(status);
    setPage(0);
  };

  const handleDeviceTypeFilterChange = (deviceType: DeviceType | 'todas') => {
    setDeviceTypeFilter(deviceType);
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const toggleGridView = () => {
    setIsGridView(prev => !prev);
  };

  const toggleShowFilters = () => {
    setShowFilters(prev => !prev);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    
    // Actualizar filtros por estado según la pestaña seleccionada
    switch (newValue) {
      case 0: // Todas
        setStatusFilter('todas');
        break;
      case 1: // Pendientes
        setStatusFilter('pendiente');
        break;
      case 2: // En progreso
        setStatusFilter('en_progreso');
        break;
      case 3: // Completadas
        setStatusFilter('completada');
        break;
    }
    
    setPage(0);
  };

  // Renderizar la página
  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={40} thickness={4} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box 
        sx={{
          p: { xs: 2, md: 3 },
          mb: 4,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.light, 0.1)} 100%)`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box sx={{ flex: { xs: '1 1 100%', md: '7 1 0%' } }}>
            <Typography 
              variant="h4" 
              component="h1" 
              fontWeight="bold" 
              gutterBottom
              sx={{ 
                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              Centro de Reparaciones
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Gestiona todas las solicitudes de reparación de manera eficiente y mantén el control de cada proyecto.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleNewRepair}
              sx={{ 
                py: 1.2, 
                px: 3, 
                fontWeight: 600, 
                borderRadius: 2,
                boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
              }}
        >
          Nueva Reparación
        </Button>
      </Box>
          <Box sx={{ flex: { xs: '1 1 100%', md: '5 1 0%' } }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-end' } }}>
              <Card 
                sx={{ 
                  width: { xs: '45%', sm: 140 }, 
                  height: 110, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, ${alpha(theme.palette.warning.light, 0.15)} 0%, ${alpha(theme.palette.warning.main, 0.15)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                  borderRadius: 3,
                  transition: 'transform 0.3s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}
                onClick={() => handleStatusFilterChange('pendiente')}
              >
                <Typography variant="h4" fontWeight="bold" color="warning.main">{pendingCount}</Typography>
                <Typography variant="body2" color="text.secondary">Pendientes</Typography>
              </Card>
              <Card 
                sx={{ 
                  width: { xs: '45%', sm: 140 }, 
                  height: 110, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.15)} 0%, ${alpha(theme.palette.primary.main, 0.15)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  borderRadius: 3,
                  transition: 'transform 0.3s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}
                onClick={() => handleStatusFilterChange('en_progreso')}
              >
                <Typography variant="h4" fontWeight="bold" color="primary.main">{inProgressCount}</Typography>
                <Typography variant="body2" color="text.secondary">En progreso</Typography>
              </Card>
              <Card 
                sx={{ 
                  width: { xs: '45%', sm: 140 }, 
                  height: 110, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, ${alpha(theme.palette.success.light, 0.15)} 0%, ${alpha(theme.palette.success.main, 0.15)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                  borderRadius: 3,
                  transition: 'transform 0.3s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}
                onClick={() => handleStatusFilterChange('completada')}
              >
                <Typography variant="h4" fontWeight="bold" color="success.main">{completedCount}</Typography>
                <Typography variant="body2" color="text.secondary">Completadas</Typography>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isSmallScreen ? 'column' : 'row',
          justifyContent: 'space-between', 
          gap: 2,
          mb: 3 
        }}>
          <SearchField
            placeholder="Buscar por cliente, dispositivo, problema..."
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            size="small"
            sx={{ 
              width: isSmallScreen ? '100%' : '60%',
              flexGrow: 1,
              '& .MuiOutlinedInput-root': {
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                borderRadius: 2
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Filtros">
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={toggleShowFilters}
                sx={{ 
                  borderRadius: 2,
                  borderColor: showFilters ? theme.palette.primary.main : undefined,
                  color: showFilters ? theme.palette.primary.main : undefined,
                  fontWeight: 600
                }}
                startIcon={<FilterIcon />}
              >
                Filtros
              </Button>
            </Tooltip>
            
            <Tooltip title={isGridView ? "Vista de tabla" : "Vista de cuadrícula"}>
              <Button 
                variant="outlined"
                color="inherit"
                size="small"
                onClick={toggleGridView}
                sx={{ 
                  borderRadius: 2,
                  fontWeight: 600,
                  minWidth: 'auto',
                  px: 1.5
                }}
              >
                {isGridView ? <ListIcon /> : <GridIcon />}
              </Button>
            </Tooltip>
          </Box>
        </Box>
        
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant={isSmallScreen ? "scrollable" : "standard"}
          scrollButtons={isSmallScreen ? "auto" : undefined}
          sx={{ 
            mb: 3,
            '& .MuiTab-root': {
              minWidth: 'auto',
              px: 3,
              borderRadius: 2,
              mx: 0.5,
              fontWeight: 600,
              color: theme.palette.text.secondary,
              '&.Mui-selected': {
                color: theme.palette.primary.main,
              }
            },
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: 2
            }
          }}
        >
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>Todas</span>
                <Chip 
                  size="small" 
                  label={repairs.length} 
                  sx={{ 
                    height: 22, 
                    fontWeight: 'bold',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main
                  }} 
                />
              </Box>
            }
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>Pendientes</span>
                <Chip 
                  size="small" 
                  label={pendingCount} 
                  sx={{ 
                    height: 22, 
                    fontWeight: 'bold',
                    bgcolor: alpha(theme.palette.warning.main, 0.1), 
                    color: theme.palette.warning.main 
                  }} 
                />
              </Box>
            }
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>En progreso</span>
                <Chip 
                  size="small" 
                  label={inProgressCount} 
                  sx={{ 
                    height: 22, 
                    fontWeight: 'bold',
                    bgcolor: alpha(theme.palette.primary.main, 0.1), 
                    color: theme.palette.primary.main 
                  }} 
                />
              </Box>
            }
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>Completadas</span>
                <Chip 
                  size="small" 
                  label={completedCount} 
                  sx={{ 
                    height: 22, 
                    fontWeight: 'bold',
                    bgcolor: alpha(theme.palette.success.main, 0.1), 
                    color: theme.palette.success.main 
                  }} 
                />
              </Box>
            }
          />
        </Tabs>
        
        <Collapse in={showFilters}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 3 },
              mb: 3,
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              background: alpha(theme.palette.background.paper, 0.7),
              backdropFilter: 'blur(8px)',
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              Filtros avanzados
            </Typography>
            <FiltersContainer>
              <Typography variant="body2" fontWeight={500} sx={{ mr: 1 }}>
                Estado:
              </Typography>
              <StyledChip
                label="Todas"
                variant="outlined"
                onClick={() => handleStatusFilterChange('todas')}
                className={statusFilter === 'todas' ? 'active' : ''}
                size="small"
              />
              <StyledChip
                label="Pendientes"
                variant="outlined"
                onClick={() => handleStatusFilterChange('pendiente')}
                className={statusFilter === 'pendiente' ? 'active' : ''}
                size="small"
                icon={<PendingIcon fontSize="small" />}
              />
              <StyledChip
                label="En progreso"
                variant="outlined"
                onClick={() => handleStatusFilterChange('en_progreso')}
                className={statusFilter === 'en_progreso' ? 'active' : ''}
                size="small"
                icon={<SettingsIcon fontSize="small" />}
              />
              <StyledChip
                label="Completadas"
                variant="outlined"
                onClick={() => handleStatusFilterChange('completada')}
                className={statusFilter === 'completada' ? 'active' : ''}
                size="small"
                icon={<CheckCircleIcon fontSize="small" />}
              />
              <StyledChip
                label="Canceladas"
                variant="outlined"
                onClick={() => handleStatusFilterChange('cancelada')}
                className={statusFilter === 'cancelada' ? 'active' : ''}
                size="small"
                icon={<CancelIcon fontSize="small" />}
              />
            </FiltersContainer>
            
            <Divider sx={{ my: 2 }} />
            
            <FiltersContainer>
              <Typography variant="body2" fontWeight={500} sx={{ mr: 1 }}>
                Tipo de dispositivo:
              </Typography>
              <StyledChip
                label="Todos"
                variant="outlined"
                onClick={() => handleDeviceTypeFilterChange('todas')}
                className={deviceTypeFilter === 'todas' ? 'active' : ''}
                size="small"
              />
              <StyledChip
                label="Smartphone"
                variant="outlined"
                onClick={() => handleDeviceTypeFilterChange('smartphone')}
                className={deviceTypeFilter === 'smartphone' ? 'active' : ''}
                size="small"
                icon={<PhoneIcon fontSize="small" />}
              />
              <StyledChip
                label="Tablet"
                variant="outlined"
                onClick={() => handleDeviceTypeFilterChange('tablet')}
                className={deviceTypeFilter === 'tablet' ? 'active' : ''}
                size="small"
                icon={<TabletIcon fontSize="small" />}
              />
              <StyledChip
                label="Computadora"
                variant="outlined"
                onClick={() => handleDeviceTypeFilterChange('computadora')}
                className={deviceTypeFilter === 'computadora' ? 'active' : ''}
                size="small"
                icon={<ComputerIcon fontSize="small" />}
              />
              <StyledChip
                label="Televisor"
                variant="outlined"
                onClick={() => handleDeviceTypeFilterChange('televisor')}
                className={deviceTypeFilter === 'televisor' ? 'active' : ''}
                size="small"
                icon={<TvIcon fontSize="small" />}
              />
            </FiltersContainer>
          </Paper>
        </Collapse>
      </Box>

      {filteredRepairs.length === 0 ? (
        <NoDataCard>
          <Box sx={{ color: alpha(theme.palette.text.primary, 0.4), mb: 2 }}>
            {searchQuery || statusFilter !== 'todas' || deviceTypeFilter !== 'todas' ? (
              <FilterIcon sx={{ fontSize: 60 }} />
            ) : (
              <DevicesIcon sx={{ fontSize: 60 }} />
            )}
          </Box>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            {searchQuery || statusFilter !== 'todas' || deviceTypeFilter !== 'todas' 
              ? 'No se encontraron reparaciones que coincidan con los filtros'
              : 'No hay reparaciones registradas'}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3, maxWidth: 400 }}>
            {searchQuery || statusFilter !== 'todas' || deviceTypeFilter !== 'todas' 
              ? 'Intenta modificar los criterios de búsqueda o los filtros aplicados'
              : 'Comienza registrando una nueva solicitud de reparación para tus clientes.'}
            </Typography>
          {searchQuery || statusFilter !== 'todas' || deviceTypeFilter !== 'todas' ? (
            <Button 
              variant="outlined" 
              startIcon={<RefreshIcon />} 
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('todas');
                setDeviceTypeFilter('todas');
                setTabValue(0);
              }}
            >
              Limpiar filtros
            </Button>
          ) : (
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              onClick={handleNewRepair}
              sx={{ px: 3 }}
            >
              Registrar Reparación
            </Button>
          )}
        </NoDataCard>
      ) : isGridView ? (
        <Box sx={{ mb: 2 }}>
          <RepairCardGrid>
            {sortedAndPaginatedRepairs.map((repair) => (
              <RepairCard 
                key={repair.id} 
                elevation={2}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 16px 30px ${alpha(theme.palette.primary.main, 0.1)}`
                  }
                }}
              >
                <Box 
                  sx={{ 
                    borderBottom: `4px solid ${
                      repair.status === 'pendiente'
                        ? theme.palette.warning.main
                        : repair.status === 'en_progreso'
                          ? theme.palette.primary.main
                          : repair.status === 'completada'
                            ? theme.palette.success.main
                            : repair.status === 'cancelada'
                              ? theme.palette.error.main
                              : theme.palette.primary.main
                    }`,
                    position: 'relative',
                    p: 0,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(to bottom, ${
                        repair.status === 'pendiente'
                          ? alpha(theme.palette.warning.main, 0.05)
                          : repair.status === 'en_progreso'
                            ? alpha(theme.palette.primary.main, 0.05)
                            : repair.status === 'completada'
                              ? alpha(theme.palette.success.main, 0.05)
                              : repair.status === 'cancelada'
                                ? alpha(theme.palette.error.main, 0.05)
                                : alpha(theme.palette.primary.main, 0.05)
                      }, transparent)`,
                      zIndex: 0
                    }
                  }}
                >
                  <CardContent sx={{ pb: 2, pt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Chip
                        label={getStatusLabel(repair.status)}
                        color={getStatusColor(repair.status)}
                        size="small"
                        icon={getStatusIcon(repair.status)}
                        sx={{ 
                          fontWeight: 600,
                          borderRadius: '8px',
                          px: 1
                        }}
                      />
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'text.secondary',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5
                        }}
                      >
                        <CalendarIcon fontSize="inherit" />
                        {formatDate(repair.entryDate)}
                      </Typography>
                    </Box>
                    
                    <Typography variant="h6" fontWeight={600} noWrap>
                      {repair.clientName}
                    </Typography>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mt: 1.5, 
                      p: 1,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.background.default, 0.5)
                    }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          width: 32,
                          height: 32,
                          mr: 1
                        }}
                      >
                        {getDeviceTypeIcon(repair.deviceType)}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {repair.deviceType}
                        {repair.brand ? ` - ${repair.brand}` : ''}
                        {repair.model ? ` (${repair.model})` : ''}
                      </Typography>
                    </Box>
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mt: 2, 
                        mb: 1, 
                        minHeight: 60, 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        display: '-webkit-box', 
                        WebkitLineClamp: 3, 
                        WebkitBoxOrient: 'vertical',
                        bgcolor: alpha(theme.palette.background.default, 0.3),
                        p: 1.5,
                        borderRadius: 2
                      }}
                    >
                      {repair.problemDescription}
                    </Typography>
                  </CardContent>
                </Box>
                
                <Box sx={{ mt: 'auto', bgcolor: alpha(theme.palette.background.default, 0.3) }}>
                  <CardContent sx={{ py: 1.5, px: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        {repair.estimatedCost && (
                          <Typography 
                            variant="subtitle1" 
                            fontWeight={700} 
                            sx={{
                              color: theme.palette.primary.main,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5
                            }}
                          >
                            <MoneyIcon fontSize="small" />
                            ${repair.estimatedCost}
                          </Typography>
                        )}
                      </Box>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleViewDetail(repair.id)}
                        startIcon={<VisibilityIcon fontSize="small" />}
                        sx={{ 
                          borderRadius: 2,
                          boxShadow: `0 4px 8px ${alpha(theme.palette.primary.main, 0.2)}`,
                          px: 2
                        }}
                      >
                        Ver
                      </Button>
                    </Box>
          </CardContent>
                </Box>
              </RepairCard>
            ))}
          </RepairCardGrid>
          
          <TablePagination
            component="div"
            count={filteredRepairs.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50]}
            labelRowsPerPage="Filas por página:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            sx={{ 
              mt: 3,
              bgcolor: alpha(theme.palette.primary.main, 0.03),
              borderRadius: 2,
              '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                fontWeight: 500
              }
            }}
          />
        </Box>
      ) : (
        <Paper 
          elevation={0}
          sx={{ 
            overflow: 'hidden',
            border: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
            borderRadius: theme.shape.borderRadius * 1.5,
            boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
          }}
        >
          <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="tabla de reparaciones">
              <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
              <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <TableSortLabel
                      active={orderBy === 'clientName'}
                      direction={orderBy === 'clientName' ? order : 'asc'}
                      onClick={() => handleRequestSort('clientName')}
                    >
                      Cliente
                    </TableSortLabel>
                  </TableCell>
                  <DeviceTypeCell sx={{ fontWeight: 600 }}>
                    <TableSortLabel
                      active={orderBy === 'deviceType'}
                      direction={orderBy === 'deviceType' ? order : 'asc'}
                      onClick={() => handleRequestSort('deviceType')}
                    >
                      Dispositivo
                    </TableSortLabel>
                  </DeviceTypeCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <TableSortLabel
                      active={orderBy === 'entryDate'}
                      direction={orderBy === 'entryDate' ? order : 'asc'}
                      onClick={() => handleRequestSort('entryDate')}
                    >
                      Fecha de Ingreso
                    </TableSortLabel>
                  </TableCell>
                  <StatusCell sx={{ fontWeight: 600 }}>
                    <TableSortLabel
                      active={orderBy === 'status'}
                      direction={orderBy === 'status' ? order : 'asc'}
                      onClick={() => handleRequestSort('status')}
                    >
                      Estado
                    </TableSortLabel>
                  </StatusCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {sortedAndPaginatedRepairs.map((repair) => (
                <TableRow
                  key={repair.id}
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      },
                      cursor: 'pointer'
                    }}
                    onClick={() => handleViewDetail(repair.id)}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" fontWeight={600}>
                          {repair.clientName}
                        </Typography>
                      </Box>
                  </TableCell>
                    <DeviceTypeCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          sx={{ 
                            width: 28, 
                            height: 28, 
                            mr: 1,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main
                          }}
                        >
                          {getDeviceTypeIcon(repair.deviceType)}
                        </Avatar>
                        <Typography variant="body2">
                          {repair.deviceType}
                          {repair.brand ? ` - ${repair.brand}` : ''}
                          {repair.model ? ` (${repair.model})` : ''}
                        </Typography>
                      </Box>
                    </DeviceTypeCell>
                  <TableCell>
                      <Typography 
                        variant="body2"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5
                        }}
                      >
                        <CalendarIcon fontSize="small" />
                        {formatDate(repair.entryDate)}
                      </Typography>
                    </TableCell>
                    <StatusCell>
                    <Chip 
                      label={getStatusLabel(repair.status)} 
                      color={getStatusColor(repair.status)} 
                      size="small"
                        icon={getStatusIcon(repair.status)}
                        sx={{ 
                          fontWeight: 600,
                          borderRadius: '8px',
                          px: 1
                        }}
                      />
                    </StatusCell>
                  <TableCell align="right">
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetail(repair.id);
                          }}
                          startIcon={<VisibilityIcon fontSize="small" />}
                          sx={{ 
                            borderRadius: 2,
                            boxShadow: `0 4px 8px ${alpha(theme.palette.primary.main, 0.2)}`,
                          }}
                        >
                          Ver
                        </Button>
                        
                    <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMenuOpen(e, repair.id);
                          }}
                          sx={{ 
                            border: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
                            bgcolor: alpha(theme.palette.background.paper, 0.7),
                          }}
                        >
                          <MoreVertIcon fontSize="small" />
                    </IconButton>
                      </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
          
          <TablePagination
            component="div"
            count={filteredRepairs.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50]}
            labelRowsPerPage="Filas por página:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          />
        </Paper>
      )}
      
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
            mt: 0.5,
            borderRadius: 2,
            minWidth: 180,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem 
          onClick={() => {
            handleMenuClose();
            if (selectedRepairId) handleViewDetail(selectedRepairId);
          }}
          sx={{ px: 2, py: 1 }}
        >
          <VisibilityIcon fontSize="small" sx={{ mr: 2, color: theme.palette.primary.main }} />
          <Typography variant="body2">Ver detalles</Typography>
        </MenuItem>
        <MenuItem 
          onClick={handleMenuClose}
          sx={{ px: 2, py: 1 }}
        >
          <EditIcon fontSize="small" sx={{ mr: 2, color: theme.palette.info.main }} />
          <Typography variant="body2">Editar</Typography>
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem 
          onClick={handleMenuClose}
          sx={{ px: 2, py: 1, color: theme.palette.error.main }}
        >
          <DeleteIcon fontSize="small" sx={{ mr: 2 }} />
          <Typography variant="body2">Eliminar</Typography>
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default RepairListPage; 