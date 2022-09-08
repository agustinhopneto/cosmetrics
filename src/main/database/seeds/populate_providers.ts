import { Knex } from 'knex';
import { faker } from '@faker-js/faker';
import { Provider } from '../../dtos/provider';
import { seedConfig } from './config';

export async function seed(knex: Knex): Promise<void> {
  await knex('providers').del();

  const providers: Partial<Provider>[] = [];

  for (let i = 0; i < seedConfig.providersAmount; i++) {
    providers.push({
      name: faker.company.name(),
      email: faker.internet.email().toLowerCase(),
      phone: faker.phone.number(),
    });
  }

  await knex('providers').insert(providers);
}
