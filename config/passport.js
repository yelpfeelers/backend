const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../dbHelper/index");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById("users", { id: jwt_payload.id })
        //console.log(user);
        if (user) {
          req.user = user
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        console.log(err);
      }
    })
  );
};
