import { contextBridge, ipcRenderer } from 'electron';
import { CreateProviderDTO, UpdateProviderDTO } from './dtos/provider';
import { Routes } from './router';

contextBridge.exposeInMainWorld('api', {
  hello: (message: string) => ipcRenderer.invoke(Routes.Hello, message),
  providers: {
    create: (provider: CreateProviderDTO) =>
      ipcRenderer.invoke(Routes.Providers.Create, provider),
    list: (page: number, limit: number) =>
      ipcRenderer.invoke(Routes.Providers.List, page, limit),
    update: (provider: UpdateProviderDTO) =>
      ipcRenderer.invoke(Routes.Providers.Update, provider),
  },
});
