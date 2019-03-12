const server = require('express').Router();
const passport = require('passport')

const BOOKMARKS = require('./bookmarks-model')
const db = require('../data/dbConfig')
const errHelper = require('../errors/errorHelper');
const auth = passport.authenticate('jwt', { session: false });



//helper
const getAllBookmarks = async (req, res) => {
  try {
    const bookmarks = await db.select().from('user_bookmarks').join('bookmarks as b')
    console.log(req.user)
    res.status(200).json(bookmarks)

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

// @route    GET api/bookmarks
// @desc     post bookmark
// @Access   private
server.post('/', auth, async (req, res) => {
  try {
    const [posted] = await BOOKMARKS.insert(req.body);
    if (posted) {
      const bookmarks = await BOOKMARKS.find(req.query);

      res.status(200).json(bookmarks);
      console.log(req.user.id)
      await db.insert({
        user_id: req.user.id,
        bookmark_id: posted
      }).into("user_bookmarks");
    } else {
      return errHelper(500, "failed to bookmark project", res)

    }
  } catch (err) {
    return errHelper(500, err, res)
  }
});

module.exports = server;