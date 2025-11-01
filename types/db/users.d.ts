import { z } from 'zod';
import { type User } from './schema/schema';
export declare const createUserSchema: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    recoverHash: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateUserSchema: z.ZodObject<{
    id: z.ZodNumber;
    username: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    recoverHash: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const getUserByIdSchema: z.ZodNumber;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export declare class UserDatabase {
    static getUserById(id: number): Promise<User | undefined>;
    static getUserByEmail(email: string): Promise<User | undefined>;
    static getUserByUsername(username: string): Promise<User | undefined>;
    static getAllUsers(): Promise<User[]>;
    static createUser(userData: CreateUserInput): Promise<User>;
    static updateUser(id: number, updates: Partial<Omit<CreateUserInput, 'password'>> & {
        password?: string;
    }): Promise<User | null>;
    static deleteUser(id: number): Promise<boolean>;
    static updateRecoverHash(email: string, recoverHash: string | null): Promise<boolean>;
}
