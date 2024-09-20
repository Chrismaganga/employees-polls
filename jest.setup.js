// Import jest-dom for better DOM assertions
// import '@testing-library/jest-dom/extend-expect';

// Mock specific global variables or APIs if needed
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve([]),
}));
