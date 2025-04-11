import { Box, Paper, Alert, AlertTitle, Button } from '@mui/material';
import { ReactNode } from 'react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
  children?: ReactNode;
}

const ErrorMessage = ({
  title = 'Error',
  message,
  actionText = 'Intentar de nuevo',
  onAction,
  children,
}: ErrorMessageProps) => {
  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', my: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Alert
          severity="error"
          sx={{ mb: onAction ? 3 : 0 }}
        >
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
        {children}
        {onAction && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              color="error"
              onClick={onAction}
            >
              {actionText}
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ErrorMessage; 