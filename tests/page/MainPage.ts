import {BasePage} from "./AbstractPage";
import {expect} from "@playwright/test";
import {step} from "../helpers/alluerStep";
import {NewSnippetModal} from "../components/NewSnippetModal";

export class MainPage extends BasePage {
    url = '/';
    buttonCodeWithoutReg = this.page.getByTestId('codeWithoutReg');
    newSnippetModal = new NewSnippetModal(
        this.page.getByTestId('newSnippetModal')
    )

    async expectedLoad(): Promise<void> {
        await expect(this.buttonCodeWithoutReg).toBeVisible();
    }

    @step('Кликнуть на кнопку кодить регистрации')
    async clickButtonCodeWithoutReg(): Promise<void> {
        await this.buttonCodeWithoutReg.click();
    }
}
