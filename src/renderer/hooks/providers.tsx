/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useCallback, useContext, useState } from 'react';
import { pageLimits } from '../components/Pagination';
import { getErrMessage } from '../utils/error';
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
  deleted_at: string | null;
};

export type ProviderFilters = {
  name?: string;
  email?: string;
  phone?: string;
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
  listProviders: () => Promise<void>;
  isLoading: boolean;
  page: number;
  setPage: (value: number) => void;
  pageLimit: string | null;
  setPageLimit: (value: string | null) => void;
  filters?: ProviderFilters;
  setFilters: (filters?: ProviderFilters) => void;
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

  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState<string | null>(pageLimits[0]);

  const [filters, setFilters] = useState<ProviderFilters | undefined>(
    undefined
  );

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

  const listProviders = useCallback(async () => {
    setIsLoading(true);
    const listedProviders = await api.list(page, Number(pageLimit), filters);

    setProviders(listedProviders);
    setIsLoading(false);
  }, [page, pageLimit, filters]);

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
        page,
        setPage,
        pageLimit,
        setPageLimit,
        filters,
        setFilters,
      }}
    >
      {children}
    </ProvidersContext.Provider>
  );
}

export const useProviders = (): ProvidersProps => {
  return useContext(ProvidersContext);
};
