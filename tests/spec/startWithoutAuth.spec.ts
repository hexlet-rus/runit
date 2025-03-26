import {inject} from "../fixture";
import {TypeSnippets} from "../page/MySnippetsPage";
import {faker} from "@faker-js/faker";
import {mergeTests} from "@playwright/test";

const test = mergeTests(inject);

test.describe('Check snippets', () => {
    test('Create snipeet without auth', async ({app: {mainPage, codeEditorPage}}) => {
        const randomNameSnippet = faker.lorem.word();
        await mainPage.open();

        await mainPage.clickButtonCodeWithoutReg();
        await mainPage.newSnippetModal.fillForm(TypeSnippets.js, randomNameSnippet);

        await codeEditorPage.expectedLoad();
    });
})
