import { MantineProvider } from '@mantine/core';
import { MemoryRouter } from 'react-router-dom';
import { AppContainer } from './components/AppContainer';
import { Router } from './routes/Router';
import { CustomFonts } from './styles/CustomFonts';
import { theme } from './styles/theme';

export function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <CustomFonts />
      <MemoryRouter>
        <AppContainer>
          <Router />
        </AppContainer>
      </MemoryRouter>
    </MantineProvider>
  );
}
