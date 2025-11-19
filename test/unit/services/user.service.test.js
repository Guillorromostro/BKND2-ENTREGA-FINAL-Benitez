const { expect, it, describe } = require('@jest/globals');
const userService = require('../../../src/services/user.service');
const userRepo = require('../../../src/repositories/user.repo');

jest.mock('../../../src/repositories/user.repo');

describe('User Service', () => {
  afterEach(() => { jest.clearAllMocks(); });

  it('should create a new user', async () => {
    const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };

    userRepo.createUser.mockResolvedValue(userData);

    const result = await userService.createUser(userData);

    expect(userRepo.createUser).toHaveBeenCalledWith(expect.objectContaining({
      username: userData.username,
      email: userData.email,
      password: expect.any(String), // hash
    }));
    // opcional: verifica el rol por defecto si el servicio lo agrega
    // expect(userRepo.createUser.mock.calls[0][0].role).toBe('user');

    expect(result).toEqual(userData);
  });

  it('should get a user by ID', async () => {
    const userId = '12345';
    const userData = { id: userId, username: 'testuser', email: 'test@example.com' };
    userRepo.getUserById.mockResolvedValue(userData);

    const result = await userService.getUserById(userId);

    expect(userRepo.getUserById).toHaveBeenCalledWith(userId);
    expect(result).toEqual(userData);
  });

  it('should update a user', async () => {
    const userId = '12345';
    const updateData = { username: 'updateduser' };
    const updatedUser = { id: userId, ...updateData };
    userRepo.updateUser.mockResolvedValue(updatedUser);

    const result = await userService.updateUser(userId, updateData);

    expect(userRepo.updateUser).toHaveBeenCalledWith(userId, updateData);
    expect(result).toEqual(updatedUser);
  });

  it('should delete a user', async () => {
    const userId = '12345';
    userRepo.deleteUser.mockResolvedValue(true);

    const result = await userService.deleteUser(userId);

    expect(userRepo.deleteUser).toHaveBeenCalledWith(userId);
    expect(result).toBe(true);
  });

  it('should return all users', async () => {
    const users = [{ id: '1', username: 'user1' }, { id: '2', username: 'user2' }];
    userRepo.getAllUsers.mockResolvedValue(users);

    const result = await userService.getAllUsers();

    expect(userRepo.getAllUsers).toHaveBeenCalled();
    expect(result).toEqual(users);
  });
});
