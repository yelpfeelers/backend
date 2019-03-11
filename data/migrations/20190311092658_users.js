exports.up = knex => knex.schema.createTable('users', (tbl) => {
  tbl.increments();
  tbl.string('password').notNullable();
  tbl
    .string('email')
    .unique()
    .notNullable();
  tbl
    .string('name')
    .notNullable();

  tbl.timestamps(true, true);
  tbl.string('avatar');
});
// id,
// username,
// email,
// firstname,
// lastname,
// avatar,
// created_at,
exports.down = knex => knex.schema.dropTableIfExists('users');
