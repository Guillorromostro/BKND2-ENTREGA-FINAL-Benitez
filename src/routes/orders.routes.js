const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const { authorizeRoles } = require('../middlewares/role.middleware');
const { checkout } = require('../services/order.service');

router.post(
  '/checkout',
  passport.authenticate('current', { session: false }),
  authorizeRoles('user'),
  async (req, res, next) => {
    try {
      const ticket = await checkout(req.user._id, req.body.items || []);
      res.status(201).json({ ticket });
    } catch (err) { next(err); }
  }
);

module.exports = router;
