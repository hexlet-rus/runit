import {BasePage} from "./AbstractPage";
import {expect} from "@playwright/test";
import {step} from "../helpers/alluerStep";

export class LoginPage extends BasePage {
    url = '/signin';
    private loginInput = this.page.getByRole('textbox', { name: 'Email' })
    private passwordInput = this.page.getByRole('textbox', { name: 'Password' })
    private loginButton = this.page.getByTestId('signin-button')

    @step('Страница /signin загрузилась')
    async expectedLoad(): Promise<void> {
        await expect(this.loginInput).toBeVisible()
        await expect(this.passwordInput).toBeVisible()
    }

    @step('Заполнить форму авторизации $0:$1')
    async login(email: string, password: string): Promise<void> {
        await this.loginInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    @step('Проверяем отображение ошибки $0')
    async expectErrorMessage(error: string) {
        await expect(this.page.getByText(error)).toBeVisible();
    }
}
