/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tests/tsconfig.json',
      },
    ],
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '^@$': '<rootDir>/lib',
    '^@/(.*)\\.[jt]sx?$': '<rootDir>/lib/$1',
    '^@/(.*)$': '<rootDir>/lib/$1',
    '^@mocks/(.*)\\.[jt]sx?$': '<rootDir>/tests/__MOCKS__/$1',
    '^@mocks/(.*)$': '<rootDir>/tests/__MOCKS__/$1',
    '^(\\.{1,2}/.*)\\.[jt]sx?$': '$1',
  },
};
export default config;
