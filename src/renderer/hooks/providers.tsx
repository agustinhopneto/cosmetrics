/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useCallback, useContext, useState } from 'react';
import { getErrMessage } from 'renderer/utils/error';
import { useNotifications } from './notifications';

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

type ProvidersProps = {
  providers: Provider[];
  isLoading: boolean;
  createProvider: (provider: CreateProviderParams) => Promise<void>;
};

type ProvidersProviderProps = {
  children: React.ReactNode;
};

const api = window.api.providers;

const ProvidersContext = createContext<ProvidersProps>({} as ProvidersProps);

export function ProvidersProvider({ children }: ProvidersProviderProps) {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { notify } = useNotifications();

  const createProvider = useCallback(
    async (provider: CreateProviderParams) => {
      try {
        setIsLoading(true);
        const createdProvider = await api.create(provider);

        setProviders([...providers, createdProvider]);
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

  return (
    <ProvidersContext.Provider value={{ providers, createProvider, isLoading }}>
      {children}
    </ProvidersContext.Provider>
  );
}

export const useProviders = (): ProvidersProps => {
  return useContext(ProvidersContext);
};
