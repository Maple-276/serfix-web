import { Box, Button, Container, Typography, Paper, Stack, Divider, List, ListItem, ListItemIcon, ListItemText, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  BusinessCenter as BusinessIcon, 
  Build as BuildIcon, 
  Analytics as AnalyticsIcon, 
  Engineering as EngineeringIcon,
  Check as CheckIcon,
  ArrowForward as ArrowForwardIcon 
} from '@mui/icons-material';
import smartphoneRepair from '../assets/smartphone-repair.svg';
import workshopImage from '../assets/workshop.svg';
import serfixLogo from '../assets/serfix-logo.svg';
import smartphoneHero from '../assets/smartphone-hero.svg';
import technicianImage from '../assets/technician.svg';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      {/* Header/Nav */}
      <Box sx={{ 
        bgcolor: '#c31c17', 
        color: 'white',
        py: 1.5,
        px: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box 
            component="img" 
            src={serfixLogo} 
            alt="Serfix Logo" 
            sx={{ height: 50, width: 50, mr: 1 }}
          />
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
            SERFIX
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: '#7a7a7a', 
              color: 'white',
              '&:hover': { bgcolor: '#666' }
            }}
          >
            Contáctanos
          </Button>
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: '#7a7a7a', 
              color: 'white',
              '&:hover': { bgcolor: '#666' }
            }}
          >
            Explorar servicios
          </Button>
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: '#FFEB3B', 
              color: 'black',
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#FFD600' }
            }}
          >
            Suscríbete
          </Button>
        </Box>
      </Box>

      {/* Hero Section */}
      <Box sx={{ 
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
        minHeight: 'calc(100vh - 82px)',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Container maxWidth="lg">
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={4} 
            alignItems="center"
            justifyContent="space-between"
          >
            <Box sx={{ flex: 1, maxWidth: { xs: '100%', md: '50%' } }}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                  color: '#000'
                }}
              >
                Gestión inteligente en un solo lugar
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4,
                  color: '#555',
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  fontWeight: 'normal'
                }}
              >
                "Simplificamos la gestión, concentrarte en <span style={{ fontWeight: 'bold' }}>reparar</span>"
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                component={Link}
                to={user ? "/dashboard" : "/login"}
                sx={{ 
                  bgcolor: '#c31c17', 
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  borderRadius: 8,
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  '&:hover': {
                    bgcolor: '#b31c17',
                  },
                  textTransform: 'uppercase'
                }}
              >
                OBTEN TU PRUEBA GRATIS!!
              </Button>
            </Box>
            <Box 
              sx={{ 
                flex: 1, 
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Box 
                component="img" 
                src={smartphoneHero} 
                alt="Smartphone repair illustration" 
                sx={{ 
                  maxWidth: '100%', 
                  height: 'auto',
                  maxHeight: 400
                }}
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Conecta, Gestiona y Crece Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
          <Box sx={{ flex: 1 }}>
            <Card sx={{ height: '100%', boxShadow: 2, overflow: 'hidden' }}>
              <CardMedia
                component="img"
                image={workshopImage}
                alt="Workshop"
                sx={{ 
                  height: '280px',
                  objectFit: 'cover'
                }}
              />
            </Card>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
              Conecta, Gestiona y Crece
            </Typography>
            
            <List sx={{ mt: 2 }}>
              <ListItem sx={{ pl: 0, pb: 1 }}>
                <ListItemIcon sx={{ minWidth: 24, color: '#000' }}>
                  <Box component="span" sx={{ fontSize: '22px', fontWeight: 'bold' }}>•</Box>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ fontSize: '0.95rem', fontWeight: 'medium' }}>
                      <Box component="span" sx={{ fontWeight: 'bold' }}>Conoce a tus clientes</Box> y fidelízalos con un sistema inteligente.
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem sx={{ pl: 0, pb: 1 }}>
                <ListItemIcon sx={{ minWidth: 24, color: '#000' }}>
                  <Box component="span" sx={{ fontSize: '22px', fontWeight: 'bold' }}>•</Box>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ fontSize: '0.95rem', fontWeight: 'medium' }}>
                      <Box component="span" sx={{ fontWeight: 'bold' }}>Centraliza los datos</Box> de tu tienda y optimiza la gestión.
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem sx={{ pl: 0, pb: 1 }}>
                <ListItemIcon sx={{ minWidth: 24, color: '#000' }}>
                  <Box component="span" sx={{ fontSize: '22px', fontWeight: 'bold' }}>•</Box>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ fontSize: '0.95rem', fontWeight: 'medium' }}>
                      <Box component="span" sx={{ fontWeight: 'bold' }}>Mejora la comunicación</Box> con soporte en tiempo real y notificaciones.
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem sx={{ pl: 0, pb: 1 }}>
                <ListItemIcon sx={{ minWidth: 24, color: '#000' }}>
                  <Box component="span" sx={{ fontSize: '22px', fontWeight: 'bold' }}>•</Box>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ fontSize: '0.95rem', fontWeight: 'medium' }}>
                      <Box component="span" sx={{ fontWeight: 'bold' }}>¡Afíliate hoy</Box> y transforma tu negocio!
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </Stack>
      </Container>

      {/* Manejar los equipos que llegan a tu taller Section */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={5}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom sx={{ color: '#000', mb: 3 }}>
              Manejar los equipos que llegan a tu taller.
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Registro visual y detallado
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Fotografía y documenta el estado de los equipos al momento de recibirlos.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                (Evita mal entendidos)
              </Typography>
            </Box>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Historial completo por cliente
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Conoce fácilmente el historial de servicios y equipos.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                (¡Ahorra tiempo y mejora la confianza con tu cliente!)
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Divider sx={{ width: '40%', borderColor: '#c31c17', borderWidth: 1.5 }} />
              </Box>
            </Box>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Seguimientos eficientes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Organiza y clasifica cada equipo recibido por estado, tipo de reparación o prioridad.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Optimiza tus tiempos y mejora la gestión.
              </Typography>
            </Box>
            
            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button 
                variant="contained" 
                sx={{ 
                  bgcolor: '#000',
                  borderRadius: 0,
                  textTransform: 'none',
                  px: 3
                }}
              >
                Button
              </Button>
              <Button 
                variant="outlined" 
                sx={{ 
                  color: '#000',
                  borderColor: '#000',
                  borderRadius: 0, 
                  textTransform: 'none',
                  px: 3
                }}
              >
                Secondary button
              </Button>
            </Stack>
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <Box 
              component="img" 
              src={technicianImage} 
              alt="Technician working" 
              sx={{ 
                width: '100%', 
                height: 'auto',
                maxHeight: 500,
                objectFit: 'cover'
              }}
            />
          </Box>
        </Stack>
      </Container>
      
      {/* Footer */}
      <Box sx={{ bgcolor: '#1a3f85', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <BuildIcon sx={{ mr: 1 }} /> SERFIX
              </Typography>
              <Typography variant="body2">
                La solución completa para la gestión de tu taller de reparaciones.
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Contáctanos
              </Typography>
              <Typography variant="body2">info@serfix.com</Typography>
              <Typography variant="body2">+1 (555) 123-4567</Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Enlaces rápidos
              </Typography>
              <Link to="/" style={{ display: 'block', color: 'white', textDecoration: 'none', marginBottom: '8px' }}>Inicio</Link>
              <Link to="/login" style={{ display: 'block', color: 'white', textDecoration: 'none', marginBottom: '8px' }}>Iniciar sesión</Link>
              <Link to="/dashboard" style={{ display: 'block', color: 'white', textDecoration: 'none' }}>Dashboard</Link>
            </Box>
          </Stack>
          <Divider sx={{ my: 3, bgcolor: 'rgba(255,255,255,0.2)' }} />
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} SERFIX. Todos los derechos reservados.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 