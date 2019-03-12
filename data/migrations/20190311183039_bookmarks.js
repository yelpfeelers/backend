
exports.up = (knex) => {
  return knex.schema.createTable('bookmarks', tbl => {
    tbl.increments()
  })
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('bookmarks')
};
