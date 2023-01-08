import type { Snippets } from './snippet.entity';
export declare class Users {
    id: number;
    login: string;
    email: string;
    password: string;
    snippets: Snippets[];
    created_at: string;
    updated_at: string;
    hashPassword(): Promise<void>;
    private tempPassword;
    loadTempPassword(): Promise<void>;
    hashPasswordIfNew(): Promise<void>;
}
