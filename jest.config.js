module.exports = {
  testMatch: ['**/test/**/*.test.js', '**/test/**/*.int.test.js'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'], // usar AfterEnv para hooks beforeAll/afterAll
  globalTeardown: '<rootDir>/jest.teardown.js',
};
