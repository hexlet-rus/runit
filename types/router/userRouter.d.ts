export declare const userRouter: import("@trpc/server").TRPCBuiltRouter<{
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
