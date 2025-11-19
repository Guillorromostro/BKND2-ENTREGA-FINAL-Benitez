const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const RefreshToken = require('../models/refreshToken.model');
const { jwtSecret, jwtExpiration, jwtRefreshExpiration } = require('../config/index');

const register = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid credentials');
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);
    return { accessToken, refreshToken };
};

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: jwtExpiration });
};

// Generate refresh token
const generateRefreshToken = async (user) => {
    const refreshToken = new RefreshToken({ userId: user._id });
    await refreshToken.save();
    return refreshToken.token;
};

// Verify access token
const verifyAccessToken = (token) => {
    return jwt.verify(token, jwtSecret);
};

// Verify refresh token
const verifyRefreshToken = async (token) => {
    const refreshToken = await RefreshToken.findOne({ token });
    if (!refreshToken) {
        throw new Error('Invalid refresh token');
    }
    return refreshToken;
};

// Logout user
const logout = async (token) => {
    await RefreshToken.deleteOne({ token });
};

module.exports = {
    register,
    login,
    verifyAccessToken,
    verifyRefreshToken,
    logout,
};


