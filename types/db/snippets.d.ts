import { z } from 'zod';
import { type Snippet } from './schema/schema';
export declare const createSnippetSchema: z.ZodObject<{
    name: z.ZodString;
    code: z.ZodString;
    language: z.ZodEnum<{
        javascript: "javascript";
        python: "python";
        java: "java";
        php: "php";
        ruby: "ruby";
        html: "html";
    }>;
}, z.core.$strip>;
export declare const updateSnippetSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    code: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodEnum<{
        javascript: "javascript";
        python: "python";
        java: "java";
        php: "php";
        ruby: "ruby";
        html: "html";
    }>>;
    id: z.ZodNumber;
}, z.core.$strip>;
export declare const getSnippetByIdSchema: z.ZodNumber;
export declare const getSnippetByUsernameSlugSchema: z.ZodObject<{
    username: z.ZodString;
    slug: z.ZodString;
}, z.core.$strip>;
export type CreateSnippetInput = z.infer<typeof createSnippetSchema>;
export type UpdateSnippetInput = z.infer<typeof updateSnippetSchema>;
export declare class SnippetDatabase {
    private static verifyUserExists;
    static getSnippetById(id: number): Promise<Snippet | undefined>;
    static getSnippetByUsernameSlug(username: string, slug: string): Promise<Snippet | undefined>;
    static getAllSnippets(): Promise<Snippet[]>;
    static createSnippet(userId: number, snippetData: CreateSnippetInput): Promise<Snippet>;
    static updateSnippet(id: number, updates: UpdateSnippetInput): Promise<Snippet>;
    static deleteSnippet(id: number): Promise<boolean>;
    private static generateSlug;
    static generateName(): string;
}
