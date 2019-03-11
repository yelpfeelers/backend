const knex = require('knex');
const paginator = require('knex-paginator');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.production);
paginator(db);
module.exports = db;
