const request = require('supertest');
const app = require('../../src/app');
const Product = require('../../src/models/product.model');
const User = require('../../src/models/user.model');
const { signAccessToken } = require('../../src/utils/jwt');

describe('Product Integration Tests', () => {
  let adminToken;

  beforeAll(async () => {
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
      const u = await User.findOne({ email: 'admin@example.com' });
      if (u && u.role !== 'admin') {
        await User.findByIdAndUpdate(u._id, { role: 'admin' });
        login = await request(app).post('/api/auth/login').send({
          email: 'admin@example.com',
          password: 'password123',
        });
      }
    }

    // Fallback: si no viene en body, firmar token para el admin
    adminToken = login.body?.token;
    if (!adminToken) {
      const u = await User.findOne({ email: 'admin@example.com' });
      adminToken = u ? signAccessToken(u) : undefined;
    }
  });

  it('should create a new product', async () => {
    const productData = { name: 'Test Product', description: 'Desc', price: 100, stock: 5, category: 'Test' };
    const response = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(productData)
      .expect(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should update a product', async () => {
    const product = await Product.create({ name: 'P1', description: 'D', price: 10, stock: 2, category: 'Test' });
    const updatedData = { name: 'P1 updated' };
    const response = await request(app)
      .put(`/api/products/${product._id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(updatedData)
      .expect(200);
    expect(response.body.name).toBe(updatedData.name);
  });

  it('should delete a product', async () => {
    const product = await Product.create({ name: 'P2', description: 'D', price: 10, stock: 2, category: 'Test' });
    await request(app)
      .delete(`/api/products/${product._id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(204);
    const deleted = await Product.findById(product._id);
    expect(deleted).toBeNull();
  });
});
