import { ActionIcon, Paper, ScrollArea, Group, Table } from '@mantine/core';
import dayjs from 'dayjs';
import { useEffect, useState, useCallback } from 'react';
import { RiEdit2Fill, RiEyeFill } from 'react-icons/ri';
import { Provider, useProviders } from '../../../hooks/providers';
import { Pagination } from '../../../components/Pagination';
import { ProviderModal } from '../ProviderModal';

export function ProvidersTable() {
  const [opened, setOpened] = useState(false);
  const [editProvider, setEditProvider] = useState<Provider>({} as Provider);

  const { providers, listProviders, page, pageLimit, setPage, setPageLimit } =
    useProviders();

  useEffect(() => {
    listProviders();
  }, [listProviders]);

  const handleEditProvider = useCallback((provider: Provider) => {
    setEditProvider(provider);
    setOpened(true);
  }, []);

  return (
    <>
      <ScrollArea>
        <Paper p="sm">
          <Table highlightOnHover horizontalSpacing="xl" verticalSpacing="md">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Data de Cadastro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {providers.result &&
                providers.result.map((provider) => (
                  <tr key={provider.id}>
                    <td>#{provider.id}</td>
                    <td>{provider.name}</td>
                    <td>{provider.email || '-------'}</td>
                    <td>{provider.phone || '-------'}</td>
                    <td>{dayjs(provider.created_at).format('DD/MM/YYYY')}</td>
                    <td>
                      <Group spacing={4}>
                        <ActionIcon color="pink" variant="subtle">
                          <RiEyeFill />
                        </ActionIcon>
                        <ActionIcon
                          onClick={() => handleEditProvider(provider)}
                          ml="sm"
                          color="cyan"
                          variant="subtle"
                        >
                          <RiEdit2Fill />
                        </ActionIcon>
                      </Group>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Paper>
      </ScrollArea>
      {providers.totalPages > 0 && (
        <Pagination
          page={page}
          pageLimit={pageLimit}
          setPage={setPage}
          setPageLimit={setPageLimit}
          totalItems={providers.total}
          totalPages={providers.totalPages}
        />
      )}
      <ProviderModal
        opened={opened}
        setOpened={setOpened}
        provider={editProvider}
        isEditing
      />
    </>
  );
}
