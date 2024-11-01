// jest.config.js
module.exports = {
  // Specifies the test environment that will be used for testing
  testEnvironment: 'jsdom',

  // Transform files with ts-jest and babel-jest
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Mapping module paths (if using path aliases)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // Add more aliases if necessary
  },

  // Setup files before running tests
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Collect coverage information
  collectCoverage: true,

  // Specify coverage directory
  coverageDirectory: 'coverage',

  // Patterns to ignore for coverage
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
};
