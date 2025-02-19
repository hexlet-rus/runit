import {AbstractPage} from "../page/AbstractPage";
import {Page} from "@playwright/test";
import {AuthSteps} from "./AuthStep";

export class StepsSpec extends AbstractPage {
    constructor(page: Page) {
        super(page);
    }

    authStep = new AuthSteps(this.page);
}
