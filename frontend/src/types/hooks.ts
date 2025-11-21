import { AvailableLanguages } from "./common";
import { Languages } from "./slices";
import { AxiosResponse } from "axios";

export interface UseLanguageReturn {
    language: string;
    availableLanguages: AvailableLanguages[];
    setLanguage: (language: string) => void;
}

export interface DuplicateSnippetParams {
    code: string;
    snippetName: string;
    language: Languages | string;
}

export interface DuplicateSnippetResult {
    slug: string;
}

export type DuplicateSnippetFunction = (params: DuplicateSnippetParams) => Promise<DuplicateSnippetResult>;

export interface UseRunButtonReturn {
    onClick: () => void;
    update: (id: number, name: string) => Promise<AxiosResponse>;
    disabled: boolean;
    code: string;
}

export interface UseSaveButtonReturn {
    saveCode: () => void;
}
