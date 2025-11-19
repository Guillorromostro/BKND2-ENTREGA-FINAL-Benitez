const userRepo = require('../repositories/user.repo');
const { hashPassword, comparePassword } = require('../utils/password');

const createUser = async (userData) => {
  const hashed = await hashPassword(userData.password);
  return userRepo.createUser({ ...userData, password: hashed, role: userData.role || 'user' });
};

const getUserById = (id) => userRepo.getUserById(id);
const getAllUsers = () => userRepo.getAllUsers();

const updateUser = async (id, data) => {
  if (data.password) data.password = await hashPassword(data.password);
  return userRepo.updateUser(id, data);
};

const deleteUser = (id) => userRepo.deleteUser(id);

const authenticateUser = async (email, password) => {
  const user = await userRepo.findUserByEmail(email);
  if (!user) throw new Error('Invalid credentials');
  const ok = await comparePassword(password, user.password);
  if (!ok) throw new Error('Invalid credentials');
  return user;
};

module.exports = { createUser, getUserById, getAllUsers, updateUser, deleteUser, authenticateUser };
