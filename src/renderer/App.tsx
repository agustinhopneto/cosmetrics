import { MantineProvider } from '@mantine/core';
import { Routes } from './routes';

export function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Routes />
    </MantineProvider>
  );
}
