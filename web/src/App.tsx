import { QueryClientProvider } from 'react-query';
import { ToastContainer as ReactToastContainer } from 'react-toastify';
import { queryClient } from './lib/query-client';
import { CssBaseline, Experimental_CssVarsProvider as CssVarsProvider, useColorScheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { PropsWithChildren } from 'react';
import { theme } from './theme';
import Router from './router/router';
import 'chartjs-adapter-moment';

export function App() {
  const MaterialUiContainer = ({ children }: PropsWithChildren) => (
    <CssVarsProvider theme={theme} defaultMode='dark'>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {children}
      </LocalizationProvider>
    </CssVarsProvider>
  );

  const ReactQueryContainer = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  const ToastContainer = () => {
    const { mode } = useColorScheme();
    return <ReactToastContainer theme={mode === 'dark' ? 'dark' : 'light'} />;
  };

  return (
    <MaterialUiContainer>
      <ReactQueryContainer>
          <Router />
          <ToastContainer />
        </ReactQueryContainer>
    </MaterialUiContainer>
  );
}
