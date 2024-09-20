// module.exports = {
//   transform: {
//     "^.+\\.(js|jsx)$": "babel-jest", // Transpile JS/JSX using Babel
//   },
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
// };
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)'
  ],
  testPathIgnorePatterns: ['/node_modules/'],
};
