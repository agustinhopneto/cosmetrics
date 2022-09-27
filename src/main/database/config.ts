import { Knex } from 'knex';
import path from 'path';

export const dbPath =
  process.env.NODE_ENV === 'development'
    ? path.resolve(__dirname, 'database.sqlite')
    : path.resolve(
        __dirname,
        'resources',
        'src',
        'main',
        'database',
        'database.sqlite'
      );

export const knexConfig: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  migrations: {
    tableName: '@knex_migrations',
    directory: path.resolve(__dirname, 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'seeds'),
  },
  useNullAsDefault: true,
};

export const seedConfig = {
  providersAmount: 50,
  categoriesAmount: 12,
};
