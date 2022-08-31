import { knex } from '../database/connection';

export const createProvider = async () => {
  try {
    const response = await knex('providers').insert({
      name: 'Agustinho Neto',
      phone: '11914873103',
      email: 'agustinho.pneto@gmail.com',
    });
    return response;
  } catch (err) {
    throw new Error('Something went wrong!');
  }
};
