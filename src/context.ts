import { initTRPC, TRPCError } from '@trpc/server';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { db } from './db/connection';
import { UserDatabase } from './db/users';

// Контекст для tRPC
export interface Context {
  db: typeof db;
  req: FastifyRequest;
  res: FastifyReply;
  user?: {
    userId: number;
    isAdmin: boolean;
  };
}

// Инициализация tRPC
const t = initTRPC.context<Context>().create({
  errorFormatter({ shape }) {
    return shape;
  },
});

// Экспорт основных процедур
export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

// Защищенная процедура с проверкой JWT
export const protectedProcedure = t.procedure.use(
  async ({ ctx, next }) => {
    try {
      await ctx.req.jwtVerify(); // Проверка JWT
      const user = await UserDatabase.getUserById(ctx.req.user.userId);
      
      if (!user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      return next({
        ctx: {
          ...ctx,
          user: {
            userId: user.id,
            isAdmin: user.role === 'admin'
          }
        }
      });
    } catch (error) {
      throw new TRPCError({ 
        code: 'UNAUTHORIZED',
        message: 'Необходима авторизация'
      });
    }
  }
);

// Функция создания контекста
export const createContext = ({ 
  req, 
  res 
}: { 
  req: FastifyRequest; 
  res: FastifyReply; 
}): Context => ({
  db,
  req,
  res,
});