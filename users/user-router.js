/* eslint-disable consistent-return */
const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../config/keys');

const User = require('./user-model');

const server = express.Router();

// input validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const errHelper = require('../errors/errorHelper');
// helper
const auth = passport.authenticate('jwt', { session: false });

// @route    GET api/users
// @desc     get all testing
// @Access   Public
server.get('/', async (req, res) => {
  try {
    const users = await User.find(req.query);
    res.status(200).json(users);
  } catch (err) {
    errHelper(500, err.errno || err, res);
  }
});
// @route    GET api/users/register
// @desc     Register user
// @Access   Public
server.post('/register', async (req, res) => {
  const {
    username, password,
  } = req.body;
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return errHelper(400, errors, res);
  }
  try {
    const avatar = await gravatar.url(username, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });
    const [id] = await User.insert({
      username, password, avatar,
    }).returning('id');

    // get single user i just added
    const newUser = await User.findById({ id });

    // encrypt password with bcrypt
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (error, hash) => {
        if (error) {
          return errHelper(500, err, res);
        }
        newUser.password = hash;
        // save hash password
        const user = await User
          .update(id, { password: newUser.password });
      });
    });
    const payload = {
      id: newUser.id,
      username: newUser.username,
      avatar: newUser.avatar,
    };
    req.user = payload;
    // sign token
    jwt.sign(
      payload,
      keys.secretOrKey,
      { expiresIn: 1000 * 60 * 60 * 24 * 30 },
      (err, token) => {
        res.json({
          success: true,
          token: `Bearer ${token}`, // need to have space after bearer is important
          user: payload,
        });
      },
    );

  } catch (err) {
    return errHelper(500, err.errno || err, res);
  }
});
// @route    GET api/users/login
// @desc     login user
// @Access   Public
server.post('/login', async (req, res) => {
  const { username, password, } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return errHelper(400, errors, res);
  }

  try {
    // find user by email
    const user = await User.findBy({ username });
    if (!user) {
      errors.username = 'User not found';
      return errHelper(404, errors, res);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // what i return when user logged in
      const payload = {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
      };
      req.user = payload;
      // sign token
      jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 1000 * 60 * 60 * 24 * 30 },
        (err, token) => {
          res.json({
            success: true,
            token: `Bearer ${token}`, // need to have space after bearer is important
            user: payload,
          });
        },
      );
    } else {
      errors.password = 'Password incorrect';
      return errHelper(400, errors, res);
    }
  } catch (err) {
    return errHelper(500, err.errno || err, res);
  }
});

// @route    GET api/auth/current
// @desc     get current user
// @Access   Public
// username, email, firstname, lastname , password
server.get('/current', auth, (req, res) => {
  res.status(200).json({
    id: req.user.id,
    username: req.user.username,
    avatar: req.user.avatar,
    created_at: req.user.created_at,
  });
});
// @route    GET api/auth/current:id
// @desc     update
// @Access   Public
// server.get('/current/:id', auth, (req, res) => {
//   const { id } = req.params;
//   try {
//     console.log(req.user.id);
//     const user = User.findById({ id });
//   } catch (err) {
//     return errHelper(500, err.errno || err, res);
//   }
// });


module.exports = server;
