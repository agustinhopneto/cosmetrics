import { ipcMain } from 'electron';
import { Category } from 'main/dtos/category';
import { createCategory, listProviders } from '../services/categories';
import { Routes } from '../router';

const categories = () => {
  ipcMain.handle(
    Routes.Categories.Create,
    async (_, category: Category.Create) => {
      return createCategory(category);
    }
  );

  ipcMain.handle(
    Routes.Categories.List,
    async (_, filters?: Category.Filters) => {
      return listProviders(filters);
    }
  );
};

export default categories;
