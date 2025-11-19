const User = require('../models/user.model');

const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

const getUserById = async (userId) => {
    return await User.findById(userId);
};

const getAllUsers = async () => {
    return await User.find();
};

const updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
    findUserByEmail,
};
