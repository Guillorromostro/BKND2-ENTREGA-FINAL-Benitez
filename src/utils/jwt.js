const jwt = require('jsonwebtoken');

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET no está definido');
  return secret;
}

function signAccessToken(user) {
  const JWT_SECRET = getSecret();
  const payload = { sub: String(user._id), role: user.role };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function verifyAccessToken(token) {
  const JWT_SECRET = getSecret();
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { signAccessToken, verifyAccessToken };
