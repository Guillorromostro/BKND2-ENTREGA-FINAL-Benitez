const { expect, it, describe } = require('@jest/globals');
const userService = require('../../../src/services/user.service');
const userRepo = require('../../../src/repositories/user.repo');

jest.mock('../../../src/repositories/user.repo', () => {
  const createUser = jest.fn();
  const getUserById = jest.fn();
  const updateUser = jest.fn();
  const deleteUser = jest.fn();
  const getAllUsers = jest.fn();
  return {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers,
  };
});

describe('User Service', () => {
  it('should create a new user', async () => {
    const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
    const repoUser = { _id: '12345', username: 'testuser', email: 'test@example.com', role: 'user', createdAt: new Date(), updatedAt: new Date() };
    userRepo.createUser.mockResolvedValue(repoUser);

    const result = await userService.createUser(userData);

    expect(userRepo.createUser).toHaveBeenCalledWith(userData);
    expect(result).toMatchObject({ id: '12345', username: 'testuser', email: 'test@example.com', role: 'user' });
    expect(result).not.toHaveProperty('password');
  });

  it('should get a user by ID', async () => {
    const userId = '12345';
    const repoUser = { _id: userId, username: 'testuser', email: 'test@example.com', role: 'user', createdAt: new Date(), updatedAt: new Date() };
    userRepo.getUserById.mockResolvedValue(repoUser);

    const result = await userService.getUserById(userId);

    expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
    expect(result).toMatchObject({ id: userId, username: 'testuser', email: 'test@example.com', role: 'user' });
  });

  it('should update a user', async () => {
    const userId = '12345';
    const updateData = { username: 'updateduser' };
    const repoUser = { _id: userId, username: 'updateduser', email: 'test@example.com', role: 'user', createdAt: new Date(), updatedAt: new Date() };
    userRepo.updateUser.mockResolvedValue(repoUser);

    const result = await userService.updateUser(userId, updateData);

    expect(userRepo.updateUser).toHaveBeenCalledWith(userId, updateData);
    expect(result).toMatchObject({ id: userId, username: 'updateduser' });
  });

  it('should delete a user', async () => {
    userRepo.deleteUser.mockResolvedValue(true);
    const result = await userService.deleteUser('12345');
    expect(result).toBe(true);
    expect(userRepo.deleteUser).toHaveBeenCalledWith('12345');
  });

  it('should return all users', async () => {
    const repoUsers = [
      { _id: '1', username: 'user1', email: 'u1@example.com', role: 'user', createdAt: new Date(), updatedAt: new Date() },
      { _id: '2', username: 'user2', email: 'u2@example.com', role: 'user', createdAt: new Date(), updatedAt: new Date() },
    ];
    userRepo.getAllUsers.mockResolvedValue(repoUsers);

    const result = await userService.getAllUsers();

    expect(userRepo.getAllUsers).toHaveBeenCalled();
    expect(result).toEqual([
      expect.objectContaining({ id: '1', username: 'user1' }),
      expect.objectContaining({ id: '2', username: 'user2' }),
    ]);
  });
});
