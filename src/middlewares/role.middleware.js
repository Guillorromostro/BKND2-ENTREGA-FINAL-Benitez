const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
const { apiResponse } = require('../utils/apiResponse');

const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return apiResponse(res, 403, 'Access denied. No token provided.');
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user || !roles.includes(user.role)) {
        return apiResponse(res, 403, 'Access denied. You do not have the required role.');
      }

      req.user = user;
      next();
    } catch (error) {
      return apiResponse(res, 403, 'Access denied. Invalid token.');
    }
  };
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    const role = req.user.role || 'user';
    if (roles.length && !roles.includes(role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};

module.exports = { authorizeRoles, authorize };
