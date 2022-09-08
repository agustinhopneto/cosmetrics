import { ipcMain } from 'electron';
import {
  CreateProviderDTO,
  FilterProvidersDTO,
  UpdateProviderDTO,
} from '../dtos/provider';
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
    async (_, page: number, limit: number, filters: FilterProvidersDTO) => {
      return listProviders(page, limit, filters);
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
