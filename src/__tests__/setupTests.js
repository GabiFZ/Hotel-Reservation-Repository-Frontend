import '@testing-library/jest-dom';

// Force mock for import.meta.env
Object.defineProperty(import.meta, 'env', {
  value: {
    MODE: 'test'
  },
  writable: true
});