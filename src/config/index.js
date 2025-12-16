require('dotenv').config({
  path: process.env.ENV_FILE || '.env',
  override: false,
  debug: false,
  quiet: true,
});

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI,

  JWT_SECRET,
  jwtSecret: JWT_SECRET,
  JWT_EXPIRES_IN,
  jwtExpiresIn: JWT_EXPIRES_IN,

  COOKIE_NAME: process.env.COOKIE_NAME || 'access_token',
  COOKIE_SECURE: process.env.COOKIE_SECURE === 'true',
  COOKIE_SAME_SITE: process.env.COOKIE_SAME_SITE || 'lax',

  PUBLIC_URL: process.env.PUBLIC_URL || `http://localhost:${process.env.PORT || 3000}`,

  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_FROM: process.env.SMTP_FROM,
};
