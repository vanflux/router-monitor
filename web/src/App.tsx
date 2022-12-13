import { QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { queryClient } from './lib/query-client';
import Router from './router/router';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import 'chartjs-adapter-moment';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export function App() {
  return <CssVarsProvider>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <QueryClientProvider client={queryClient}>
        <Router />
        <ToastContainer />
      </QueryClientProvider>
    </LocalizationProvider>
  </CssVarsProvider>
}
