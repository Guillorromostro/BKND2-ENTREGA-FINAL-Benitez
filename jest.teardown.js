/* eslint-env node */
module.exports = async () => {
  try {
    const mongoose = require('mongoose');
    await mongoose.disconnect();
  } catch {}
  try {
    const logger = require('./src/utils/logger');
    if (logger && typeof logger.close === 'function') {
      await logger.close();
    }
  } catch {}
};
