import { Box, Button, Container, Typography, Paper, Stack, Divider, List, ListItem, ListItemIcon, ListItemText, Card, CardContent, CardMedia, alpha, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  BusinessCenter as BusinessIcon, 
  Build as BuildIcon, 
  Analytics as AnalyticsIcon, 
  Engineering as EngineeringIcon,
  Check as CheckIcon,
  ArrowForward as ArrowForwardIcon,
  Speed as SpeedIcon,
  Devices as DevicesIcon,
  Security as SecurityIcon
} from '@mui/icons-material';
import smartphoneRepair from '../assets/smartphone-repair.svg';
import workshopImage from '../assets/workshop.svg';
import serfixLogo from '../assets/serfix-logo.svg';
import smartphoneHero from '../assets/smartphone-hero.svg';
import technicianImage from '../assets/technician.svg';

const HomePage = () => {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white', width: '100vw', overflowX: 'hidden' }}>
      {/* Header/Nav */}
      <Box sx={{ 
        background: 'linear-gradient(90deg, #c31c17 0%, #e53935 100%)',
        color: 'white',
        py: 1.5,
        px: { xs: 2, md: 6 },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 20px rgba(195, 28, 23, 0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(8px)',
        width: '100%'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)'
          }
        }}>
          <Box 
            component="img" 
            src={serfixLogo} 
            alt="Serfix Logo" 
            sx={{ 
              height: 50, 
              width: 50, 
              mr: 1,
              filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.2))'
            }}
          />
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 'bold', 
              letterSpacing: 1,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            SERFIX
          </Typography>
        </Box>
        <Box sx={{ 
          display: 'flex', 
          gap: { xs: 1, md: 2 },
          alignItems: 'center'
        }}>
          <Button 
            variant="text" 
            sx={{ 
              color: 'white',
              fontWeight: 500,
              position: 'relative',
              overflow: 'hidden',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '2px',
                backgroundColor: 'white',
                transform: 'scaleX(0)',
                transformOrigin: 'bottom right',
                transition: 'transform 0.3s',
              },
              '&:hover': {
                backgroundColor: 'transparent',
                '&:after': {
                  transform: 'scaleX(1)',
                  transformOrigin: 'bottom left',
                }
              }
            }}
          >
            Contáctanos
          </Button>
          <Button 
            variant="text" 
            sx={{ 
              color: 'white',
              fontWeight: 500,
              position: 'relative',
              overflow: 'hidden',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '2px',
                backgroundColor: 'white',
                transform: 'scaleX(0)',
                transformOrigin: 'bottom right',
                transition: 'transform 0.3s',
              },
              '&:hover': {
                backgroundColor: 'transparent',
                '&:after': {
                  transform: 'scaleX(1)',
                  transformOrigin: 'bottom left',
                }
              }
            }}
          >
            Servicios
          </Button>
          <Button 
            variant="contained" 
            component={Link}
            to={user ? "/dashboard" : "/login"}
            sx={{ 
              bgcolor: user ? 'white' : 'linear-gradient(135deg, #f5d742 0%, #daa520 50%, #b8860b 100%)',
              color: user ? theme.palette.primary.main : '#ffffff',
              fontWeight: 'bold',
              px: { xs: 2, md: 3 },
              py: 1,
              borderRadius: '24px',
              boxShadow: user ? '0 4px 14px rgba(0,0,0,0.15)' : '0 10px 20px rgba(218, 165, 32, 0.3)',
              transition: 'all 0.3s ease',
              border: user ? 'none' : '1px solid rgba(218, 165, 32, 0.5)',
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to right, rgba(255, 255, 255, 0.1), transparent, rgba(255, 255, 255, 0.1))',
                transform: 'translateX(-100%)',
                transition: 'transform 0.6s',
                display: user ? 'none' : 'block'
              },
              '&:hover': { 
                bgcolor: user ? 'white' : 'linear-gradient(135deg, #f7df5e 0%, #e6b422 50%, #cd9b1d 100%)',
                transform: 'translateY(-3px)',
                boxShadow: user ? '0 6px 20px rgba(0,0,0,0.2)' : '0 15px 30px rgba(218, 165, 32, 0.4)',
                '&::after': {
                  transform: 'translateX(100%)'
                }
              }
            }}
          >
            {user ? "Dashboard" : "Iniciar sesión"}
          </Button>
        </Box>
      </Box>

      {/* Hero Section */}
      <Box sx={{ 
        py: { xs: 6, md: 10 },
        px: { xs: 0, md: 0 },
        minHeight: 'calc(100vh - 82px)',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          backgroundImage: `radial-gradient(${alpha(theme.palette.primary.main, 0.07)} 2px, transparent 2px)`,
          backgroundSize: '30px 30px',
          opacity: 0.5,
          zIndex: 0
        }
      }}>
        <Container maxWidth={false} sx={{ position: 'relative', zIndex: 2, px: { xs: 2, md: 6 } }}>
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={4} 
            alignItems="center"
            justifyContent="space-between"
          >
            <Box sx={{ 
              flex: 1, 
              maxWidth: { xs: '100%', md: '50%' },
              animation: 'fadeInLeft 1s ease-out',
              '@keyframes fadeInLeft': {
                '0%': {
                  opacity: 0,
                  transform: 'translateX(-20px)'
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateX(0)'
                }
              }
            }}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 900,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                  color: theme.palette.primary.main,
                  marginBottom: 3,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: 0,
                    width: 80,
                    height: 4,
                    borderRadius: 2,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
                  }
                }}
              >
                Gestión inteligente para tu taller
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4,
                  color: '#555',
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  fontWeight: 'normal',
                  maxWidth: '90%'
                }}
              >
                Software especializado para <span style={{ fontWeight: 'bold', color: theme.palette.primary.main }}>reparación de dispositivos</span>. Centraliza datos, mejora tu atención al cliente y aumenta tus ventas.
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2, 
                mt: 5
              }}>
                <Button 
                  variant="contained" 
                  size="large"
                  component={Link}
                  to={user ? "/dashboard" : "/login"}
                  sx={{ 
                    bgcolor: theme.palette.primary.main, 
                    color: 'white',
                    px: 4,
                    py: 1.8,
                    borderRadius: 3,
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark,
                      transform: 'translateY(-5px)',
                      boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.6)}`,
                    },
                    textTransform: 'none'
                  }}
                  endIcon={<ArrowForwardIcon />}
                >
                  Prueba gratis 14 días
                </Button>
                <Button 
                  variant="outlined"
                  size="large" 
                  sx={{ 
                    color: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                    borderWidth: 2,
                    px: 4,
                    py: 1.8,
                    borderRadius: 3,
                    fontWeight: 600,
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderWidth: 2,
                      borderColor: theme.palette.primary.dark,
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      transform: 'translateY(-5px)',
                    },
                    textTransform: 'none'
                  }}
                >
                  Ver demo
                </Button>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 3, 
                mt: 4, 
                pt: 3,
                borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SpeedIcon sx={{ color: theme.palette.primary.main }} />
                  <Typography variant="body2" fontWeight={500}>Rápido</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SecurityIcon sx={{ color: theme.palette.primary.main }} />
                  <Typography variant="body2" fontWeight={500}>Seguro</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DevicesIcon sx={{ color: theme.palette.primary.main }} />
                  <Typography variant="body2" fontWeight={500}>Multiplataforma</Typography>
                </Box>
              </Box>
            </Box>
            
            <Box 
              sx={{ 
                flex: 1, 
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                animation: 'fadeInRight 1s ease-out',
                '@keyframes fadeInRight': {
                  '0%': {
                    opacity: 0,
                    transform: 'translateX(20px)'
                  },
                  '100%': {
                    opacity: 1,
                    transform: 'translateX(0)'
                  }
                }
              }}
            >
              <Box 
                component="img" 
                src={smartphoneHero} 
                alt="Smartphone repair illustration" 
                sx={{ 
                  maxWidth: '100%', 
                  height: 'auto',
                  maxHeight: 500,
                  filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))',
                  transition: 'transform 0.5s ease',
                  animation: 'float 3s ease-in-out infinite',
                  '@keyframes float': {
                    '0%': {
                      transform: 'translateY(0px)'
                    },
                    '50%': {
                      transform: 'translateY(-15px)'
                    },
                    '100%': {
                      transform: 'translateY(0px)'
                    }
                  }
                }}
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Características principales */}
      <Container maxWidth={false} sx={{ py: 10, px: { xs: 2, md: 6 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            fontWeight="bold" 
            sx={{ 
              mb: 2,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}
          >
            Todo lo que necesitas para gestionar tu taller
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              maxWidth: 700, 
              mx: 'auto',
              fontWeight: 'normal'
            }}
          >
            Un sistema completo que te ayuda a organizar, seguir y optimizar cada reparación
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 4 
        }}>
          {[
            {
              icon: <BuildIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
              title: "Gestión de reparaciones",
              description: "Seguimiento completo del ciclo de vida de cada dispositivo, desde la recepción hasta la entrega."
            },
            {
              icon: <DevicesIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
              title: "Catálogo de dispositivos",
              description: "Mantén un registro detallado de todos los equipos que ingresan a tu taller."
            },
            {
              icon: <BusinessIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
              title: "Gestión de clientes",
              description: "Base de datos completa con historial de reparaciones y preferencias de cada cliente."
            },
            {
              icon: <AnalyticsIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
              title: "Reportes y estadísticas",
              description: "Analiza el rendimiento de tu negocio con gráficos detallados y reportes personalizables."
            },
            {
              icon: <EngineeringIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
              title: "Asignación de técnicos",
              description: "Distribuye el trabajo de manera eficiente entre tu equipo técnico."
            },
            {
              icon: <SecurityIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
              title: "Seguridad avanzada",
              description: "Protección de datos con múltiples niveles de acceso y respaldos automáticos."
            }
          ].map((feature, index) => (
            <Card 
              key={index} 
              sx={{ 
                p: 3,
                borderRadius: 4,
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                overflow: 'visible',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                }
              }}
            >
              <Box sx={{ 
                mb: 2, 
                display: 'inline-flex', 
                p: 1.5,
                borderRadius: 2,
                background: alpha(theme.palette.primary.main, 0.1)
              }}>
                {feature.icon}
              </Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {feature.description}
              </Typography>
            </Card>
          ))}
        </Box>
      </Container>
      
      {/* Conecta, Gestiona y Crece Section */}
      <Box sx={{ 
        py: 10, 
        px: 0,
        width: '100%',
        background: `linear-gradient(135deg, #f8f9fa 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)` 
      }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 6 } }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} alignItems="center">
            <Box sx={{ 
              flex: 1,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: -15,
                left: -15,
                width: '100%',
                height: '100%',
                border: `2px solid ${theme.palette.primary.main}`,
                borderRadius: 4,
                zIndex: 0
              }
            }}>
              <Card sx={{ 
                height: '100%', 
                boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                overflow: 'hidden',
                borderRadius: 4,
                position: 'relative',
                zIndex: 1
              }}>
                <CardMedia
                  component="img"
                  image={workshopImage}
                  alt="Workshop"
                  sx={{ 
                    height: { xs: '280px', md: '400px' },
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                />
              </Card>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography 
                variant="h3" 
                component="h2" 
                fontWeight="bold" 
                gutterBottom
                sx={{
                  position: 'relative',
                  pb: 2,
                  mb: 3,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 60,
                    height: 4,
                    borderRadius: 2,
                    background: theme.palette.primary.main
                  }
                }}
              >
                Conecta, Gestiona y Crece
              </Typography>
              
              <List sx={{ mt: 2 }}>
                {[
                  "Conoce a tus clientes y fidelízalos con un sistema inteligente.",
                  "Centraliza los datos de tu tienda y optimiza la gestión.",
                  "Mejora la comunicación con soporte en tiempo real.",
                  "Automatiza procesos y libera tiempo para lo importante."
                ].map((item, index) => (
                  <ListItem key={index} sx={{ 
                    pl: 0, 
                    pb: 2,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(5px)'
                    }
                  }}>
                    <ListItemIcon sx={{ 
                      minWidth: 36, 
                      color: theme.palette.primary.main 
                    }}>
                      <CheckIcon fontSize="small" sx={{ 
                        p: 0.8,
                        borderRadius: '50%',
                        bgcolor: alpha(theme.palette.primary.main, 0.1)
                      }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 500 }}>
                          {item}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              
              <Button 
                variant="contained" 
                size="large"
                component={Link}
                to={user ? "/dashboard" : "/login"}
                sx={{ 
                  mt: 4,
                  bgcolor: theme.palette.primary.main, 
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 'bold',
                  boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark,
                    transform: 'translateY(-5px)',
                    boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.6)}`,
                  },
                  textTransform: 'none'
                }}
                endIcon={<ArrowForwardIcon />}
              >
                ¡Comienza ahora!
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 