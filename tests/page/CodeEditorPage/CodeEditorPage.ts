import {BasePage} from "../AbstractPage";
import {TerminalComponents} from "./TerminalComponents";

export class CodeEditorPage extends BasePage {
    private editor = this.page.locator('.editor-page')
    private buttons = {
        save: this.page.getByRole('button', {name: 'Save'}),
        run: this.page.getByRole('button', {name: 'Run'}),
    }
    private notepadCode = this.page.getByRole('textbox', {
        name: 'Editor content;Press Alt+F1 for Accessibility Options.',
    })

    terminal = new TerminalComponents(this.page)

    async expectedLoad(): Promise<void> {
        expect(this.editor).toBeVisible()
        expect(this.notepadCode).toBeVisible()
    }

    async save() {
        await this.buttons.save.click()
    }

    async run() {
        await this.buttons.run.click()
    }

    async fillCode(code: string) {
        await this.notepadCode.clear()
        await this.notepadCode.fill(code);
    }
}
