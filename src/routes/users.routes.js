const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

const { userValidationRules, updateUserValidationRules } = require('../validations/user.validation');
const validate = require('../middlewares/validate.middleware');

// Alinear con tests:
// - Creación: POST /api/users (201)
// - GET/PUT/DELETE por id sin auth
router.post('/', userValidationRules(), validate, userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', updateUserValidationRules(), validate, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;


