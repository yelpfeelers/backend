const server = require('express').Router();

const passport = require('passport')
const db = require('../data/dbConfig')
const errHelper = require('../errors/errorHelper');
const auth = passport.authenticate('jwt', { session: false });
const REVIEWS = require("./reviews-model")
const USER = require("../users/user-model")


const returnAllUsers = async (req, res) => {

  try {
    let users = await USER.find(req.query);

    const results = users.data.map(async (user) => {
      const reviews = await REVIEWS.findBy({ user_id: user.id });
      user.stars = 0.0 + reviews.reduce((acc, val) => acc += val.rating, 0) / reviews.length || 0;
      user.reviews = reviews;
      return user;

    });

    Promise.all(results).then(completed => {
      users.data = completed;
      res.status(200).json(users);
    });
  } catch (err) {
    return errHelper(500, err, res)
  }
}

// @route    GET api/reviews
// @desc     get all reviews t
// @Access   Private
server.get('/', auth, async (req, res) => {
  returnAllUsers(req, res);

});

// @route    GET api/reviews/:id
// @desc     get reviews by user id
// @Access   private
server.get('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    console.log(id)
    const reviews = await REVIEWS.findBy({ business_id: id })
    if (reviews.length) {
      res.status(200).json(reviews)
    } else {
      return errHelper(404, "reviews not found ", res)
    }
  } catch (err) {
    return errHelper(500, err, res)
  }
});




// @route    GET api/reviews
// @desc     post a review
// @Access   Private  
server.post('/', auth, async (req, res) => {
  //fields  [ url, text, rating, business_id, user_id, ] 
  const { url, text, rating, business_id, user_id = req.user.id } = req.body;
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'You need to give 1-5 stars' });

  }
  if (!business_id) {
    return errHelper(400, 'You need to specify who the review is for.', res)
  }
  try {
    const prevReview = await REVIEWS.findById({ business_id });
    if (prevReview) {
      return errHelper(405, 'You have already written a review for that business', res)
    } else {

      const posted = await REVIEWS.insert({ url, text, rating, business_id, user_id })
      if (posted) {
        returnAllUsers(req, res);
      } else {
        return errHelper(405, 'something went wrong adding a review pls contact your badass backend developer', res)
      }
    }
  }
  catch (err) {
    return errHelper(500, err, res)
  }
});

// @route    GET api/reviews
// @desc     delete all review
// @Access   Testing ONLY FOR TESTING
server.delete('/', auth, async (req, res) => {
  try {
    await REVIEWS.remove({ user_id: 83 })

    returnAllUsers(req, res);


  } catch (err) {
    return errHelper(500, err, res)

  }
});

module.exports = server;


