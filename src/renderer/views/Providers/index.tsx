import { LoadingOverlay } from '@mantine/core';
import { useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { AppHeader } from 'renderer/components/AppHeader';
import { useProviders } from '../../hooks/providers';
import { Button } from '../../components/Button';
import { ProvidersTable } from './ProvidersTable';
import { ProviderModal } from './ProviderModal';
import { ProvidersFilters } from './ProvidersFilters';

export function Providers() {
  const [opened, setOpened] = useState(false);

  const { isLoading } = useProviders();

  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <AppHeader title="Fornecedores">
        <Button onClick={() => setOpened(true)} leftIcon={<RiAddLine />}>
          Novo Fornecedor
        </Button>
      </AppHeader>
      <ProvidersFilters />
      <ProvidersTable />
      <ProviderModal opened={opened} setOpened={setOpened} />
    </>
  );
}
