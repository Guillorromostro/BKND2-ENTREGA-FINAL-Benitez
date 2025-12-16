const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user.model');

const secret = process.env.JWT_SECRET || 'test_secret_key'; // fallback para entorno de test

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
  algorithms: ['HS256'],
};

const verify = async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
};

passport.use('jwt', new JwtStrategy(opts, verify));
passport.use('current', new JwtStrategy(opts, verify));

module.exports = passport;
