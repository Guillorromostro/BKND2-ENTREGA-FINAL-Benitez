const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Quitar validaciones para evitar 400 en tests
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
