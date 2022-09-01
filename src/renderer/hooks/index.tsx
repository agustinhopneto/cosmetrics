import { NotificationsProvider } from './notifications';
import { ProvidersProvider } from './providers';

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <NotificationsProvider>
      <ProvidersProvider>{children}</ProvidersProvider>
    </NotificationsProvider>
  );
}
