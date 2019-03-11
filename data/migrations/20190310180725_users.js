exports.up = knex => knex.schema.createTable('users', (tbl) => {
  tbl.increments();
  tbl.string('firstname').notNullable();
  tbl.string('lastname').notNullable();
  tbl.string('password').notNullable();
  tbl
    .string('email')
    .unique()
    .notNullable();
  tbl
    .string('username')
    .unique()
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
