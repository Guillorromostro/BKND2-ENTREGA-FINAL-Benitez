const app = require('./app');
const { connect } = require('./database');
const { PORT } = require('./config');

(async () => {
  try {
    await connect();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
