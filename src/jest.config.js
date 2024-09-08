// jest.config.js
// export default {
//     testEnvironment: 'jsdom',
//     setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
//     moduleNameMapper: {
//       '\\.(css|less)$': 'identity-obj-proxy',
//     },
//   };
// const {defaults} = require('jest-config');

// /** @type {import('jest').Config} */
// const config = {
//   moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts', 'cts'],
// };

// module.exports = config;
// jest.config.js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Use Babel for .js and .jsx files
  },
  moduleFileExtensions: ['js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};
