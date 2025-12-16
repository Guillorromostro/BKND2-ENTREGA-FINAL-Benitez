const Product = require('../models/product.model');

async function getProducts(req, res, next) {
  try {
    const products = await Product.find().lean();
    return res.json(products);
  } catch (e) { next(e); }
}

async function getProductById(req, res, next) {
  try {
    const prod = await Product.findById(req.params.id).lean();
    if (!prod) return res.status(404).json({ message: 'Product not found' });
    return res.json(prod);
  } catch (e) { next(e); }
}

async function createProduct(req, res, next) {
  try {
    const created = await Product.create(req.body);
    return res.status(201).json({
      id: created._id.toString(),
      name: created.name,
      description: created.description,
      price: created.price,
      category: created.category,
      stock: created.stock,
    });
  } catch (e) { next(e); }
}

async function updateProduct(req, res, next) {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    return res.json(updated);
  } catch (e) { next(e); }
}

async function deleteProduct(req, res, next) {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    return res.status(204).send();
  } catch (e) { next(e); }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
