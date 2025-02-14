import {BasePage} from "./AbstractPage";
import {expect} from "@playwright/test";
import {step} from "../helpers/alluerStep";

export interface RegisterData {
    username: string,
    email: string,
    password: string
}

export class SignupPage extends BasePage {
    url = '/signup';
    private usernameInput = this.page.locator('#username');
    private emailInput = this.page.locator('#email');
    private passwordInput = this.page.locator('#password');
    private registerButton = this.page.locator('.page-wrapper').getByRole('button', { name: 'Sign up'})

    @step('Страница /signup загрузилась')
    async expectedLoad(): Promise<void> {
        await expect(this.usernameInput).toBeVisible()
        await expect(this.passwordInput).toBeVisible()
        await expect(this.emailInput).toBeVisible()
    }

    @step('Заполнить и отправить форму регистрации')
    async register(data: RegisterData): Promise<void> {
        const  { username, email, password } = data;
        await this.usernameInput.fill(username);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.registerButton.click();
    }

    @step('Проверяем отображение ошибки $0')
    async expectErrorMessage(error: string) {
        await expect(this.page.locator('.invalid-feedback').getByText(error)).toBeVisible();
    }
}

