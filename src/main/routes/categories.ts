import { ipcMain } from 'electron';
import { Category } from 'main/dtos/category';
import { createCategory } from '../services/categories';
import { Routes } from '../router';

const categories = () => {
  ipcMain.handle(
    Routes.Categories.Create,
    async (_, category: Category.Create) => {
      return createCategory(category);
    }
  );
};

export default categories;
