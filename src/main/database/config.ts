import { Knex } from 'knex';
import path from 'path';

export const knexConfig: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite'),
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
