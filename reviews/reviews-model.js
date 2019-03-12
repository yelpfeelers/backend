const db = require('../data/dbConfig');
// get all & query name & pagination
// query by firstname
function find(query) {
  const { limit = 10, page = 1, name } = query;
  let table;
  if (!name) {
    table = db
      .select()
      .from('reviews')
      .orderBy('id', 'desc')
      .paginate(limit, page, true);
  } else {
    table = db
      .select()
      .from('reviews')
      .orderBy('id', 'desc')
      .where('text', 'like', `%${name}%`)
      .paginate(limit, page, true);
  }

  return table;
}
// find by id
function findById(id) {
  return db
    .select()
    .from('reviews')
    .where(id)
    .first();
}
function findBy(query) {
  return db
    .select()
    .from('reviews')
    .where(query)

}
function insert(post) {
  return db.insert(post).into('reviews').returning("id");
}
function update(id, changes) {
  return db
    .update(changes)
    .from('reviews')
    .where(id);
}
function remove(id) {
  return db
    .del()
    .from('reviews')
    .where(id);
}


module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
  findBy,
};
