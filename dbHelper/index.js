const db = require('../data/dbConfig');
const sqliteErrors = require('../errors/errorCode');


// get all & query name & pagination
// query by firstname
function find(tbl, query) {
  const { limit = 10, page = 1, name } = query;
  let table;
  if (!name) {
    table = db
      .select()
      .from(tbl)
      .orderBy('id', 'desc')
      .paginate(limit, page, true);
  } else {
    table = db
      .select()
      .from(tbl)
      .orderBy('id', 'desc')
      .where('firstname', 'like', `%${name}%`)
      .paginate(limit, page, true);
  }

  return table;
}
// find by id
function findById(tbl, id) {
  return db
    .select()
    .from(tbl)
    .where(id)
    .first();
}
function findBy(tbl, quert) {
  return db
    .select()
    .from(tbl)
    .where(quert)
    .first();
}
function insert(tbl, post) {
  return db.insert(post).into(tbl);
}
function update(tbl, id, changes) {
  return db
    .update(changes)
    .from(tbl)
    .where({ id });
}
function remove(tbl, id) {
  return db
    .del()
    .from(tbl)
    .where({ id });
}
function errHelper(res, code, err) {
  const error = err && err.errno ? sqliteErrors[err.errno] : err;
  res.status(code).json({ message: error });
}


module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
  errHelper,
  findBy,
};
