import { CreateProviderDTO, Provider } from '../dtos/provider';
import { knex } from '../database/connection';

export const createProvider = async (
  provider: CreateProviderDTO
): Promise<Provider> => {
  try {
    const [id] = await knex('providers').insert(provider);

    const [insertedProvider] = await knex<Provider>('providers')
      .select('*')
      .where({
        id,
      });

    return insertedProvider;
  } catch (err) {
    throw new Error('Something went wrong!');
  }
};
