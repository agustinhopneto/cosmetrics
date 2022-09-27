import { ActionIcon, Paper, ScrollArea, Table, Menu } from '@mantine/core';
import dayjs from 'dayjs';
import { useEffect, useState, useCallback } from 'react';
import { RiEdit2Fill, RiEyeFill, RiMoreFill } from 'react-icons/ri';
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
        <Paper p="sm" withBorder>
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
                      <Menu shadow="lg" width={200} withArrow withinPortal>
                        <Menu.Target>
                          <ActionIcon variant="light">
                            <RiMoreFill />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Label>Ações</Menu.Label>
                          <Menu.Item
                            color="pink"
                            icon={<RiEyeFill size={14} />}
                          >
                            Visualizar
                          </Menu.Item>
                          <Menu.Item
                            color="cyan"
                            icon={<RiEdit2Fill size={14} />}
                            onClick={() => handleEditProvider(provider)}
                          >
                            Editar
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
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
