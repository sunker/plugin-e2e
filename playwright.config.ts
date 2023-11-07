import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { PluginOptions } from './src';

dotenv.config();
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<PluginOptions>({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3001',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    httpCredentials: {
      username: 'admin',
      password: 'admin',
    },
  },

  /* List of projects to run. See https://playwright.dev/docs/test-configuration#projects */
  projects: [
    // 1. Login to Grafana and store the cookie on disk for use in other tests.
    {
      name: 'authenticate',
      testMatch: [/.*auth\.setup\.ts/],
    },
    // 2. Create a datasource that can be used across tests (should use provsiioning DS instead, but currently not working in CI)
    {
      name: 'setupDatasource',
      use: {
        storageState: 'playwright/.auth/user.json',
      },
      testMatch: [/.*datasource\.setup\.ts/],
      dependencies: ['authenticate'],
    },
    // 3. Run all tests in parallel using Chrome.
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['authenticate', 'setupDatasource'],
    },
  ],
});
