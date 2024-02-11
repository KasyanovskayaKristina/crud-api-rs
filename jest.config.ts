module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
};
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageProvider: 'v8',
  moduleFileExtensions: ['js', 'ts'],
  rootDir: './test',
  testMatch: ['**/test/user-test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
};

export default config;