import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000', {
    waitUntil: 'domcontentloaded',
  });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Run IT/);
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:3000', {
    waitUntil: 'domcontentloaded',
  });

  // Click the get started link.
  await page.getByRole('button', { name: 'Начать кодить' }).first().click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*signin/);
});
