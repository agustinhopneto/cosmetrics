import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { MemoryRouter } from 'react-router-dom';
import { AppContainer } from './components/AppContainer';
import { AppProvider } from './hooks';
import { Router } from './routes/Router';
import { CustomFonts } from './styles/CustomFonts';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';

export function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <GlobalStyles />
      <CustomFonts />
      <NotificationsProvider>
        <AppProvider>
          <MemoryRouter>
            <AppContainer>
              <Router />
            </AppContainer>
          </MemoryRouter>
        </AppProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}
