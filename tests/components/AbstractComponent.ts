import {AbstractPage} from "../page/AbstractPage";
import {Locator} from "@playwright/test";

export abstract class AbstractComponent extends AbstractPage {
    locator: Locator;
    constructor(locator: Locator) {
        super(locator.page());
        this.locator = locator;
    }

    abstract expectedLoad(): Promise<void>
}
