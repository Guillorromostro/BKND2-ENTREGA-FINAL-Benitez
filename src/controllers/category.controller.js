const Category = require('../models/category.model');
const ApiResponse = require('../utils/apiResponse');

exports.createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        return ApiResponse.success(res, 201, 'Category created successfully', category);
    } catch (error) {
        return ApiResponse.error(res, 400, 'Error creating category', error);
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return ApiResponse.success(res, 200, 'Categories retrieved successfully', categories);
    } catch (error) {
        return ApiResponse.error(res, 400, 'Error retrieving categories', error);
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return ApiResponse.error(res, 404, 'Category not found');
        }
        return ApiResponse.success(res, 200, 'Category retrieved successfully', category);
    } catch (error) {
        return ApiResponse.error(res, 400, 'Error retrieving category', error);
    }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return ApiResponse.error(res, 404, 'Category not found');
        }
        return ApiResponse.success(res, 200, 'Category updated successfully', category);
    } catch (error) {
        return ApiResponse.error(res, 400, 'Error updating category', error);
    }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return ApiResponse.error(res, 404, 'Category not found');
        }
        return ApiResponse.success(res, 200, 'Category deleted successfully');
    } catch (error) {
        return ApiResponse.error(res, 400, 'Error deleting category', error);
    }
};


