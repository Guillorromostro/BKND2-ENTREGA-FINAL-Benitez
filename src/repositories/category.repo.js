const Category = require('../models/category.model');

const createCategory = async (categoryData) => {
    const category = new Category(categoryData);
    return await category.save();
};

const getAllCategories = async () => {
    return await Category.find();
};

const getCategoryById = async (categoryId) => {
    return await Category.findById(categoryId);
};

// Update a category by ID
const updateCategory = async (categoryId, categoryData) => {
    return await Category.findByIdAndUpdate(categoryId, categoryData, { new: true });
};

// Delete a category by ID
const deleteCategory = async (categoryId) => {
    return await Category.findByIdAndDelete(categoryId);
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};


