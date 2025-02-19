import {mergeTests, Page, test as base} from '@playwright/test';
import {Application} from "../page/Application";
import {RegisterData} from "../page/SignupPage";
import {faker} from "@faker-js/faker";
import {StepsSpec} from "../steps";
import {AuthSteps} from "../steps/AuthStep";
import {MySnippetsPage} from "../page/MySnippetsPage";

export const registerUser = base.extend<{
    page: Page,
    userData?: RegisterData
}>({
    page: async ({page}, use) => {
        const users = {
            email: faker.internet.email(),
            username: faker.person.firstName(),
            password: '12344321',
        }
        const authSteps = new AuthSteps(page);
        const mySnippet = new MySnippetsPage(page)
        await authSteps.signUp(users);
        await mySnippet.open();

        await use(page);
    },
});

export const inject = base.extend<{ app: Application, steps: StepsSpec }>({
    app: async ({page}, use) => {
        const app = new Application(page);
        await use(app);
    },
    steps: async ({page}, use) => {
        const step = new StepsSpec(page);
        await use(step);
    }
})

export const test = mergeTests(registerUser, inject);


export {expect} from '@playwright/test';
