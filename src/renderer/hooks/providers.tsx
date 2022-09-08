/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useCallback, useContext, useState } from 'react';
import { getErrMessage } from 'renderer/utils/error';
import { useNotifications } from './notifications';

export type Paginated<T> = {
  total: number;
  totalPages: number;
  result: T[];
};

export type Provider = {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export type CreateProviderParams = Pick<Provider, 'name' | 'email' | 'phone'>;
export type UpdateProviderParams = Pick<
  Provider,
  'id' | 'name' | 'email' | 'phone'
>;

type ProvidersProps = {
  providers: Paginated<Provider>;
  createProvider: (provider: CreateProviderParams) => Promise<void>;
  updateProvider: (provider: UpdateProviderParams) => Promise<void>;
  listProviders: (page: number, limit: number) => Promise<void>;
  isLoading: boolean;
};

type ProvidersProviderProps = {
  children: React.ReactNode;
};

const api = window.api.providers;

const ProvidersContext = createContext<ProvidersProps>({} as ProvidersProps);

export function ProvidersProvider({ children }: ProvidersProviderProps) {
  const [providers, setProviders] = useState<Paginated<Provider>>(
    {} as Paginated<Provider>
  );
  const [isLoading, setIsLoading] = useState(false);
  const { notify } = useNotifications();

  const createProvider = useCallback(
    async (provider: CreateProviderParams) => {
      try {
        setIsLoading(true);
        const createdProvider = await api.create(provider);

        setProviders({
          ...providers,
          totalPages: providers.totalPages === 0 ? 1 : providers.totalPages,
          total: providers.total + 1,
          result: [createdProvider, ...providers.result],
        });
        notify({
          message: 'O fornecedor foi cadastrado!',
          type: 'success',
        });
      } catch (err: any) {
        notify({
          message: getErrMessage(err),
          type: 'danger',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [providers, notify]
  );

  const listProviders = useCallback(async (page: number, limit: number) => {
    setIsLoading(true);
    const listedProviders = await api.list(page, limit);

    setProviders(listedProviders);
    setIsLoading(false);
  }, []);

  const updateProvider = useCallback(
    async (provider: UpdateProviderParams) => {
      try {
        setIsLoading(true);
        const updatedProvider = await api.update(provider);

        const newProviders = providers.result;

        const providerIndex = newProviders.findIndex(
          (item) => item.id === provider.id
        );

        newProviders[providerIndex] = updatedProvider;

        setProviders({
          ...providers,
          result: newProviders,
        });
        notify({
          message: 'O fornecedor foi atualizado!',
          type: 'success',
        });
      } catch (err: any) {
        notify({
          message: getErrMessage(err),
          type: 'danger',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [notify, providers]
  );

  return (
    <ProvidersContext.Provider
      value={{
        providers,
        createProvider,
        updateProvider,
        listProviders,
        isLoading,
      }}
    >
      {children}
    </ProvidersContext.Provider>
  );
}

export const useProviders = (): ProvidersProps => {
  return useContext(ProvidersContext);
};
