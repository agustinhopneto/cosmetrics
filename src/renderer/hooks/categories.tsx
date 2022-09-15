/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useCallback, useContext, useState } from 'react';
import { getErrMessage } from '../utils/error';
import { useNotifications } from './notifications';

export type Category = {
  id: number;
  name: string;
  color: string;
  description?: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type CreateCategoryParams = Pick<
  Category,
  'name' | 'color' | 'description'
>;

type CategoriesProps = {
  createCategory: (category: CreateCategoryParams) => Promise<void>;
  isLoading: boolean;
};

type CategoriesProviderProps = {
  children: React.ReactNode;
};

const api = window.api.categories;

const CategoriesContext = createContext<CategoriesProps>({} as CategoriesProps);

export function CategoriesProvider({ children }: CategoriesProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { notify } = useNotifications();

  const createCategory = useCallback(
    async (category: CreateCategoryParams) => {
      try {
        setIsLoading(true);
        await api.create(category);

        notify({
          message: 'A categoria foi cadastrada!',
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
    [notify]
  );

  return (
    <CategoriesContext.Provider value={{ createCategory, isLoading }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export const useCategories = (): CategoriesProps => {
  return useContext(CategoriesContext);
};
