import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Read the .env.local file and set the environment variables
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

// Set the port for the server
const PORT = process.env.PORT || 3000;

// Set webServer.url and use.baseURL with the location of the WebServer respecting the correct set port
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  // Look for tests in the "e2e" directory
  testDir: './e2e',
  // Set the number of retries for each, in case of failure
  retries: 1,
  // Run your local dev server before starting the tests.
  webServer: {
    command: "npm run dev",
    /* Base URL to use in actions like `await page.goto('/')`. */
    url: baseURL,
    // Set the timeout for the server to start
    timeout: 120 * 1000,
    // Reuse the server between tests
    reuseExistingServer: !process.env.CI,
  },
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retry-with-trace',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "global setup",
      testMatch: /global\.setup\.ts/,
    },
    {
      name: "Main tests",
      testMatch: /user-submits-review\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"], // or your browser of chocie
      },
      dependencies: ["global setup"],
    },
  ],
});
