const express = require('express');
const categoryController = require('../controllers/category.controller');
const { validateCategory, validateCategoryId } = require('../validations/category.validation');
const validate = require('../middlewares/validate.middleware');
const { authenticate } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');

const router = express.Router();

router.get('/', categoryController.getAllCategories);
router.get('/:id', validateCategoryId(), validate, categoryController.getCategoryById);
router.post('/', authenticate, authorize('admin'), validateCategory(), validate, categoryController.createCategory);
router.put('/:id', authenticate, authorize('admin'), validateCategoryId(), validateCategory(), validate, categoryController.updateCategory);
router.delete('/:id', authenticate, authorize('admin'), validateCategoryId(), validate, categoryController.deleteCategory);

module.exports = router;
