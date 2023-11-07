import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',
  // The glob patterns Jest uses to detect test files
  testMatch: ['<rootDir>/**/*.test.ts'],
};

export default config;
