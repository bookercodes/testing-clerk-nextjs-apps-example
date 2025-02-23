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
    "^next-router-mock$": "next-router-mock/MemoryRouterProvider/next-13",
    "^next-router-mock/MemoryRouterProvider$": "next-router-mock/MemoryRouterProvider/next-13",
    "^next/navigation$": "next-router-mock",
    "^next/router$": "next-router-mock",
    "^next/dist/shared/lib/router-context$": "next-router-mock",
  },
  testPathIgnorePatterns: ["<rootDir>/e2e/", "<rootDir>/.next/", "<rootDir>/node_modules/"],
};

export default createJestConfig(config)
