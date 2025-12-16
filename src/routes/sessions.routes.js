const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const { userDTO } = require('../utils/dtos/user.dto');
const { requestPasswordReset, resetPassword } = require('../services/auth.service');

// GET /api/sessions/current: usa estrategia 'current' y devuelve DTO
router.get('/current', passport.authenticate('current', { session: false }), (req, res) => {
  return res.json({ user: userDTO(req.user) });
});

// Recuperación de contraseña
router.post('/password/forgot', async (req, res, next) => {
  try {
    await requestPasswordReset(req.body.email);
    res.json({ message: 'Si el correo existe, se envió un enlace de recuperación.' });
  } catch (err) { next(err); }
});

router.post('/password/reset', async (req, res, next) => {
  try {
    await resetPassword(req.body.token, req.body.password);
    res.json({ message: 'Contraseña actualizada' });
  } catch (err) { next(err); }
});

module.exports = router;
