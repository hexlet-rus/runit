import {AbstractPage} from "../AbstractPage";
import {expect} from '../../fixture';

export class TerminalComponents extends AbstractPage {
    private terminal = this.page.locator('.terminal')

    async expectedOutput(output: string) {
        await expect(this.terminal).toContainText(output, {timeout: 10_000})
    }
}
