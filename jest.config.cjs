module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  moduleNameMapper: {
    // CSS-импорты в тестах не нужны — подменяем заглушкой.
    '\\.(css|less|scss)$': '<rootDir>/test/styleMock.cjs',
  },
  testMatch: ['<rootDir>/src/**/*.test.{js,jsx}'],
};
