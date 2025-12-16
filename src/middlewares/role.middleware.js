const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { apiResponse } = require('../utils/apiResponse');
const { jwtSecret } = require('../config');

function authorizeRoles(...allowed) {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!role || !allowed.includes(role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

module.exports = {
  authorizeRoles,
  authorize: authorizeRoles,
};
