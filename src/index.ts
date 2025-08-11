import { fastify } from 'fastify';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
// import { initializeTables } from './db/connection';
import { runMigrations } from './db/connection';
import { appRouter } from './router/index';
import { createContext } from './context';

const getApp = async () => {
  // Запуск миграций
  await runMigrations();

  // Инициализация таблиц вместо миграций
  // initializeTables();

  const server = fastify({
    maxParamLength: 5000,
  });

  server.get('/', async (request, reply) => {
    reply.type('text/html').send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome</title>
      </head>
      <body>
        <h2>WELCOME</h2>
      </body>
      </html>
    `);
  });

  server.get('/hello', async (request, reply) => {
    reply.type('text/plain').send('Hello world');
  });


  // Регистрация tRPC плагина
  await server.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: { 
        router: appRouter,
        createContext,
     },
  });

  return server;
};

export default getApp;