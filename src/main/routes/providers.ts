import { ipcMain } from 'electron';
import { CreateProviderDTO, UpdateProviderDTO } from 'main/dtos/provider';
import {
  createProvider,
  listProviders,
  updateProvider,
} from '../services/providers';
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

  ipcMain.handle(
    Routes.Providers.Update,
    async (_, provider: UpdateProviderDTO) => {
      return updateProvider(provider);
    }
  );
};

export default providers;
