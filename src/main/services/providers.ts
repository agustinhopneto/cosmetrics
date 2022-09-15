import dayjs from 'dayjs';
import { clearFilters } from '../utils/clearFilters';
import { Provider } from '../dtos/provider';
import { knex } from '../database/connection';
import { Paginated } from '../dtos';

export const createProvider = async (
  provider: Provider.Create
): Promise<Provider> => {
  const [providerExists] = await knex<Provider>('providers')
    .select('*')
    .whereRaw('UPPER(name) = UPPER(?)', [provider.name])
    .limit(1);

  if (providerExists) {
    throw new Error('Fornecedor já existe!');
  }

  const [id] = await knex('providers').insert(provider);

  const [insertedProvider] = await knex<Provider>('providers')
    .select('*')
    .where({
      id,
    })
    .limit(1);

  return insertedProvider;
};

export const listProviders = async (
  page: number,
  limit: number,
  filters?: Provider.Filters
): Promise<Paginated<Provider>> => {
  const query = knex<Provider>('providers');

  if (filters) {
    Object.entries(clearFilters(filters)).forEach(([filter, value], index) => {
      if (index === 0) {
        query.whereLike(filter, `%${value}%`);
        return;
      }
      query.andWhereLike(filter, `%${value}%`);
    });
  }

  const countQuery = query.clone();

  const [{ count: total }] = await countQuery.count({
    count: '*',
  });

  const offset = (page - 1) * limit;

  const result = await query
    .select('*')
    .offset(offset)
    .limit(limit)
    .orderBy('id', 'desc');

  const totalPages = Math.ceil(Number(total) / limit);

  return {
    total: total as number,
    totalPages,
    result,
  };
};

export const updateProvider = async (provider: Provider.Update) => {
  const [providerExists] = await knex<Provider>('providers')
    .select('*')
    .whereRaw('UPPER(name) = ?', [provider.name.toUpperCase()])
    .limit(1);

  if (providerExists && providerExists.id !== provider.id) {
    throw new Error('Fornecedor já existe!');
  }

  await knex<Provider>('providers')
    .update({ ...provider, updated_at: dayjs().toISOString() })
    .where({ id: provider.id });

  const [updatedProvider] = await knex<Provider>('providers')
    .select('*')
    .where({
      id: provider.id,
    })
    .limit(1);

  return updatedProvider;
};
