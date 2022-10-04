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

export type CategoryFilters = Pick<Category, 'name'>;

export type CreateCategoryParams = Pick<
  Category,
  'name' | 'color' | 'description'
>;

export type UpdateCategoryParams = Pick<
  Category,
  'id' | 'name' | 'color' | 'description'
>;

type CategoriesProps = {
  categories: Category[];
  createCategory: (category: CreateCategoryParams) => Promise<void>;
  listCategories: () => Promise<void>;
  updateCategory: (category: UpdateCategoryParams) => Promise<void>;
  isLoading: boolean;
  filters?: CategoryFilters;
  setFilters: (filters?: CategoryFilters) => void;
};

type CategoriesProviderProps = {
  children: React.ReactNode;
};

const api = window.api.categories;

const CategoriesContext = createContext<CategoriesProps>({} as CategoriesProps);

export function CategoriesProvider({ children }: CategoriesProviderProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState<CategoryFilters | undefined>(
    undefined
  );

  const [isLoading, setIsLoading] = useState(false);
  const { notify } = useNotifications();

  const createCategory = useCallback(
    async (category: CreateCategoryParams) => {
      try {
        setIsLoading(true);

        const createdCategory = await api.create(category);

        setCategories([createdCategory, ...categories]);

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
    [notify, categories]
  );

  const listCategories = useCallback(async () => {
    setIsLoading(true);
    const listedCategories = await api.list(filters);

    setCategories(listedCategories);
    setIsLoading(false);
  }, [filters]);

  const updateCategory = useCallback(
    async (category: UpdateCategoryParams) => {
      try {
        setIsLoading(true);
        const updatedCategory = await api.update(category);

        const newCategories = categories;

        const categoryIndex = newCategories.findIndex(
          (item) => item.id === category.id
        );

        newCategories[categoryIndex] = updatedCategory;

        setCategories(newCategories);
        notify({
          message: 'A categoria foi atualizada!',
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
    [notify, categories]
  );

  return (
    <CategoriesContext.Provider
      value={{
        createCategory,
        listCategories,
        updateCategory,
        categories,
        setFilters,
        filters,
        isLoading,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export const useCategories = (): CategoriesProps => {
  return useContext(CategoriesContext);
};
