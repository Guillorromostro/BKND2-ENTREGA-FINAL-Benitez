const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { signAccessToken } = require('../utils/jwt');

const COOKIE_NAME = process.env.COOKIE_NAME || 'access_token';
const COOKIE_SECURE = String(process.env.COOKIE_SECURE).toLowerCase() === 'true';
const COOKIE_SAME_SITE = process.env.COOKIE_SAME_SITE || 'lax';

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body || {};
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Invalid payload' });
    }

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ username, email, password }); // hash via hook del modelo
    const token = signAccessToken(user);

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: COOKIE_SECURE,
      sameSite: COOKIE_SAME_SITE,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const src = user.toObject ? user.toObject() : user;
    const { password: _pwd, ...safeUser } = src; // evitar redeclaración
    return res.status(201).json({ user: safeUser, token });
  } catch (err) {
    if (err && err.code === 11000) return res.status(400).json({ message: 'User already exists' });
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'Invalid payload' });

    const user = await User.findOne({ email }).select('+password');
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signAccessToken(user);

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: COOKIE_SECURE,
      sameSite: COOKIE_SAME_SITE,
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    });

    const src = user.toObject ? user.toObject() : user;
    const { password: _pwd, ...safeUser } = src; // evitar redeclaración
    return res.status(200).json({ user: safeUser, token });
  } catch (err) {
    next(err);
  }
};
