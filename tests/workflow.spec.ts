import { test, expect } from '@playwright/test';

/* TODO: Тесты каждый раз создают пользователя в приложении,
все должно происходит в тестовом окружении */
test('work', async ({ page }) => {
  const randomNum = Math.round(Math.random() * 1000 + Math.random() * 100);
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: 'Регистрация' }).click();
  await page.getByLabel('Электронная почта').fill(`test${randomNum}@test.test`);
  await page.getByLabel('Логин').fill(`test${randomNum}`);
  await page.getByLabel('Пароль', { exact: true }).fill('12345678');
  await page.getByLabel('Подтвердить пароль').fill('12345678');
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();

  await page.getByRole('button', { name: 'Новый сниппет' }).click();
  await page.getByRole('button', { name: 'Сохранить' }).click();

  await page.getByRole('textbox', { name: 'Editor content;Press Alt+F1 for Accessibility Options.' }).fill('// Write your code in JS\nconsole.log(\'Hello\');');
  await page.getByRole('button', { name: 'Запустить' }).click();

  await expect(page.locator(':text("hello")')).toBeVisible();
});

test('Unable to register by invalid email ', async ({page}) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: 'Регистрация' }).click();
  await page.getByLabel('Электронная почта').fill(`test222@.t`);
  await page.getByLabel('Логин').fill(`testLogin`);
  await page.getByLabel('Пароль', { exact: true }).fill('12345678');
  await page.getByLabel('Подтвердить пароль').fill('12345678');
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
  await expect(page.getByText('Некорректная электронная почта')).toBeVisible();
})

test('Unable to register by invalid password ', async ({page}) => {
  const randomNum = Math.round(Math.random() * 1000 + Math.random() * 100);
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: 'Регистрация' }).click();
  await page.getByLabel('Электронная почта').fill(`test${randomNum}@test.test`);
  await page.getByLabel('Логин').fill(`test${randomNum}`);
  await page.getByLabel('Пароль', { exact: true }).fill('1234567');
  await page.getByLabel('Подтвердить пароль').fill('1234567');
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
  await expect(page.getByText('От 8 до 30 символов')).toBeVisible();
})

test('Unable to re-register with an already registered email', async ({ page }) => {
  const randomNum = Math.round(Math.random() * 1000 + Math.random() * 100);
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: 'Регистрация' }).click();
  await page.getByLabel('Электронная почта').fill(`test${randomNum}@test.test`);
  await page.getByLabel('Логин').fill(`test${randomNum}`);
  await page.getByLabel('Пароль', { exact: true }).fill('12345678');
  await page.getByLabel('Подтвердить пароль').fill('12345678');
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
  
  await page.getByRole('button', { name: 'Выйти' }).click();
  await page.getByRole('button', { name: 'Регистрация' }).click();
  await page.getByLabel('Электронная почта').fill(`test${randomNum}@test.test`);
  await page.getByLabel('Логин').fill(`test${randomNum}`);
  await page.getByLabel('Пароль', { exact: true }).fill('12345678');
  await page.getByLabel('Подтвердить пароль').fill('12345678');
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
  await expect(page.getByText('Этот адрес уже зарегистрирован')).toBeVisible();
});
