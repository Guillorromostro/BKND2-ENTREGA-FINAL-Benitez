const express = require('express');
const productController = require('../controllers/product.controller');
const { validateProductInput, validateProductId } = require('../validations/product.validation');
const validate = require('../middlewares/validate.middleware');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', validateProductId(), validate, productController.getProductById);
router.post('/', validateProductInput(), validate, productController.createProduct);
router.put('/:id', validateProductId(), validateProductInput(), validate, productController.updateProduct);
router.delete('/:id', validateProductId(), validate, productController.deleteProduct);

module.exports = router;
