import { CreateProviderDTO, Provider } from '../dtos/provider';
import { knex } from '../database/connection';

export const createProvider = async (
  provider: CreateProviderDTO
): Promise<Provider> => {
  const [providersExists] = await knex<Provider>('providers')
    .select('*')
    .whereRaw('UPPER(name) = ?', [provider.name.toUpperCase()])
    .limit(1);

  if (providersExists) {
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
