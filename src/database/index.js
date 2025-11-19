const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);    // evita warning findOneAndUpdate
mongoose.set('useCreateIndex', true);       // evita warning ensureIndex

let connecting = null;

async function connectDB(uri) {
  if (mongoose.connection.readyState === 1) return mongoose.connection; // conectado
  if (connecting) return connecting; // en progreso

  const mongoUri =
    uri ||
    process.env.MONGODB_URI ||
    (process.env.NODE_ENV === 'test'
      ? 'mongodb://127.0.0.1:27017/ecommerce_test'
      : 'mongodb://127.0.0.1:27017/ecommerce');

  connecting = mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await connecting;
  connecting = null;

  return mongoose.connection;
}

module.exports = connectDB;
