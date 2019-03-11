require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');


// routes
const users = require('./users/user-router');

// init
const server = express();

// middleware
server.use(express.json());
server.use(
  express.urlencoded({
    extended: false,
  }),
);
server.use(helmet());
server.use(cors());
server.use(logger('dev'));

// passport
server.use(passport.initialize());

// passport config require all passport [AUTH] important to run passport-confifg
require('./config/passport')(passport);

// use route
server.use('/api/users', users);

module.exports = server;
