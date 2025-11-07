import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://lunchdinner.co.nz/',
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    video: 'on',
  },
});

