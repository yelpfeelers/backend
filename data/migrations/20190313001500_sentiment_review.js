
exports.up = (knex) => {
  return knex.schema.createTable('sentiment_review', tbl => {
    tbl.string('id');
    tbl.string('name');
    tbl.specificType('reviews', knex.raw('text[]'));
  })
};


exports.down = (knex) => {
  return knex.schema.dropTableIfExists('sentiment_review')
};




