import {expect, test} from '../fixture';
import {TypeSnippets} from "../page/MySnippetsPage";
import {readExpectedFile, readSnippetFile, typeSnippetsPath} from "../data/snipets";
import {configHelper} from "../helpers/configHelper";

/* TODO: Тесты каждый раз создают пользователя в приложении,все должно происходит в тестовом окружении */

const listTestCase = [
    {
        title: 'Add and check JavaScript snippet',
        lang: TypeSnippets.js,
        skip: false
    },
    {
        title: 'Add and check PHP snippet',
        lang: TypeSnippets.php,
        skip: configHelper.runWithoutDocker
    },
    {
        title: 'Add and check Python snippet',
        lang: TypeSnippets.python,
        skip: configHelper.runWithoutDocker
    },
    {
        title: 'Add and check Ruby snippet',
        lang: TypeSnippets.ruby,
        skip: configHelper.runWithoutDocker
    },
    {
        title: 'Add and check Java snippet',
        lang: TypeSnippets.java,
        skip: configHelper.runWithoutDocker
    }
]

test.describe('Check snippets', () => {
    for (const testCase of listTestCase) {
        const {title, lang, skip} = testCase;
        test(title, async ({app: {mySnippetsPage, codeEditorPage}}) => {
            test.skip(skip, 'Нужно поднимать все докеры, для запуска всех тестов');

            const code = await readSnippetFile(typeSnippetsPath.simple, lang);
            const expectedOutput = await readExpectedFile(typeSnippetsPath.simple)
            await mySnippetsPage.create(lang);

            await codeEditorPage.fillCode(code);
            await codeEditorPage.run();

            await codeEditorPage.terminal.expectedOutput(expectedOutput);
        });
    }

    test('Add and check HTML snippet', async ({page, app: {mySnippetsPage, codeEditorPage}}) => {
        const data = {
            code: '<div style="background-color: red">Hello, World!</div>',
        }
        await mySnippetsPage.create(TypeSnippets.html);
        await codeEditorPage.fillCode(data.code);

        // TODO: при проверки рендера, лучше сделать скриншоты
        const locator = page.frameLocator('iframe[title="render"]').getByText('Hello, World!', {exact: true});
        await expect(locator).toHaveCSS('background-color', 'rgb(255, 0, 0)');
    });
});
