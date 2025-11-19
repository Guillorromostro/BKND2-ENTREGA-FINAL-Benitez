const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/error.middleware');
const logger = require('./utils/logger');
const passport = require('./config/passport');

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use('/api', routes);

app.use(errorHandler);

module.exports = app;

