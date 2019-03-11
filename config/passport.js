const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../data/dbConfig');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        const user = await User.select().from('users').where({ id: jwtPayload.id }).first();
        // console.log(user);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        throw err;
      }
    }),
  );
};
