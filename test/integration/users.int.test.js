const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const User = require('../../src/models/user.model');

describe('User Integration Tests', () => {
  let adminToken;
  let targetUserId;

  beforeAll(async () => {
    // 1) Intentar login; si falla, registrar
    let login = await request(app).post('/api/auth/login').send({
      email: 'admin@example.com',
      password: 'password123',
    });

    if (login.status >= 400) {
      const reg = await request(app).post('/api/auth/register').send({
        username: 'adminuser',
        email: 'admin@example.com',
        password: 'password123',
      });

      // Resolver userId robusto (del body o de la DB)
      let userId = reg.body?.user?._id;
      if (!userId) {
        const existing = await User.findOne({ email: 'admin@example.com' });
        userId = existing?._id;
      }
      if (userId) {
        await User.findByIdAndUpdate(userId, { role: 'admin' });
      }

      login = await request(app).post('/api/auth/login').send({
        email: 'admin@example.com',
        password: 'password123',
      });
    } else {
      // Asegurar rol admin
      const u = await User.findOne({ email: 'admin@example.com' });
      if (u && u.role !== 'admin') {
        await User.findByIdAndUpdate(u._id, { role: 'admin' });
        login = await request(app).post('/api/auth/login').send({
          email: 'admin@example.com',
          password: 'password123',
        });
      }
    }

    adminToken = login.body?.token;

    // 2) Crear el usuario objetivo con token admin
    const createRes = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        username: 'manageduser',
        email: 'managed@example.com',
        password: 'password123',
      });

    targetUserId = createRes.body?.user?._id;
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should get a user by ID', async () => {
    const res = await request(app)
      .get(`/api/users/${targetUserId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user._id).toEqual(targetUserId);
  });

  it('should update a user', async () => {
    const res = await request(app)
      .put(`/api/users/${targetUserId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ username: 'updateduser' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.username).toEqual('updateduser');
  });

  it('should delete a user', async () => {
    const res = await request(app)
      .delete(`/api/users/${targetUserId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(204);
  });

  it('should return 404 for deleted user', async () => {
    const res = await request(app)
      .get(`/api/users/${targetUserId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(404);
  });
});
