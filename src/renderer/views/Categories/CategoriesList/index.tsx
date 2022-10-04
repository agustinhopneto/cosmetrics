import {
  Card,
  Group,
  SimpleGrid,
  Text,
  Stack,
  Divider,
  ActionIcon,
  Menu,
} from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { RiEdit2Fill, RiMoreFill } from 'react-icons/ri';
import { Category, useCategories } from '../../../hooks/categories';
import { CategoryModal } from '../CategoryModal';

export function CategoriesList() {
  const [opened, setOpened] = useState(false);
  const { listCategories, categories } = useCategories();
  const [editCategory, setEditCategory] = useState<Category>({} as Category);

  useEffect(() => {
    listCategories();
  }, [listCategories]);

  const handleEditCategory = useCallback((category: Category) => {
    setEditCategory(category);
    setOpened(true);
  }, []);

  return (
    <>
      <SimpleGrid spacing="sm" cols={4}>
        {categories.map((category) => (
          <Card key={category.id} p="md" radius="sm" withBorder>
            <Card.Section
              p={4}
              sx={{ backgroundColor: category.color }}
              mb="sm"
            />
            <Stack spacing="xs">
              <Group position="apart">
                <Text weight={500} sx={{ lineHeight: 1.3 }}>
                  {`#${category.id} - ${category.name}`}
                </Text>
                <Menu shadow="lg" width={200} withArrow withinPortal>
                  <Menu.Target>
                    <ActionIcon variant="light">
                      <RiMoreFill />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Opções</Menu.Label>
                    <Menu.Item
                      onClick={() => handleEditCategory(category)}
                      color="cyan"
                      icon={<RiEdit2Fill size={14} />}
                    >
                      Editar
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
              <Divider />
              <Text size="sm" weight={300} sx={{ lineHeight: 1.3 }}>
                {category.description || 'Sem descrição...'}
              </Text>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
      <CategoryModal
        opened={opened}
        setOpened={setOpened}
        isEditing
        category={editCategory}
      />
    </>
  );
}
