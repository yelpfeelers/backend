exports.up = knex => knex.schema.createTable('reviews', (tbl) => {
  tbl.increments();
  tbl.string('url')
  tbl.string('text')
  tbl.integer('rating')
  tbl.string('business_id') //reviews for business_id
  tbl
    .integer("user_id")
    .unsigned()
    .notNullable()
    .references("id")
    .inTable("users")
    .onDelete('CASCADE')

  tbl.timestamps(true, true);
});
exports.down = knex => knex.schema.dropTableIfExists('reviews');
