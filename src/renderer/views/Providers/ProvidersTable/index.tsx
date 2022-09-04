import { Paper, ScrollArea, Table } from '@mantine/core';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useProviders } from '../../../hooks/providers';
import { pageLimits, Pagination } from '../../../components/Pagination';

export function ProvidersTable() {
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState<string | null>(pageLimits[0]);

  const { providers, listProviders } = useProviders();

  useEffect(() => {
    listProviders(page, Number(pageLimit));
  }, [listProviders, page, pageLimit]);

  return (
    <>
      <ScrollArea>
        <Paper>
          <Table highlightOnHover horizontalSpacing="xl" verticalSpacing="md">
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
              {providers.result &&
                providers.result.map((provider) => (
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
      <Pagination
        page={page}
        pageLimit={pageLimit}
        setPage={setPage}
        setPageLimit={setPageLimit}
        totalItems={providers.total}
        totalPages={providers.totalPages}
      />
    </>
  );
}
