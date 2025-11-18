// tests/login.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { Location_Day_MealType } from '../pages/Location_Day_MealType.js';

test.describe('Order flow', () => {
test('User should be able to login successfully', async ({ page }) => {
  const login = new LoginPage(page);
  // 1. Open website
  await login.navigate();
  await login.LoginDetails();
  console.log(' Login successful.');
  await page.waitForTimeout(5000);
});
test('select location', async ({ page }) => {
  const login = new LoginPage(page);
  const Location = new Location_Day_MealType(page);
  await login.navigate();
  await login.LoginDetails();
  const isVisible = await Location.verifyPickupSectionVisible(); // Verify "Choose Pickup Location" section visible
  expect(isVisible).toBeTruthy();
  await Location.selectMainLocation();   // Select location
  await page.waitForTimeout(5000);
  await Location.Mealtype();            // Select Meal Type
  await page.waitForTimeout(5000);
//  await Location.selectAvailableDayAndMenu();
});
} );
