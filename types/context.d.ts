import type { FastifyRequest, FastifyReply } from 'fastify';
import { db } from './db/connection';
export interface Context {
    db: typeof db;
    req: FastifyRequest;
    res: FastifyReply;
}
export declare const createContext: ({ req, res }: {
    req: FastifyRequest;
    res: FastifyReply;
}) => Context;
export declare const t: import("@trpc/server").TRPCRootObject<Context, object, {
    errorFormatter({ shape }: {
        error: import("@trpc/server").TRPCError;
        type: import("@trpc/server").ProcedureType | "unknown";
        path: string | undefined;
        input: unknown;
        ctx: Context | undefined;
        shape: import("@trpc/server").TRPCDefaultErrorShape;
    }): import("@trpc/server").TRPCDefaultErrorShape;
}, {
    ctx: Context;
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}>;
export declare const router: import("@trpc/server").TRPCRouterBuilder<{
    ctx: Context;
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}>;
export declare const publicProcedure: import("@trpc/server").TRPCProcedureBuilder<Context, object, object, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, import("@trpc/server").TRPCUnsetMarker, false>;
