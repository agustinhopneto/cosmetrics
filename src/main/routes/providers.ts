import { ipcMain } from 'electron';
import { Provider } from '../dtos/provider';
import {
  createProvider,
  listProviders,
  updateProvider,
} from '../services/providers';
import { Routes } from '../router';

const providers = () => {
  ipcMain.handle(
    Routes.Providers.Create,
    async (_, provider: Provider.Create) => {
      return createProvider(provider);
    }
  );

  ipcMain.handle(
    Routes.Providers.List,
    async (_, page: number, limit: number, filters: Provider.Filters) => {
      return listProviders(page, limit, filters);
    }
  );

  ipcMain.handle(
    Routes.Providers.Update,
    async (_, provider: Provider.Update) => {
      return updateProvider(provider);
    }
  );
};

export default providers;
