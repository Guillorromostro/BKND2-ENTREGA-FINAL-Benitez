const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET || 'test_secret';

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body || {};
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Invalid payload' });
    }

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ username, email, password }); // hash via hook del modelo
    const token = jwt.sign({ id: user._id.toString(), email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(201).json({ token });
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

    const token = jwt.sign({ id: user._id.toString(), email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
