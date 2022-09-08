import { Group, Paper, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback } from 'react';
import { RiBrush2Line, RiFilter2Line } from 'react-icons/ri';
import { ProviderFilters, useProviders } from '../../../hooks/providers';
import { Button } from '../../../components/Button';

export function ProvidersFilters() {
  const { setFilters, setPage } = useProviders();

  const form = useForm<ProviderFilters>({
    initialValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const handleClearFilters = useCallback(() => {
    form.reset();
  }, [form]);

  const handleSubmit = useCallback(
    (values: ProviderFilters) => {
      setPage(1);
      setFilters(values);
    },
    [setFilters, setPage]
  );

  return (
    <Paper p="xl" mb="xl">
      <Text size="lg" weight={500} mb="md">
        Filtros
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group grow mb="md" spacing="sm">
          <TextInput
            placeholder="Nome do fornecedor"
            label="Nome"
            {...form.getInputProps('name')}
          />
          <TextInput
            placeholder="email@exemplo.com"
            label="Email"
            {...form.getInputProps('email')}
          />
          <TextInput
            placeholder="(xx) xxxxx-xxxx"
            label="Telefone"
            {...form.getInputProps('phone')}
          />
        </Group>
        <Group position="right" spacing="sm">
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
