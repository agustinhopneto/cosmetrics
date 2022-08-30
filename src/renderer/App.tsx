import { MantineProvider } from '@mantine/core';
import { useEffect } from 'react';
import { Routes } from './routes';
import { CustomFonts } from './styles/CustomFonts';
import { theme } from './styles/theme';

export function App() {
  useEffect(() => {
    (async () => {
      const message = await window.api.hello('Cosmetrics.');

      console.log(message);
    })();
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <CustomFonts />
      <Routes />
    </MantineProvider>
  );
}
