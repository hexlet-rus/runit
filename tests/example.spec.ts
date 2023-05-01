import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5001');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Run IT/);
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:5001');

  // Click the get started link.
  await page.getByRole('link', { name: 'Начать кодить' }).first().click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*login/);
});
