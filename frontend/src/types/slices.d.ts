interface EditorSnippetData {
    id: number | null;                      //string???
    name: string | null;
    ownerUsername: string | null;
    slug: string;
    language: string;
}

export type EditorStateType = {
    snippetData: EditorSnippetData;
    error: boolean;
    isReady: boolean;
    hasSnippetData: boolean;
    code: string;
    savedCode: string;
    isAllSaved: boolean;
    direction: 'horizontal' | 'vertical';
    isNotMobile: boolean;
}

export type CheckedSnippetsType = {
    id: number,                             // string???
    isChecked: boolean,
}

export type CheckboxesSnippetsStateType = {
    checkedSnippets: Array<CheckedSnippetsType>;
    isCheckboxesOpen: boolean;
}

type Languages = 'javascript' | 'html' | 'php' | 'python' | 'java' | 'ruby';

export type SupportedLanguagesArr = Languages[];

export type LanguagesStateType = {
    supportedLanguages: SupportedLangsArr;
    currentLanguage: Languages;
}

interface ISnippet {
    id: number;             // string???
    name: string;
    ownerUsername: string;
    slug: string;
}

export type ModalStateType = {
    isOpen: boolean;
    type: string | null;
    item: ISnippet | null;
}

type Statuses = 'empty' | 'fullfilled' | 'pending' | 'rejected';

interface SnippetOwnerType {
    created_at: string;
    email: string;
    id: number;
    isAdmin: boolean;
    password: string;
    recover_hash?: unknown;
    tempPassword: string;
    updated_at: string;
    username: string;
}

type FetchedCurrentUser = SnippetOwnerType & {
    avatar_base64?: string | null;
    theme: Themes;
}

export type FetchedTerminalDataType = {
    id: number;
    code: string;
    slug: string;
    language: Languages;
    ownerUsername: string;
    name: string;
}

export type FetchedSnippet = {
    id: number;
    slug: string;
    name: string;
    code: string;
    language: Languages;
    userId: number;
    created_at: string;
    updated_at: string;
}

export type ResponseUserSnippets = {
    currentUser: FetchedCurrentUser;
    snippets: FetchedSnippet[];
}

export type SnippetsStateType = {
    status: SnippetsStatuses;
    snippets: FetchedSnippet[];
}

export interface IOutput {
    terminal: string[] | [];
    alertLogs: unknown[]
}

export type TerminalStateType = {
    codeExecutionState: 'idle' | 'executing';
    output: IOutput;
}

type Themes = 'dark' | 'light' | 'system';

type LoadingStatuses = 'loading' | 'idle' | 'failed';

type UILanguages = 'en' | 'ru' | '';

export type UserSettingsStateType = {
    language: UILanguages;
    theme: '' | Themes;
    avatar: string | null;
    loadingStatus: LoadingStatuses;
}

export type UserSettingsThunkType = {
    currentUser: FetchedCurrentUser & { language: UILanguages };
    snippets: Array<FetchedSnippet> & {
        user: SnippetOwnerType;
    }
}

export type UserSliceStateType = {
    status: Statuses;
    // userInfo пока так потому что с бэка из сервиса || контроллера 
    // прилетает cannot read properties of undefined (reading: 'toLowerCase')
    userInfo: Partial<FetchedCurrentUser> 
}

export type RootReducerType = {
    editor: EditorStateType;
    terminal: TerminalStateType;
    languages: LanguagesStateType;
    modal: ModalStateType;
    snippets: SnippetsStateType;
    user: UserSliceStateType;
    checkboxes: CheckboxesSnippetsStateType;
    userSettings: UserSettingsStateType;
}


