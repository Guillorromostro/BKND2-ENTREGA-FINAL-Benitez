const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const config = require('../config');

const signToken = (userId) => {
    return jwt.sign({ id: userId }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN,
    });
};

const verifyToken = async (token) => {
    const verify = promisify(jwt.verify);
    return await verify(token, config.JWT_SECRET);
};

module.exports = {
    signToken,
    verifyToken,
};
