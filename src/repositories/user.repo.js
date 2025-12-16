const User = require('../models/user.model');

class UserRepository {
  async create(data) { return User.create(data); }
  async findById(id) { return User.findById(id); }
  async findByEmail(email) { return User.findOne({ email }).select('+password'); }
  async updateById(id, updates) { return User.findByIdAndUpdate(id, updates, { new: true }); }
  async deleteById(id) { return User.findByIdAndDelete(id); }
  async findAll() { return User.find(); }
}

const repo = new UserRepository();
module.exports = {
  ...repo,
  // alias para compatibilidad con tests antiguos
  createUser: (...a) => repo.create(...a),
  getUserById: (...a) => repo.findById(...a),
  updateUser: (...a) => repo.updateById(...a),
  deleteUser: (...a) => repo.deleteById(...a),
  getAllUsers: (...a) => repo.findAll(...a),
};
