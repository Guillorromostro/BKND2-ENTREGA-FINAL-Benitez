const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/models/user.model');

describe('User Integration Tests', () => {
    let userId;

    beforeAll(async () => {
        await User.deleteMany({});
    });

    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123',
                role: 'user'
            });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('user');
        userId = res.body.user._id;
    });

    it('should get a user by ID', async () => {
        const res = await request(app).get(`/api/users/${userId}`);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body.user._id).toEqual(userId);
    });

    it('should update a user', async () => {
        const res = await request(app)
            .put(`/api/users/${userId}`)
            .send({
                username: 'updateduser'
            });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body.user.username).toEqual('updateduser');
    });

    it('should delete a user', async () => {
        const res = await request(app).delete(`/api/users/${userId}`);
        
        expect(res.statusCode).toEqual(204);
    });

    it('should return 404 for deleted user', async () => {
        const res = await request(app).get(`/api/users/${userId}`);
        
        expect(res.statusCode).toEqual(404);
    });
});
