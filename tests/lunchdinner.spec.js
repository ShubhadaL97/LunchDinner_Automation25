import { test, expect } from '@playwright/test';

test('Homepage should load successfully', async ({ page }) => {
  await page.goto('https://lunchdinner.co.nz/');
  await expect(page).toHaveTitle(/Fresh Local Meal/i);
});