import { LoadingOverlay } from '@mantine/core';
import { useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { Button } from '../../components/Button';
import { useCategories } from '../../hooks/categories';
import { AppHeader } from '../../components/AppHeader';
import { CategoryModal } from './CategoryModal';
import { CategoriesList } from './CategoriesList';
import { CategoriesFilters } from './CategoriesFilters';

export function IngredientsCategories() {
  const [opened, setOpened] = useState(false);
  const { isLoading } = useCategories();

  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <AppHeader title="Categorias">
        <Button onClick={() => setOpened(true)} leftIcon={<RiAddLine />}>
          Nova Categoria
        </Button>
      </AppHeader>
      <CategoriesFilters />
      <CategoryModal opened={opened} setOpened={setOpened} />
      <CategoriesList />
    </>
  );
}
