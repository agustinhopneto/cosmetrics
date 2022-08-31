import { ipcMain } from 'electron';
import { createProvider } from '../services/providers';
import { Routes } from '../router';

const providers = () => {
  ipcMain.handle(Routes.Providers.Create, async () => {
    return createProvider();
  });
};

export default providers;
