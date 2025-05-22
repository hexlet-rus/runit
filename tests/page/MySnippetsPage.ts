import {BasePage} from "./AbstractPage";
import {Locator, expect} from "@playwright/test";
import {step} from "../helpers/alluerStep";

export enum TypeSnippets {
    js = 'js',
    html = 'html',
    ruby = 'ruby',
    python = 'python',
    php = 'php',
    java = 'java',
}

export class MySnippetsPage extends BasePage {
    url = '/profile'
    private groupSnippets = this.page.locator('.new-snippet')
    private createBtn = this.page.locator('button', { hasText: /Create/ });

    private newSnippets: Record<TypeSnippets, Locator> = {
        [TypeSnippets.js]: this.page.locator('a[aria-label="javascript"]'),
        [TypeSnippets.html]: this.page.locator('a[aria-label="html"]'),
        [TypeSnippets.php]: this.page.locator('a[aria-label="php"]'),
        [TypeSnippets.ruby]: this.page.locator('a[aria-label="ruby"]'),
        [TypeSnippets.java]: this.page.locator('a[aria-label="java"]'),
        [TypeSnippets.python]: this.page.locator('a[aria-label="python"]'),
    }

    @step('Открытие модалки, выбор языка, кликнуть на кнопку создания снипета для языка $0')
    async create(type: TypeSnippets) {
        await this.groupSnippets.click();
        await this.newSnippets[type].click();
        await this.createBtn.click();
    }

    @step('Проверить, что страница загрузилась')
    async expectedLoad(): Promise<void> {
        await expect(this.groupSnippets).toBeVisible()
    }

    @step('Отобрадается username $0')
    async expectedUserName(userName: string) {
        const userNameLocator =  this.page.getByRole('heading', { name: userName })
        await expect(userNameLocator).toBeVisible();
    }
}
