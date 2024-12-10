import { ReactNode, useState } from 'react';
import {
  QueryClientProvider as QCProvider,
  QueryClient,
} from '@tanstack/react-query';

interface QueryClientProviderProps {
  children: ReactNode;
}

export function QueryClientProvider({ children }: QueryClientProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  return <QCProvider client={queryClient}>{children}</QCProvider>;
}
