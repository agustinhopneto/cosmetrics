import { contextBridge, ipcRenderer } from 'electron';
import { CreateProviderDTO } from './dtos/provider';
import { Routes } from './router';

contextBridge.exposeInMainWorld('api', {
  hello: (message: string) => ipcRenderer.invoke(Routes.Hello, message),
  providers: {
    create: (provider: CreateProviderDTO) =>
      ipcRenderer.invoke(Routes.Providers.Create, provider),
  },
});
