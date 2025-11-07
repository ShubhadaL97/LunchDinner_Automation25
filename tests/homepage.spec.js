import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';

test('Verify homepage title', async ({ page }) => {
  const home = new HomePage(page);
  await home.navigate();
  const title = await home.getTitle();
  expect(title).toContain('LunchDinner');
});