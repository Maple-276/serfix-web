import React from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  List,
  ListItem,
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
  CardActions
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Centro de Ayuda
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Bienvenido al centro de ayuda de SERFIX. Aquí encontrarás información útil para el uso del sistema.
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ 
              borderBottom: `2px solid ${theme.palette.primary.main}`,
              pb: 1,
              display: 'flex',
              alignItems: 'center'
            }}>
              <HelpOutlineIcon sx={{ mr: 1 }} /> Preguntas Frecuentes
            </Typography>
            
            {faqItems.map((item, index) => (
              <Accordion key={index} sx={{ mt: 2 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
          
          <Paper sx={{ p: 3 }}>
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Correo electrónico"
                    type="email"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Asunto"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mensaje"
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}
                  >
                    Enviar Mensaje
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
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
                <ListItem button>
                  <ListItemIcon>
                    <InfoIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Guía de Inicio Rápido" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <InfoIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Gestión de Clientes" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <InfoIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Gestión de Reparaciones" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <InfoIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Reportes y Estadísticas" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <InfoIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Configuración del Sistema" />
                </ListItem>
              </List>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Ver todas las guías
              </Button>
            </CardActions>
          </Card>
          
          <Card>
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
                <Button variant="outlined" color="primary" startIcon={<ChatBubbleOutlineIcon />}>
                  Iniciar Chat
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AyudaPage; 