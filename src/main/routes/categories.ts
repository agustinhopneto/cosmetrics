import { ipcMain } from 'electron';
import { Category } from '../dtos/category';
import {
  createCategory,
  listCategories,
  updateCategory,
} from '../services/categories';
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
      return listCategories(filters);
    }
  );

  ipcMain.handle(
    Routes.Categories.Update,
    async (_, category: Category.Update) => {
      return updateCategory(category);
    }
  );
};

export default categories;
