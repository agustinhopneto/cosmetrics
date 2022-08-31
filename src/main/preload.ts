import { contextBridge, ipcRenderer } from 'electron';
import { Routes } from './router';

contextBridge.exposeInMainWorld('api', {
  hello: (message: string) => ipcRenderer.invoke(Routes.Hello, message),
  providers: {
    create: () => ipcRenderer.invoke(Routes.Providers.Create),
  },
});
