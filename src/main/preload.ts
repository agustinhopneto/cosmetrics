import { contextBridge, ipcRenderer } from 'electron';
import { Routes } from './router';

contextBridge.exposeInMainWorld('api', {
  hello: (message: string) => ipcRenderer.invoke(Routes.Hello, message),
});
