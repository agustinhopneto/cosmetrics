import { Box, Button, Modal, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback, useEffect, useState } from 'react';
import {
  CreateProviderParams,
  UpdateProviderParams,
  useProviders,
} from '../../../hooks/providers';
import {
  validateEmail,
  validateName,
  validatePhone,
} from '../../../utils/validations';

type ProviderModalProps = {
  opened: boolean;
  setOpened: (modalState: boolean) => void;
  provider?: CreateProviderParams | UpdateProviderParams;
  isEditing?: boolean;
};
export function ProviderModal({
  opened = false,
  setOpened,
  provider,
  isEditing = false,
}: ProviderModalProps) {
  const { createProvider, updateProvider } = useProviders();
  const [isFormReadyToEdit, setIsFormReadyToEdit] = useState(isEditing);

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
    clearInputErrorOnChange: true,
  });

  useEffect(() => {
    if (isFormReadyToEdit && provider && opened) {
      form.setValues({
        name: provider.name ? provider.name : '',
        email: provider.email ? provider.email : '',
        phone: provider.phone ? provider.phone : '',
      });

      setIsFormReadyToEdit(false);
    }
  }, [form, isFormReadyToEdit, provider, setIsFormReadyToEdit, opened]);

  const handleSubmit = useCallback(
    async (params: CreateProviderParams | UpdateProviderParams) => {
      if (isEditing && provider) {
        await updateProvider({
          ...(provider as UpdateProviderParams),
          ...params,
        });
      } else {
        await createProvider(params as UpdateProviderParams);
      }

      form.reset();
      setOpened(false);
      setIsFormReadyToEdit(true);
    },
    [form, createProvider, setOpened, isEditing, updateProvider, provider]
  );

  const handleCloseCreateProviderModal = useCallback(() => {
    form.clearErrors();
    setOpened(false);
    setIsFormReadyToEdit(true);
  }, [form, setOpened]);

  return (
    <Modal
      size="lg"
      centered
      opened={opened}
      onClose={handleCloseCreateProviderModal}
      title="Novo Fornecedor"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
          <Button type="submit">{isEditing ? 'Atualizar' : 'Cadastrar'}</Button>
        </Box>
      </form>
    </Modal>
  );
}
