import {
  Box,
  LoadingOverlay,
  Modal,
  Pagination,
  Paper,
  ScrollArea,
  Stack,
  Table,
  TextInput,
  Title,
  Text,
  Select,
} from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';
import { CreateProviderParams, useProviders } from '../../hooks/providers';
import { Button } from '../../components/Button';
import { useStyles } from './styles';
import {
  validateEmail,
  validateName,
  validatePhone,
} from '../../utils/validations';

const limits = ['10', '20', '50', '100'];

export function Providers() {
  const { classes } = useStyles();

  const [opened, setOpened] = useState(false);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState<string | null>(limits[0]);

  const { providers, createProvider, listProviders, isLoading } =
    useProviders();

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

  useEffect(() => {
    listProviders(page, Number(pageLimit));
  }, [listProviders, page, pageLimit]);

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
        <Button onClick={() => setOpened(true)} leftIcon={<RiAddLine />}>
          Novo Fornecedor
        </Button>
      </Box>
      {providers.result && (
        <>
          <ScrollArea>
            <Paper>
              <Table
                highlightOnHover
                horizontalSpacing="xl"
                verticalSpacing="md"
              >
                <thead>
                  <tr>
                    <th>#ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Data de Cadastro</th>
                  </tr>
                </thead>
                <tbody>
                  {providers.result.map((provider) => (
                    <tr key={provider.id}>
                      <td>#{provider.id}</td>
                      <td>{provider.name}</td>
                      <td>{provider.email}</td>
                      <td>{provider.phone}</td>
                      <td>{dayjs(provider.created_at).format('DD/MM/YYYY')}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Paper>
          </ScrollArea>
          <Paper className={classes.pagination} p="xl">
            <Box className={classes.paginationContent}>
              <Text>{providers.total} itens |</Text>
              <Select
                className={classes.paginationLimit}
                value={pageLimit}
                onChange={setPageLimit}
                data={limits}
              />
              <Text>/ página</Text>
            </Box>
            <Pagination
              page={page}
              onChange={setPage}
              total={providers.totalPages}
            />
          </Paper>
        </>
      )}
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
    </>
  );
}
