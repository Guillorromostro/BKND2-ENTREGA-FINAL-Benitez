const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const User = require('../../src/models/user.model');

describe('Authentication Integration Tests', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await User.deleteMany({});
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    email: 'testuser@example.com',
                    password: 'password123'
                });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('token');
        });

        it('should return 400 if user already exists', async () => {
            await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    email: 'testuser@example.com',
                    password: 'password123'
                });

            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    email: 'testuser@example.com',
                    password: 'password123'
                });
            expect(response.status).toBe(400);
        });
    });

    describe('POST /api/auth/login', () => {
        it('should login an existing user', async () => {
            await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    email: 'testuser@example.com',
                    password: 'password123'
                });

            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'testuser@example.com',
                    password: 'password123'
                });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        });

        it('should return 401 for invalid credentials', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'nonexistent@example.com',
                    password: 'wrongpassword'
                });
            expect(response.status).toBe(401);
        });
    });
});
