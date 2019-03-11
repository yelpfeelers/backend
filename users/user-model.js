const db = require('../data/dbConfig');
// get all & query name & pagination
// query by firstname
function find(query) {
  const { limit = 10, page = 1, name } = query;
  let table;
  if (!name) {
    table = db
      .select()
      .from('users')
      .orderBy('id', 'desc')
      .paginate(limit, page, true);
  } else {
    table = db
      .select()
      .from('users')
      .orderBy('id', 'desc')
      .where('firstname', 'like', `%${name}%`)
      .paginate(limit, page, true);
  }

  return table;
}
// find by id
function findById(id) {
  return db
    .select()
    .from('users')
    .where(id)
    .first();
}
function findBy(query) {
  return db
    .select()
    .from('users')
    .where(query)
    .first();
}
function insert(post) {
  return db.insert(post).into('users');
}
function update(id, changes) {
  return db
    .update(changes)
    .from('users')
    .where({ id });
}
function remove(id) {
  return db
    .del()
    .from('users')
    .where({ id });
}


module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
  findBy,
};
