import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, QueryClientProvider } from '@/context';
import { ThemeProvider } from 'next-themes';
import App from './App';
import { Toaster } from '@/components/ui/toaster';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider>
      <ChakraProvider>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <App />
          <Toaster />
        </ThemeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>,
);
