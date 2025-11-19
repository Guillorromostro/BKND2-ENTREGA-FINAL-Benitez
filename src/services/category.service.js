const Category = require('../models/category.model');

exports.createCategory = async (categoryData) => {
    const category = new Category(categoryData);
    return await category.save();
};

exports.getAllCategories = async () => {
    return await Category.find();
};

exports.getCategoryById = async (categoryId) => {
    return await Category.findById(categoryId);
};

// Update a category by ID
exports.updateCategory = async (categoryId, categoryData) => {
    return await Category.findByIdAndUpdate(categoryId, categoryData, { new: true });
};

// Delete a category by ID
exports.deleteCategory = async (categoryId) => {
    return await Category.findByIdAndDelete(categoryId);
};


