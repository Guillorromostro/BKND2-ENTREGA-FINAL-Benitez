/* eslint-env node */
const mongoose = require('mongoose');

module.exports = async () => {
  try {
    if (mongoose.connection?.readyState) {
      await mongoose.disconnect();
    }
  } catch {}
};
