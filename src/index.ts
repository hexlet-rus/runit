import { fastify, FastifyInstance, FastifyServerOptions } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { runMigrations } from './db/connection';
import { userRouter } from './router/index';
import { createContext } from './context';
import { authRouter } from './auth/router';
import dotenv from 'dotenv';

dotenv.config();

const buildApp = async (opts: FastifyServerOptions = {}): Promise<FastifyInstance> => {
  const server = fastify({
    ...opts,
    maxParamLength: 5000,
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname'
        }
      }
    }
  });

  // Остальной код остается без изменений
  await runMigrations();

  await server.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET || 'your-cookie-secret-here',
    hook: 'onRequest'
  });

  await server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'your-jwt-secret-here',
    cookie: {
      cookieName: 'refreshToken',
      signed: false
    }
  });

  await server.register(fastifyCors, {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true
  });

  // Регистрация роутеров
  await authRouter(server);

  await server.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: {
      router: userRouter,
      createContext
    }
  });

  return server;
};

export default buildApp;