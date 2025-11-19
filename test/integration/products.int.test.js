const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const Product = require('../../src/models/product.model');

describe('Product Integration Tests', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await Product.deleteMany({});
    });

    it('should create a new product', async () => {
        const productData = {
            name: 'Test Product',
            description: 'This is a test product',
            price: 100,
            category: 'Test Category'
        };

        const response = await request(app)
            .post('/api/products')
            .send(productData)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(productData.name);
    });

    it('should retrieve all products', async () => {
        await Product.create({
            name: 'Test Product 1',
            description: 'This is a test product 1',
            price: 100,
            category: 'Test Category'
        });

        await Product.create({
            name: 'Test Product 2',
            description: 'This is a test product 2',
            price: 200,
            category: 'Test Category'
        });

        const response = await request(app)
            .get('/api/products')
            .expect(200);

        expect(response.body).toHaveLength(2);
    });

    it('should retrieve a product by id', async () => {
        const product = await Product.create({
            name: 'Test Product',
            description: 'This is a test product',
            price: 100,
            category: 'Test Category'
        });

        const response = await request(app)
            .get(`/api/products/${product._id}`)
            .expect(200);

        expect(response.body.name).toBe(product.name);
    });

    it('should update a product', async () => {
        const product = await Product.create({
            name: 'Test Product',
            description: 'This is a test product',
            price: 100,
            category: 'Test Category'
        });

        const updatedData = {
            name: 'Updated Product',
            description: 'This is an updated test product',
            price: 150,
            category: 'Updated Category'
        };

        const response = await request(app)
            .put(`/api/products/${product._id}`)
            .send(updatedData)
            .expect(200);

        expect(response.body.name).toBe(updatedData.name);
    });

    it('should delete a product', async () => {
        const product = await Product.create({
            name: 'Test Product',
            description: 'This is a test product',
            price: 100,
            category: 'Test Category'
        });

        await request(app)
            .delete(`/api/products/${product._id}`)
            .expect(204);

        const deletedProduct = await Product.findById(product._id);
        expect(deletedProduct).toBeNull();
    });
});
