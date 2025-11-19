const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';
const PASSWORD_SALT_ROUNDS = 10;

module.exports = {
    JWT_SECRET,
    JWT_EXPIRATION,
    PASSWORD_SALT_ROUNDS,
};
