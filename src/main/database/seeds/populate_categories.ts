import { Knex } from 'knex';
import { faker } from '@faker-js/faker';
import { Category } from '../../dtos/category';
import { seedConfig } from '../config';

export async function seed(knex: Knex): Promise<void> {
  await knex('categories').del();

  const categories: Partial<Category>[] = [];

  for (let id = 1; id <= seedConfig.categoriesAmount; id++) {
    categories.push({
      id,
      name: faker.science.chemicalElement().name,
      color: faker.color.rgb({ format: 'hex', casing: 'lower' }),
      description: faker.lorem.paragraph(1),
    });
  }

  await knex('categories').insert(categories);
}
