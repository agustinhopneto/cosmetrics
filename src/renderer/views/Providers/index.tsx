import {
  Box,
  LoadingOverlay,
  Modal,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useCallback, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { useForm } from '@mantine/form';
import { CreateProviderParams, useProviders } from '../../hooks/providers';
import { Button } from '../../components/Button';
import { useStyles } from './styles';
import {
  validateEmail,
  validateName,
  validatePhone,
} from '../../utils/validations';

export function Providers() {
  const { classes } = useStyles();

  const [opened, setOpened] = useState(false);

  const { createProvider, isLoading } = useProviders();

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
    [form, createProvider]
  );

  const handleCloseCreateProviderModal = useCallback(() => {
    form.clearErrors();
    setOpened(false);
  }, [form]);

  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Box className={classes.header}>
        <Title>Fornecedores</Title>
        <Button
          onClick={() => setOpened(true)}
          color="cyan"
          leftIcon={<RiAddLine />}
        >
          Novo Fornecedor
        </Button>
      </Box>
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
            <Button type="submit" color="cyan">
              Cadastrar
            </Button>
          </Box>
        </form>
      </Modal>
    </>
  );
}
