require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');


// routes
const users = require('./users/user-router');
const yelp = require('./yelp-api/yelp-router');
const bookmarks = require("./bookmarks/bookmarks-router")
const reviews = require("./reviews/reviews-router")
// init
const server = express();

// middleware
server.use(express.json());
server.use(cors());
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
server.use(
  express.urlencoded({
    extended: true,
  }),
);
server.use(helmet());
server.use(logger('dev'));


// passport
server.use(passport.initialize());

// passport config require all passport [AUTH] important to run passport-confifg
require('./config/passport')(passport);

// use route
server.use('/api/users', users);
server.use('/api/yelp', yelp);
server.use('/api/bookmarks', bookmarks);
server.use('/api/reviews', reviews);

module.exports = server;
