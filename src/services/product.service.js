const Product = require('../models/product.model');
const productRepo = require('../repositories/product.repo');

const createProduct = async (productData) => {
    const product = new Product(productData);
    return await productRepo.create(product);
};

const getAllProducts = async () => {
    return await productRepo.findAll();
};

const getProductById = async (productId) => {
    return await productRepo.findById(productId);
};

const updateProduct = async (productId, productData) => {
    return await productRepo.update(productId, productData);
};

const deleteProduct = async (productId) => {
    return await productRepo.delete(productId);
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
