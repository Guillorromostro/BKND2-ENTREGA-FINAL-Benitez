const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET || 'test_secret';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

const verify = async (payload, done) => {
  try {
    const user = await User.findById(payload.id).select('-password').lean();
    if (!user) return done(null, false);
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
};

passport.use('jwt', new JwtStrategy(opts, verify));
passport.use('current', new JwtStrategy(opts, verify));

module.exports = passport;
