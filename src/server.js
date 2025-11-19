const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const app = require('./app');
const connectDB = require('./database');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error('Mongo connection error', { error: err.message });
    process.exit(1);
  });
