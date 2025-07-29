import { initTRPC } from '@trpc/server';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { db } from './db/connection';

// Контекст для tRPC
export interface Context {
  db: typeof db;
  req: FastifyRequest;
  res: FastifyReply;
}

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

// Инициализация tRPC с контекстом
export const t = initTRPC.context<Context>().create({
  errorFormatter({ shape }) {
    return shape;
  },
});

// Экспорт основных процедур
export const router = t.router;
export const publicProcedure = t.procedure;
