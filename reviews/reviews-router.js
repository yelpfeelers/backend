const server = require('express').Router();

const passport = require('passport')
const db = require('../data/dbConfig')
const errHelper = require('../errors/errorHelper');
const auth = passport.authenticate('jwt', { session: false });
const REVIEWS = require("./reviews-model")

// @route    GET api/reviews
// @desc     post a review
// @Access   Private  
server.post('/', (req, res) => {

});

module.exports = server;