import { ipcMain } from 'electron';
import { CreateProviderDTO } from 'main/dtos/provider';
import { createProvider } from '../services/providers';
import { Routes } from '../router';

const providers = () => {
  ipcMain.handle(
    Routes.Providers.Create,
    async (_, provider: CreateProviderDTO) => {
      return createProvider(provider);
    }
  );
};

export default providers;
