import dayjs from 'dayjs';
import {
  CreateProviderDTO,
  Provider,
  UpdateProviderDTO,
} from '../dtos/provider';
import { knex } from '../database/connection';
import { Paginated } from '../dtos';

export const createProvider = async (
  provider: CreateProviderDTO
): Promise<Provider> => {
  const [providerExists] = await knex<Provider>('providers')
    .select('*')
    .whereRaw('UPPER(name) = ?', [provider.name.toUpperCase()])
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
  limit: number
): Promise<Paginated<Provider>> => {
  const offset = (page - 1) * limit;

  const [{ count: total }] = await knex<number>('providers').count({
    count: '*',
  });

  const totalPages = Math.ceil(Number(total) / limit);

  const result = await knex<Provider>('providers')
    .offset(offset)
    .limit(limit)
    .select('*')
    .orderBy('id', 'desc');

  return {
    total: total as number,
    totalPages,
    result,
  };
};

export const updateProvider = async (provider: UpdateProviderDTO) => {
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
