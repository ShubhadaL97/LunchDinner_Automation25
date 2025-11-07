// tests/login.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import testData from '../data/testData.json' assert { type: 'json' };

test('User should be able to login successfully', async ({ page }) => {
  const login = new LoginPage(page);

  // 1. Open website
  await login.navigate();

  // 2. Click login button (if applicable)
  await login.openLoginForm();

  // 3. Enter email and password from test data
  await login.enterCredentials(
    testData.user.email,
    '2014So8#' // replace with actual password or test password
  );

  // 4. Click submit button
  await login.submitLogin();

  // 5. Verify login success
  const success = await login.verifyLoginSuccess();
  expect(success).toBeTruthy();

  // 6. Logout to clean up
  await login.logout();
});