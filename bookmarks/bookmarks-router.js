const server = require('express').Router();

const BOOKMARKS = require('./bookmarks-model')
const passport = require('passport')
const db = require('../data/dbConfig')
const errHelper = require('../errors/errorHelper');
const auth = passport.authenticate('jwt', { session: false });
const USER = require("../users/user-model")
const bookmarksValidation = require('../validation/bookmarksValidation')

//helper
const getAllBookmarks = async (req, res) => {
  try {

    let users = await USER.find(req.query)

    const results = users.data.map(async (user) => {
      let bookmark = await db.select("m.user_id", "b.*").from('user_bookmarks as m').join('bookmarks as b', 'b.id', 'm.bookmark_id').where({ user_id: user.id })

      user.bookmark = bookmark;
      return user
    })

    Promise.all(results).then(completed => {
      users.data = completed;
      res.status(200).json(users)
    })

  } catch (err) {
    return errHelper(500, err, res)
  }
}

// @route    GET api/booksmarks
// @desc     get all bookmarks
// @Access   Public 
server.get('/', auth, async (req, res) => {
  getAllBookmarks(req, res);
});

// @route    GET api/bookmarks/:id
// @desc     get by id 
// @Access   private
server.get('/:id', auth, async (req, res) => {
  const { id } = req.params
  try {
    const bookmarks = await db.select("m.user_id", "b.*").from('user_bookmarks as m').join('bookmarks as b', 'b.id', 'm.bookmark_id').where({ user_id: req.user.id, bookmark_id: id }).first()
    console.log(req.user.id)
    if (bookmarks) {
      res.status(200).json(bookmarks)
    } else {
      return errHelper(404, 'bookmark not found', res)
    }

  } catch (err) {
    return errHelper(500, err, res)
  }
});

// @route    POST api/bookmarks
// @desc     post bookmark
// @Access   private
server.post('/', auth, async (req, res) => {
  const { errors, isValid } = bookmarksValidation(req.body);
  if (!isValid) {
    return errHelper(400, errors, res);
  }

  try {
    const [posted] = await BOOKMARKS.insert(req.body).returning("id");
    if (posted) {
      await db.insert({
        user_id: req.user.id,
        bookmark_id: posted
      }).into("user_bookmarks");
      getAllBookmarks(req, res);
    } else {
      return errHelper(400, "failed to bookmark yelp business", res)

    }
  } catch (err) {
    return errHelper(500, err, res)
  }
});

// @route    DELETE api/bookmark/:id
// @desc     Delete Bookmark
// @Access   Public
server.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const exists = await db.select().from('user_bookmarks').where({ bookmark_id: id }).first();

    if (exists) {

      if (req.user.id !== exists.user_id) {

        return errHelper(400, "Cannot delete someones bookmark", res)

      } else {
        await BOOKMARKS.remove({ id })
        getAllBookmarks(req, res);
      }

    } else {
      return res.status(404).json({ message: "bookmark with that id does not exists" });
    }
  } catch (err) {
    return errHelper(500, err, res)
  }
});

// @route    PUT api/bookmark/:id
// @desc     update Bookmark
// @Access   private
server.put('/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const exists = await db.select().from('user_bookmarks').where({ bookmark_id: id }).first();

    if (exists) {

      if (req.user.id !== exists.user_id) {

        return errHelper(400, "Cannot update someones bookmark", res)

      } else {
        await BOOKMARKS.update({ id }, req.body)
        getAllBookmarks(req, res);
      }

    } else {
      return res.status(404).json({ message: "bookmark with that id does not exists" });
    }
  } catch (err) {
    return errHelper(500, err, res)
  }
});

module.exports = server;

