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
import { RiAddLine, RiEdit2Line } from 'react-icons/ri';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../../../components/Button';
import {
  validateColor,
  validateDescription,
  validateName,
} from '../../../utils/validations';
import {
  CreateCategoryParams,
  UpdateCategoryParams,
  useCategories,
} from '../../../hooks/categories';

type CategoryModalProps = {
  opened?: boolean;
  setOpened: (modalState: boolean) => void;
  isEditing?: boolean;
  category?: CreateCategoryParams | UpdateCategoryParams;
};

export function CategoryModal({
  opened = false,
  setOpened,
  isEditing = false,
  category,
}: CategoryModalProps) {
  const { createCategory, updateCategory } = useCategories();
  const [isFormReadyToEdit, setIsFormReadyToEdit] = useState(isEditing);

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
    clearInputErrorOnChange: true,
  });

  useEffect(() => {
    if (isFormReadyToEdit && category && opened) {
      form.setValues({
        name: category.name ? category.name : '',
        color: category.color ? category.color : '',
        description: category.description ? category.description : '',
      });

      setIsFormReadyToEdit(false);
    }
  }, [form, isFormReadyToEdit, category, setIsFormReadyToEdit, opened]);

  const handleSubmit = useCallback(
    async (params: CreateCategoryParams | UpdateCategoryParams) => {
      if (isEditing && category) {
        await updateCategory({
          ...(category as UpdateCategoryParams),
          ...params,
        });
      } else {
        await createCategory(params as CreateCategoryParams);
      }

      form.reset();
      setOpened(false);
      setIsFormReadyToEdit(true);
    },
    [setOpened, form, createCategory, category, updateCategory, isEditing]
  );

  const handleCloseModal = useCallback(() => {
    form.clearErrors();
    setOpened(false);
    setIsFormReadyToEdit(true);
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
            <Button
              leftIcon={isEditing ? <RiEdit2Line /> : <RiAddLine />}
              type="submit"
            >
              {isEditing ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </Box>
        </Stack>
      </form>
    </Modal>
  );
}
