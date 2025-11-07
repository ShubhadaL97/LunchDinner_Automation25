import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { MenuPage } from '../pages/MenuPage.js';

test('Verify menu navigation', async ({ page }) => {
  const home = new HomePage(page);
  const menu = new MenuPage(page);

  await home.navigate();
  await home.clickMenu();
  await menu.selectCategory('Lunch');
  await menu.selectItem('Curry');
});