import _knex from 'knex';
import { knexConfig } from './config';

export const knex = _knex(knexConfig);
