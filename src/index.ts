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
          ignore: 'pid,hostname',
          colorize: true
        }
      }
    }
  });

  // Запуск миграций
  await runMigrations();

  // Регистрация плагинов
  await server.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET || 'your-cookie-secret-here',
    hook: 'onRequest',
    parseOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    }
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
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  });

  // Базовые роуты
  server.get('/', async (request, reply) => {
    reply.type('text/html').send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Documentation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; }
          h1 { color: #333; }
          ul { list-style: none; padding: 0; }
          li { margin: 10px 0; }
          a { color: #0066cc; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .endpoint { background: #f5f5f5; padding: 10px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <h1>Welcome to RunIT API</h1>
        <p>Available endpoints:</p>
        <ul>
          <li class="endpoint"><strong>GET</strong> <a href="/hello">/hello</a> - Test endpoint</li>
          <li class="endpoint"><strong>POST</strong> /register - User registration</li>
          <li class="endpoint"><strong>POST</strong> /login - User login</li>
          <li class="endpoint"><strong>POST</strong> /refresh - Refresh token</li>
          <li class="endpoint"><strong>POST</strong> /logout - User logout</li>
          <li class="endpoint"><strong>TRPC</strong> /trpc - tRPC endpoint</li>
        </ul>
      </body>
      </html>
    `);
  });

  server.get('/hello', async (request, reply) => {
    return { message: 'Hello world!' };
  });

  server.get('/health', async (request, reply) => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  // Регистрация auth роутера
  await authRouter(server);

  // Регистрация tRPC плагина
  await server.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: {
      router: userRouter,
      createContext,
      onError: ({ path, error }) => {
        server.log.error(`tRPC error on ${path}:`, error);
      }
    }
  });

  // Обработчик 404
  server.setNotFoundHandler((request, reply) => {
    reply.code(404).send({
      error: 'Not Found',
      message: `Route ${request.method}:${request.url} not found`,
      suggest: 'Try checking / for available endpoints'
    });
  });

  return server;
};

export default buildApp;