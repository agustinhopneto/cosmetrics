import { Group, Paper, TextInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback } from 'react';
import { RiBrush2Line, RiFilter2Line } from 'react-icons/ri';
import { CategoryFilters, useCategories } from '../../../hooks/categories';
import { Button } from '../../../components/Button';

export function CategoriesFilters() {
  const { setFilters } = useCategories();

  const form = useForm<CategoryFilters>({
    initialValues: {
      name: '',
    },
  });

  const handleClearFilters = useCallback(() => {
    form.reset();
  }, [form]);

  const handleSubmit = useCallback(
    (values: CategoryFilters) => {
      setFilters(values);
    },
    [setFilters]
  );

  return (
    <Paper p="xl" mb="xl" withBorder>
      <Text size="lg" weight={500} mb="md">
        Filtros
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          sx={{ width: '100%', maxWidth: 500 }}
          placeholder="Nome da categoria"
          label="Nome"
          mb="md"
          {...form.getInputProps('name')}
        />

        <Group position="right">
          <Button
            onClick={handleClearFilters}
            color="cyan"
            variant="outline"
            leftIcon={<RiBrush2Line />}
          >
            Limpar
          </Button>
          <Button type="submit" leftIcon={<RiFilter2Line />}>
            Filtrar
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
