import { MantineProvider } from '@mantine/core';
import { Routes } from './routes';
import { CustomFonts } from './styles/CustomFonts';
import { theme } from './styles/theme';

export function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <CustomFonts />
      <Routes />
    </MantineProvider>
  );
}
