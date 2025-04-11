import { Box, CircularProgress, Typography } from '@mui/material';

interface SpinnerProps {
  message?: string;
}

const Spinner = ({ message = 'Cargando...' }: SpinnerProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        minHeight: '200px',
      }}
    >
      <CircularProgress size={50} />
      <Typography sx={{ mt: 2 }} variant="body1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default Spinner; 