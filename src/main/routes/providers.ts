import { ipcMain } from 'electron';
import { CreateProviderDTO } from 'main/dtos/provider';
import { createProvider, listProviders } from '../services/providers';
import { Routes } from '../router';

const providers = () => {
  ipcMain.handle(
    Routes.Providers.Create,
    async (_, provider: CreateProviderDTO) => {
      return createProvider(provider);
    }
  );

  ipcMain.handle(
    Routes.Providers.List,
    async (_, page: number, limit: number) => {
      return listProviders(page, limit);
    }
  );
};

export default providers;
