import {AbstractComponent} from "./AbstractComponent";
import {expect} from "@playwright/test";
import {TypeSnippets} from "../page/MySnippetsPage";
import {step} from "../helpers/alluerStep";

export class NewSnippetModal extends AbstractComponent {
    inputLang = this.page.getByTestId('inputLang');
    inputTitle = this.page.getByTestId('inputTitle');
    buttonCreate = this.page.getByTestId('buttonCreate');

    @step('Проверить, что модалка создания снипета отобразилась')
    async expectedLoad(): Promise<void> {
        await expect(this.locator).toBeVisible();
    }

    @step('Заполнить форму создания снипета')
    async fillForm(lang: TypeSnippets, nameSnippet: string): Promise<void> {
        await this.page.getByRole('option', { name: lang }).click()

        await this.inputTitle.fill(nameSnippet);
        await this.clickButtonCreate()
    }

    @step('Кликнуть на кнопку создания снипета')
    async clickButtonCreate(): Promise<void> {
        await this.buttonCreate.click();
    }

}
