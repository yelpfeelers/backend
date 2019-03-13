exports.up = function (knex, Promise) {
  return knex.schema.createTable("user_bookmarks", tbl => {
    tbl
      .integer("bookmark_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("bookmarks")
      .onDelete('CASCADE')
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete('CASCADE')

    tbl.primary(["bookmark_id", "user_id"]);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("user_bookmarks");
};