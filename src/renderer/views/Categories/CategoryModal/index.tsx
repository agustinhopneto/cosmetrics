import {
  Modal,
  Stack,
  TextInput,
  Textarea,
  ColorInput,
  Box,
  Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { RiAddLine } from 'react-icons/ri';
import { useCallback } from 'react';
import { Button } from '../../../components/Button';
import {
  validateColor,
  validateDescription,
  validateName,
} from '../../../utils/validations';
import { CreateCategoryParams, useCategories } from '../../../hooks/categories';

type CategoryModalProps = {
  opened: boolean;
  setOpened: (modalState: boolean) => void;
};

export function CategoryModal({ opened, setOpened }: CategoryModalProps) {
  const { createCategory } = useCategories();

  const form = useForm({
    initialValues: {
      name: '',
      color: '',
      description: '',
    },
    validate: {
      name: (value) => validateName(value),
      color: (value) => validateColor(value),
      description: (value) => validateDescription(value),
    },
  });

  const handleSubmit = useCallback(
    async (values: CreateCategoryParams) => {
      await createCategory(values);

      setOpened(false);
      form.reset();
    },
    [setOpened, form, createCategory]
  );

  const handleCloseModal = useCallback(() => {
    setOpened(false);
    form.reset();
  }, [setOpened, form]);

  return (
    <Modal
      size="lg"
      centered
      opened={opened}
      onClose={handleCloseModal}
      title="Novo Fornecedor"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="sm">
          <Group grow spacing="sm">
            <TextInput
              placeholder="Nome da categoria"
              label="Nome"
              withAsterisk
              {...form.getInputProps('name')}
            />
            <ColorInput
              label="Cor"
              withAsterisk
              {...form.getInputProps('color')}
            />
          </Group>
          <Textarea
            maxLength={200}
            placeholder="Essa categoria serve para várias coisas..."
            label="Descrição"
            {...form.getInputProps('description')}
          />
          <Box mt="xl" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button leftIcon={<RiAddLine />} type="submit">
              Cadastrar
            </Button>
          </Box>
        </Stack>
      </form>
    </Modal>
  );
}
