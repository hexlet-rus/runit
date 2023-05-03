import { test, expect } from '@playwright/test';

test('work', async ({ page }) => {
  await page.goto('http://localhost:5001');
  await page.getByRole('button', { name: 'Регистрация' }).click();
  await page.getByLabel('Электронная почта').fill('test@test.test');
  await page.getByLabel('Логин').fill('test');
  await page.getByLabel('Пароль', { exact: true }).fill('password');
  await page.getByLabel('Подтвердить пароль').fill('password');
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();

  await page.getByRole('button', { name: 'Новый сниппет' }).click();
  await page.getByRole('button', { name: 'Сохранить' }).click();

  await page.getByRole('textbox', { name: 'Editor content;Press Alt+F1 for Accessibility Options.' }).fill('console.log(\'hello\');');
  await page.getByRole('button', { name: 'Запустить' }).click();

  await expect(page.locator(':text("hello")')).toBeVisible();
});
