import type {Config} from 'jest';
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  clearMocks: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    "^next/navigation$": "next-router-mock",
  },
  testPathIgnorePatterns: ["<rootDir>/e2e/", "<rootDir>/.next/", "<rootDir>/node_modules/"],
};

export default createJestConfig(config)
