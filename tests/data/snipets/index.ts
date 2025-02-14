import {TypeSnippets} from "../../page/MySnippetsPage";
import * as path from "node:path";
import * as fs from "node:fs/promises";

// дериктории которые есть в snippets
export enum typeSnippetsPath {
    simple = "simple",
}

const pathTestData = 'tests/data/snipets';

const getPathExpectedResult = (type: typeSnippetsPath) => path.resolve(`${pathTestData}/${type}/expect.txt`);

const getPathSnippets = (type: typeSnippetsPath, lang: TypeSnippets): string => {
    const relativePath = `${pathTestData}/${type}/${lang}.txt`;

    return path.resolve(relativePath);
};

const readFileContent = async (filePath: string): Promise<string> => {
    try {
        return await fs.readFile(filePath, 'utf-8');
    } catch (error) {
        throw new Error(`Ошибка при чтении файла ${filePath}: ${error}`);
    }
};

export const readSnippetFile = (type: typeSnippetsPath, lang: TypeSnippets): Promise<string> => {
    const filePath = getPathSnippets(type, lang);
    return readFileContent(filePath);
};

export const readExpectedFile = (type: typeSnippetsPath): Promise<string> => {
    const filePath = getPathExpectedResult(type);
    return readFileContent(filePath);
};
