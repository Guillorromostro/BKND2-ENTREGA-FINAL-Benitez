const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  dbURI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce',
  jwtSecret: process.env.JWT_SECRET || 'test_secret',
  jwtExpiration: process.env.JWT_EXPIRATION || '1h'
};
