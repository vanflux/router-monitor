import { QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { queryClient } from './lib/query-client';
import Router from './router/router';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export function App() {
  return <QueryClientProvider client={queryClient}>
    <Router />
    <ToastContainer />
  </QueryClientProvider>
}
