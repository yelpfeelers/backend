exports.up = knex => knex.schema.createTable('users', (tbl) => {
  tbl.increments();
  tbl.string('password').notNullable();
  tbl
    .string('username')
    .unique()
    .notNullable();

  tbl.timestamps(true, true);
  tbl.string('avatar');
});
// id,
// username,
// avatar,
// created_at,
exports.down = knex => knex.schema.dropTableIfExists('users');
