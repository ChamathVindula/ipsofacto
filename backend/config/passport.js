const { Strategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async (jwt_payload, done) => {
      try {
        let user = await User.findOne({ where: { email: jwt_payload.email } });
        
        user = user ? {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        } : false;

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
