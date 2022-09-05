import { Box, Button, Modal, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback } from 'react';
import { CreateProviderParams, useProviders } from '../../../hooks/providers';
import {
  validateEmail,
  validateName,
  validatePhone,
} from '../../../utils/validations';

type ProviderModalProps = {
  opened: boolean;
  setOpened: (modalState: boolean) => void;
};

export function ProviderModal({
  opened = false,
  setOpened,
}: ProviderModalProps) {
  const { createProvider } = useProviders();

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
    },
    validate: {
      name: (value) => validateName(value),
      email: (value) => validateEmail(value),
      phone: (value) => validatePhone(value),
    },
  });

  const handleCreateProvider = useCallback(
    async (values: CreateProviderParams) => {
      await createProvider(values);
      form.reset();
      setOpened(false);
    },
    [form, createProvider, setOpened]
  );

  const handleCloseCreateProviderModal = useCallback(() => {
    form.clearErrors();
    setOpened(false);
  }, [form, setOpened]);

  return (
    <Modal
      size="lg"
      centered
      opened={opened}
      onClose={handleCloseCreateProviderModal}
      title="Novo Fornecedor"
    >
      <form onSubmit={form.onSubmit(handleCreateProvider)}>
        <Stack spacing="sm">
          <TextInput
            placeholder="Nome do fornecedor"
            label="Nome"
            withAsterisk
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
        </Stack>
        <Box mt="xl" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit">Cadastrar</Button>
        </Box>
      </form>
    </Modal>
  );
}
