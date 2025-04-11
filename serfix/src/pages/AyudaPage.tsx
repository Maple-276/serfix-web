import React from 'react';
import {
  Typography,
  Box,
  Paper,
  List,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  alpha,
  useMediaQuery
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  HelpOutline as HelpOutlineIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  ContactSupport as ContactSupportIcon,
  Book as BookIcon,
  Send as SendIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const AyudaPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const faqItems = [
    {
      question: '¿Cómo registro una nueva reparación?',
      answer: 'Para registrar una nueva reparación, navega al menú "Reparaciones" y haz clic en el botón "Nueva reparación". Completa el formulario con los datos del cliente y del dispositivo a reparar, luego haz clic en "Registrar Reparación".'
    },
    {
      question: '¿Cómo actualizo el estado de una reparación?',
      answer: 'Para actualizar el estado de una reparación, ve a la sección "Reparaciones", busca la reparación que deseas actualizar y haz clic en ella. En la vista de detalles, encontrarás un menú desplegable para cambiar el estado entre "pendiente", "en_progreso", "completada" o "cancelada".'
    },
    {
      question: '¿Puedo agregar varios equipos al mismo cliente?',
      answer: 'Sí, puedes agregar múltiples equipos a un mismo cliente. Ve a la sección "Clientes", selecciona el cliente deseado y haz clic en "Agregar Equipo". También puedes hacerlo desde la sección "Equipos" creando un nuevo equipo y asignándolo al cliente correspondiente.'
    },
    {
      question: '¿Cómo genero reportes de reparaciones?',
      answer: 'Para generar reportes, ve a la sección "Dashboard" donde encontrarás diferentes tipos de informes disponibles. Puedes filtrar por fechas, clientes, tipos de dispositivos, etc. Los reportes pueden exportarse en formatos PDF o Excel para su posterior análisis.'
    },
    {
      question: '¿Puedo cambiar mi contraseña?',
      answer: 'Sí, puedes cambiar tu contraseña en cualquier momento. Ve a la sección "Configuración", selecciona "Perfil de Usuario" y haz clic en "Cambiar Contraseña". Deberás ingresar tu contraseña actual y la nueva contraseña dos veces para confirmar el cambio.'
    }
  ];

  return (
    <Box sx={{ 
      p: 3,
      backgroundColor: alpha(theme.palette.background.default, 0.7),
      borderRadius: theme.shape.borderRadius,
    }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom
        sx={{
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          mb: 2
        }}
      >
        Centro de Ayuda
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Bienvenido al centro de ayuda de SERFIX. Aquí encontrarás información útil para el uso del sistema.
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Box sx={{ flex: { xs: '1 1 100%', md: '8 1 0%' } }}>
          <Paper 
            sx={{ 
              p: 3, 
              mb: 4,
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.15)}`,
                transform: 'translateY(-4px)'
              }
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ 
              borderBottom: `2px solid ${theme.palette.primary.main}`,
              pb: 1,
              display: 'flex',
              alignItems: 'center'
            }}>
              <HelpOutlineIcon sx={{ mr: 1 }} /> Preguntas Frecuentes
            </Typography>
            
            {faqItems.map((item, index) => (
              <Accordion 
                key={index} 
                sx={{ 
                  mt: 2,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  '&:before': {
                    display: 'none',
                  },
                  boxShadow: 'none',
                  border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
                  '&:not(:last-child)': {
                    mb: 1
                  },
                  '&.Mui-expanded': {
                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`,
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.main }} />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                  sx={{
                    backgroundColor: alpha(theme.palette.background.paper, 0.8),
                    '&.Mui-expanded': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    }
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, py: 2 }}>
                  <Typography variant="body1">
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
          
          <Paper 
            sx={{ 
              p: 3,
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.15)}`,
                transform: 'translateY(-4px)'
              }
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ 
              borderBottom: `2px solid ${theme.palette.primary.main}`,
              pb: 1,
              display: 'flex',
              alignItems: 'center'
            }}>
              <ContactSupportIcon sx={{ mr: 1 }} /> Contactar Soporte
            </Typography>
            
            <Typography variant="body1" paragraph>
              ¿No encuentras lo que buscas? Envíanos un mensaje y te responderemos a la brevedad.
            </Typography>
            
            <Box component="form" sx={{ mt: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                  <Box sx={{ flex: { xs: '1', sm: '1' } }}>
                    <TextField
                      fullWidth
                      label="Nombre"
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
                  <Box sx={{ flex: { xs: '1', sm: '1' } }}>
                    <TextField
                      fullWidth
                      label="Correo electrónico"
                      type="email"
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
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    label="Asunto"
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
                <Box>
                  <TextField
                    fullWidth
                    label="Mensaje"
                    multiline
                    rows={4}
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
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}
                    sx={{ 
                      py: 1.2, 
                      px: 3, 
                      borderRadius: 2,
                      fontWeight: 600,
                      boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
                      '&:hover': {
                        boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.6)}`,
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    Enviar Mensaje
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
        
        <Box sx={{ flex: { xs: '1 1 100%', md: '4 1 0%' } }}>
          <Card 
            sx={{ 
              mb: 3,
              borderRadius: 2,
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.15)}`,
                transform: 'translateY(-4px)'
              }
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ 
                display: 'flex',
                alignItems: 'center',
                color: theme.palette.primary.main
              }}>
                <BookIcon sx={{ mr: 1 }} /> Guías Rápidas
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List dense>
                {[
                  'Guía de Inicio Rápido', 
                  'Gestión de Clientes', 
                  'Gestión de Reparaciones', 
                  'Reportes y Estadísticas', 
                  'Configuración del Sistema'
                ].map((text, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      py: 0.8,
                      px: 1,
                      display: 'flex',
                      alignItems: 'center',
                      borderRadius: 1,
                      mb: 0.5,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                        transform: 'translateX(4px)'
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <InfoIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={text}
                      primaryTypographyProps={{
                        fontSize: '0.95rem'
                      }}
                    />
                  </Box>
                ))}
              </List>
            </CardContent>
            <CardActions>
              <Button 
                size="small" 
                color="primary"
                sx={{ 
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08)
                  }
                }}
              >
                Ver todas las guías
              </Button>
            </CardActions>
          </Card>
          
          <Card 
            sx={{ 
              borderRadius: 2,
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.15)}`,
                transform: 'translateY(-4px)'
              }
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ 
                display: 'flex',
                alignItems: 'center',
                color: theme.palette.primary.main
              }}>
                <ChatBubbleOutlineIcon sx={{ mr: 1 }} /> Chat de Soporte
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary" paragraph>
                Nuestro equipo de soporte está disponible para ayudarte en tiempo real. 
                Conéctate para hablar con un agente.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  startIcon={<ChatBubbleOutlineIcon />}
                  sx={{ 
                    py: 1, 
                    px: 2, 
                    borderRadius: 2,
                    fontWeight: 500,
                    borderWidth: '2px',
                    '&:hover': {
                      borderWidth: '2px',
                      backgroundColor: alpha(theme.palette.primary.main, 0.08)
                    }
                  }}
                >
                  Iniciar Chat
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default AyudaPage; 