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
import { useEffect } from 'react';
import { RiEdit2Fill, RiMoreFill } from 'react-icons/ri';
import { useCategories } from '../../../hooks/categories';

export function CategoriesList() {
  const { listCategories, categories } = useCategories();

  useEffect(() => {
    listCategories();
  }, [listCategories]);

  return (
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
                  <Menu.Item color="cyan" icon={<RiEdit2Fill size={14} />}>
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
  );
}
