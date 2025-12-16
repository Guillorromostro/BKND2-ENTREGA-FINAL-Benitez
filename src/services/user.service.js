const userRepo = require('../repositories/user.repo');
const { userDTO } = require('../utils/dtos/user.dto');

async function createUser(data) {
  const user = await userRepo.createUser(data);
  return userDTO(user);
}
async function getUserById(id) {
  const user = await userRepo.getUserById(id);
  return userDTO(user);
}
async function updateUser(id, updates) {
  const user = await userRepo.updateUser(id, updates);
  return userDTO(user);
}
async function deleteUser(id) {
  await userRepo.deleteUser(id);
  return true;
}
async function getAllUsers() {
  const users = await userRepo.getAllUsers();
  return users.map(userDTO);
}

module.exports = { createUser, getUserById, updateUser, deleteUser, getAllUsers };
