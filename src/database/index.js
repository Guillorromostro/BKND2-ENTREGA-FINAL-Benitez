const mongoose = require('mongoose');

const uri =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  'mongodb://127.0.0.1:27017/ecommerce';

const connect = () => mongoose.connect(uri); // v9: sin opciones

module.exports = { connect };
