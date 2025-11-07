import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { CartPage } from '../pages/CartPage.js';
import testData from '../data/testData.json' assert { type: 'json' };

test('Add items to cart', async ({ page }) => {
  const home = new HomePage(page);
  const cart = new CartPage(page);

  await home.navigate();

  for (const item of testData.menuItems) {
    await cart.addItem(item);
  }

  const total = await cart.getTotal();
  expect(total).toBeGreaterThan(0);
});