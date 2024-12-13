import {
  ChakraProvider as CKProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ProvidorProps {
  children: ReactNode;
}

export function ChakraProvider({ children }: ProvidorProps) {
  const config = defineConfig({
    theme: {
      breakpoints: {
        xs: '20rem', // 320px (iPhone SE)
        sm: '30rem', // 480px (Androids e iPhones comuns)
        md: '48rem', // 768px (tablets verticais ou telefones grandes)
        lg: '64rem', // 1024px (tablets horizontais e telas pequenas de laptop)
        xl: '80rem', // 1280px (telas de laptops e desktops comuns)
        '2xl': '96rem', // 1536px (telas grandes de desktop e monitores 4K)
        '3xl': '120rem', // 1920px (monitores Full HD e maiores)
      },
    },
  });

  const system = createSystem(defaultConfig, config);
  return <CKProvider value={system}>{children}</CKProvider>;
}
