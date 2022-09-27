import { knex } from '../database/connection';
import { Category } from '../dtos/category';

export const createCategory = async (category: Category.Create) => {
  const [categoryExists] = await knex<Category>('categories')
    .select('*')
    .whereRaw('UPPER(name) = UPPER(?)', [category.name])
    .limit(1);

  if (categoryExists) {
    throw new Error('Categoria já existe!');
  }

  const [id] = await knex('categories').insert(category);

  const [insertedCategory] = await knex<Category>('categories')
    .select('*')
    .where({
      id,
    })
    .limit(1);

  return insertedCategory;
};

export const listProviders = async (
  filters?: Category.Filters
): Promise<Category[]> => {
  const query = knex<Category>('categories');

  if (filters) {
    query.whereLike('name', `%${filters.name}%`);
  }

  const result = await query.select('*').orderBy('id', 'desc');

  return result;
};
