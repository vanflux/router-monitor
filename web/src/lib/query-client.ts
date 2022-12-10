
import { QueryClient, setLogger } from 'react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: 5 * 1000,
    },
  },
});

setLogger({ error: () => {}, log: () => {}, warn: () => {} });
