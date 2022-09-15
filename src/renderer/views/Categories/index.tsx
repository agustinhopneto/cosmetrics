import { useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { AppHeader } from 'renderer/components/AppHeader';
import { Button } from 'renderer/components/Button';
import { CategoryModal } from './CategoryModal';

export function IngredientsCategories() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <AppHeader title="Categorias">
        <Button onClick={() => setOpened(true)} leftIcon={<RiAddLine />}>
          Nova Categoria
        </Button>
      </AppHeader>
      <CategoryModal opened={opened} setOpened={setOpened} />
    </>
  );
}
