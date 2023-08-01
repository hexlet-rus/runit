import { test, expect } from '@playwright/test';

/* TODO: Тесты каждый раз создают пользователя в приложении,
все должно происходит в тестовом окружении */
test('work', async ({ page }) => {
  const randomNum = Math.round(Math.random() * 1000 + Math.random() * 100);
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: 'Регистрация' }).click();
  await page.getByLabel('Электронная почта').fill(`test${randomNum}@test.test`);
  await page.getByLabel('Имя пользователя').fill(`test${randomNum}`);
  await page.getByLabel('Пароль', { exact: true }).fill('12345678');
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
  await page
    .getByRole('button', { name: 'Создать сниппет на JavaScript' })
    .click();

  await page
    .getByRole('textbox', {
      name: 'Editor content;Press Alt+F1 for Accessibility Options.',
    })
    .fill("// Write your code in JS\nconsole.log('Hello');");
  await page.getByRole('button', { name: 'Запустить' }).click();

  await expect(page.locator(':text("hello")')).toBeVisible();
});

test('Unable to register by invalid email ', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: 'Регистрация' }).click();
  await page.getByLabel('Электронная почта').fill(`test222@.t`);
  await page.getByLabel('Имя пользователя').fill(`testLogin`);
  await page.getByLabel('Пароль', { exact: true }).fill('12345678');
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
  await expect(page.getByText('Некорректная электронная почта')).toBeVisible();
});

test('Unable to register by invalid password ', async ({ page }) => {
  const randomNum = Math.round(Math.random() * 1000 + Math.random() * 100);
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: 'Регистрация' }).click();
  await page.getByLabel('Электронная почта').fill(`test${randomNum}@test.test`);
  await page.getByLabel('Имя пользователя').fill(`test${randomNum}`);
  await page.getByLabel('Пароль', { exact: true }).fill('1234567');
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
  await expect(page.getByText('От 8 до 30 символов')).toBeVisible();
});

test('Unable to re-register with an already registered email', async ({
  page,
}) => {
  const randomNum = Math.round(Math.random() * 1000 + Math.random() * 100);
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: 'Регистрация' }).click();
  await page.getByLabel('Электронная почта').fill(`test${randomNum}@test.test`);
  await page.getByLabel('Имя пользователя').fill(`test${randomNum}`);
  await page.getByLabel('Пароль', { exact: true }).fill('12345678');
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();

  await page.getByRole('button', { name: 'Профиль' }).click();
  await page.getByRole('button', { name: 'Выйти' }).click();
  await page.getByRole('button', { name: 'Регистрация' }).click();
  await page.getByLabel('Электронная почта').fill(`test${randomNum}@test.test`);
  await page.getByLabel('Имя пользователя').fill(`test${randomNum}`);
  await page.getByLabel('Пароль', { exact: true }).fill('12345678');
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
  await expect(page.getByText('Этот адрес уже зарегистрирован')).toBeVisible();
});

test('Unable to register with login less 2 symbols ', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: 'Регистрация' }).click();
  await page.getByLabel('Электронная почта').fill(`test222@.test.test`);
  await page.getByLabel('Имя пользователя').fill(`te`);
  await page.getByLabel('Пароль', { exact: true }).fill('12345678');
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
  await expect(page.getByText('От 3 до 16 символов')).toBeVisible();
});

test('Unable to register with login more 17 symbols ', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: 'Регистрация' }).click();
  await page.getByLabel('Электронная почта').fill(`test222@.test.test`);
  await page.getByLabel('Имя пользователя').fill(`testLogintestLogintestLogin`);
  await page.getByLabel('Пароль', { exact: true }).fill('12345678');
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
  await expect(page.getByText('От 3 до 16 символов')).toBeVisible();
});

test('Successful registration with password more 8-character ', async ({
  page,
}) => {
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name: 'Регистрация' }).click();
  await page.getByLabel('Электронная почта').fill(`test42@test.test`);
  await page.getByLabel('Имя пользователя').fill(`test42`);
  await page.getByLabel('Пароль', { exact: true }).fill('123456789');
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
  await expect(page.getByRole('button', { name: 'Профиль' })).toBeVisible();
});
