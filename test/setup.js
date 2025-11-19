/* eslint-env jest, node */
const connectDB = require('../src/database');
const mongoose = require('mongoose');
const logger = require('../src/utils/logger');

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret';

beforeAll(async () => { await connectDB(); });

afterAll(async () => {
  try { await mongoose.disconnect(); } catch (_) {}
  try { logger && logger.close && (await logger.close()); } catch (_) {}
});

/* global jest */
process.env.JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce_test';

jest.setTimeout(30000);
