import { contextBridge, ipcRenderer } from 'electron';
import { Category } from './dtos/category';
import { Provider } from './dtos/provider';
import { Routes } from './router';

contextBridge.exposeInMainWorld('api', {
  hello: (message: string) => ipcRenderer.invoke(Routes.Hello, message),
  providers: {
    create: (provider: Provider.Create) =>
      ipcRenderer.invoke(Routes.Providers.Create, provider),
    list: (page: number, limit: number, filters?: Provider.Filters) =>
      ipcRenderer.invoke(Routes.Providers.List, page, limit, filters),
    update: (provider: Provider.Update) =>
      ipcRenderer.invoke(Routes.Providers.Update, provider),
  },
  categories: {
    create: (category: Category.Create) =>
      ipcRenderer.invoke(Routes.Categories.Create, category),
    list: (filters?: Category.Filters) =>
      ipcRenderer.invoke(Routes.Categories.List, filters),
  },
});
