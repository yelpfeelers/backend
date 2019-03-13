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
server.use(
  express.urlencoded({
    extended: true,
  }),
);
server.use(helmet());
server.use(logger('dev'));
// Add headers
server.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

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
