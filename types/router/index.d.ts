export declare const appRouter: import("@trpc/server").TRPCBuiltRouter<{
    ctx: import("../context").Context;
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    users: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("../context").Context;
        meta: object;
        errorShape: import("@trpc/server").TRPCDefaultErrorShape;
        transformer: false;
    }, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
        getUserById: import("@trpc/server").TRPCQueryProcedure<{
            input: number;
            output: {
                id: number;
                username: string;
                email: string;
                password: string;
                recoverHash: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
            meta: object;
        }>;
        getAllUsers: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                username: string;
                email: string;
                password: string;
                recoverHash: string | null;
                createdAt: Date;
                updatedAt: Date;
            }[];
            meta: object;
        }>;
        createUser: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                username: string;
                email: string;
                password: string;
                recoverHash?: string | undefined;
            };
            output: {
                id: number;
                username: string;
                email: string;
                password: string;
                recoverHash: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
            meta: object;
        }>;
        updateUser: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                username?: string | undefined;
                email?: string | undefined;
                password?: string | undefined;
                recoverHash?: string | undefined;
            };
            output: {
                id: number;
                username: string;
                email: string;
                password: string;
                recoverHash: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
            meta: object;
        }>;
        deleteUser: import("@trpc/server").TRPCMutationProcedure<{
            input: number;
            output: {
                success: boolean;
                id: number;
            };
            meta: object;
        }>;
    }>>;
    snippets: import("@trpc/server").TRPCBuiltRouter<{
        ctx: import("../context").Context;
        meta: object;
        errorShape: import("@trpc/server").TRPCDefaultErrorShape;
        transformer: false;
    }, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
        getSnippetById: import("@trpc/server").TRPCQueryProcedure<{
            input: number;
            output: {
                id: number;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                slug: string | null;
                code: string;
                language: string | null;
                userId: number | null;
            };
            meta: object;
        }>;
        getSnippetByUsernameSlug: import("@trpc/server").TRPCQueryProcedure<{
            input: {
                username: string;
                slug: string;
            };
            output: {
                id: number;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                slug: string | null;
                code: string;
                language: string | null;
                userId: number | null;
            };
            meta: object;
        }>;
        getAllSnippets: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                id: number;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                slug: string | null;
                code: string;
                language: string | null;
                userId: number | null;
            }[];
            meta: object;
        }>;
        createSnippet: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                name: string;
                code: string;
                language: "javascript" | "python" | "java" | "php" | "ruby" | "html";
            };
            output: {
                id: number;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                slug: string | null;
                code: string;
                language: string | null;
                userId: number | null;
            };
            meta: object;
        }>;
        updateSnippet: import("@trpc/server").TRPCMutationProcedure<{
            input: {
                id: number;
                name?: string | undefined;
                code?: string | undefined;
                language?: "javascript" | "python" | "java" | "php" | "ruby" | "html" | undefined;
            };
            output: {
                id: number;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                slug: string | null;
                code: string;
                language: string | null;
                userId: number | null;
            };
            meta: object;
        }>;
        deleteSnippet: import("@trpc/server").TRPCMutationProcedure<{
            input: number;
            output: {
                success: boolean;
                id: number;
            };
            meta: object;
        }>;
        generateSnippetName: import("@trpc/server").TRPCQueryProcedure<{
            input: void;
            output: {
                name: string;
            };
            meta: object;
        }>;
    }>>;
}>>;
export type AppRouter = typeof appRouter;
