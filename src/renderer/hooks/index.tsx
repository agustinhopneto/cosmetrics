import { CategoriesProvider } from './categories';
import { NotificationsProvider } from './notifications';
import { ProvidersProvider } from './providers';

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <NotificationsProvider>
      <ProvidersProvider>
        <CategoriesProvider>{children}</CategoriesProvider>
      </ProvidersProvider>
    </NotificationsProvider>
  );
}
