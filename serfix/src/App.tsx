import './App.css'
import AppRouter from './routes/AppRouter'
import { RepairsProvider } from './contexts/RepairsContext'
import { useAuth } from './contexts/AuthContext'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme/theme'

function App() {
  const { user } = useAuth();
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Solo proporcionar el contexto de reparaciones si el usuario está autenticado */}
      {user ? (
        <RepairsProvider>
          <AppRouter />
        </RepairsProvider>
      ) : (
        <AppRouter />
      )}
    </ThemeProvider>
  )
}

export default App
