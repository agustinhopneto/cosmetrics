import { ProvidersProvider } from './providers';

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return <ProvidersProvider>{children}</ProvidersProvider>;
}
