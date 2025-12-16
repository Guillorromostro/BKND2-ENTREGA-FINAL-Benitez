/* eslint-env jest, node */
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const { connect } = require('../src/database'); // importa la función correcta

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret_key';
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
process.env.COOKIE_NAME = process.env.COOKIE_NAME || 'access_token';
process.env.COOKIE_SECURE = process.env.COOKIE_SECURE || 'false';
process.env.COOKIE_SAME_SITE = process.env.COOKIE_SAME_SITE || 'lax';
process.env.LOG_LEVEL = process.env.LOG_LEVEL || 'error';

// Aumenta el timeout por defecto de Jest (p.ej. 15s)
jest.setTimeout(20000);

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongod.getUri('ecommerce_test');
  await connect(); // conecta usando la URI del memory server
});

afterAll(async () => {
  try {
    await mongoose.disconnect();
  } catch {}
  if (mongod) await mongod.stop();
});

/* global jest */
process.env.JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';
