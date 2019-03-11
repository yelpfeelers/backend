const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');
const db = require('../../data/dbConfig');

const server = express.Router();

// input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const errHelper = require('../../errors/errorHelper');
// helper
const auth = passport.authenticate('jwt', { session: false });
server.get('/', async (req, res) => {
  try {
    const users = await db.select().from('users');

    res.status(200).json(users);
  } catch (err) {
    errHelper(500, err.errno || err, res);
  }
});

// delete all users
server.delete('/', async (req, res) => {
  try {
    const deleted = await db.del().from('users');
    res.status(200).json(deleted);
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
    const [id] = await db
      .insert({
        username, email, firstname, lastname, password, avatar,
      })
      .into('users')
      .returning('id');
    // get single user i just added
    const newUser = await db
      .select('u.username', 'u.password', 'u.email', 'u.created_at')
      .from('users as u')
      .where({ id })
      .first();

    // encrypt password with bcrypt
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (error, hash) => {
        if (error) {
          return errHelper(500, err, res);
        }
        newUser.password = hash;
        // save hash password
        await db
          .update({ password: newUser.password })
          .from('users')
          .where({ id });
        return res.status(200).json(newUser);
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
    const user = await db
      .select('u.id', 'u.email', 'u.password', 'u.avatar', 'u.username')
      .from('users as u')
      .where({ email })
      .first();

    if (!user) {
      errors.email = 'User not found';
      return errHelper(404, errors, res);
    }
    // check password with bycrypt compare becuase it's hashed
    // first param is plain password  from req.body.password
    // second param is user hash password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // what i return when user logged in
      const payload = {
        id: user.id,
        email: user.email,
        avatar: user.avatar,
      };
      // sign token
      jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 1000 * 60 * 60 * 24 },
        (err, token) => {
          res.json({
            success: true,
            token: `Bearer ${token}`, // need to have space after bearer is important
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

// username, email, firstname, lastname , password
server.get('/current', auth, (req, res) => {
  // res.json(req.user); all data or that
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    avatar: req.user.avatar,
    created_at: req.user.created_at,
  });
});

module.exports = server;
