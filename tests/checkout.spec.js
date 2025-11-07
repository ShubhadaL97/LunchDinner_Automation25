import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import testData from '../data/testData.json' assert { type: 'json' };

test('Complete checkout process', async ({ page }) => {
  const home = new HomePage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await home.navigate();
  await cart.addItem('Burger');
  await cart.checkout();
  await checkout.fillDetails(
    testData.user.name,
    testData.user.email,
    testData.user.address
  );
  await checkout.placeOrder();

  // Example check for success message
  // expect(await page.locator('text=Order Confirmed')).toBeVisible();
});