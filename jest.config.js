module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.js'],
  maxWorkers: 1,
  setupFilesAfterEnv: ['<rootDir>/test/setup.js']
};
