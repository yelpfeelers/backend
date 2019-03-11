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
    username, email, firstname, lastname, password,
  } = req.body;
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return errHelper(400, errors, res);
  }

  try {
    const avatar = await gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });
    const [id] = await User.insert({
      username, email, firstname, lastname, password, avatar,
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
        await User
          .update(id, { password: newUser.password });

        return res.status(200).json({
          email: newUser.email,
          password: newUser.password,

        });
      });
    });
  } catch (err) {
    return errHelper(500, err.errno || err, res);
  }
});
// @route    GET api/users/login
// @desc     login user
// @Access   Public
server.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return errHelper(500, errors, res);
  }

  try {
    // find user by email
    const user = await User.findBy({ email });


    if (!user) {
      errors.email = 'User not found';
      return errHelper(404, errors, res);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // what i return when user logged in
      const payload = {
        id: user.id,
        email: user.email,
        avatar: user.avatar,
      };
      req.user = payload;
      // sign token
      jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 1000 * 60 * 60 * 24 },
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
  res.json(req.user);

  // res.json({
  //   id: req.user.id,
  //   username: req.user.username,
  //   email: req.user.email,
  //   firstname: req.user.firstname,
  //   lastname: req.user.lastname,
  //   avatar: req.user.avatar,
  //   created_at: req.user.created_at,
  // });
});

module.exports = server;
