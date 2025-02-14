import {AbstractPage} from "./AbstractPage";
import {LoginPage} from "./LoginPage";
import {SignupPage} from "./SignupPage";
import {Page} from "@playwright/test";
import {MySnippetsPage} from "./MySnippetsPage";
import {CodeEditorPage} from "./CodeEditorPage/CodeEditorPage";

export class Application extends AbstractPage {
    constructor(page: Page) {
        super(page);
    }

    login = new LoginPage(this.page);
    signup = new SignupPage(this.page);
    mySnippetsPage = new MySnippetsPage(this.page)
    codeEditorPage = new CodeEditorPage(this.page)
}
