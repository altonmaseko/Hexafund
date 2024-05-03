// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  
  
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    headless: true,
  },
  
  reporter: [
    ['list'],
    ['monocart-reporter', {  
        name: "My Test Report",
        outputFile: './playwright-coverage/report.html',
        consoleLog: true,
        coverage: [{
          entryFilter: (entry) => true,
          sourceFilter: (sourcePath) => sourcePath.search(/src\/.+/) !== -1,
          }
        ],
      }
    ],
  ],
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    }
  ],
  webServer: {
        command: 'node playwright-local-server.js',
        url: 'http://localhost:3000',
        timeout: 30000,
        reuseExistingServer: true,
    },
  
});

