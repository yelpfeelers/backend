require('dotenv').config();
const pg = require('pg');

pg.defaults.ssl = true;

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
