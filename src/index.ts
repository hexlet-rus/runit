import { fastify } from 'fastify';
import { fastifyTRPCPlugin, FastifyTRPCPluginOptions, } from '@trpc/server/adapters/fastify';

import { runMigrations } from './db/connection';
import { appRouter, type AppRouter } from './router/index';
import { createContext } from './context';

const getApp = async () => {
   try {
    await runMigrations();
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }

  const server = fastify({
    logger: process.env.NODE_ENV === 'development',
    routerOptions: {
      maxParamLength: 1000,
      caseSensitive: false,
      ignoreTrailingSlash: true
   },
  });

  console.log('🔍 appRouter type:', typeof appRouter);
  console.log('🔍 createContext type:', typeof createContext);
  console.log('🔍 appRouter procedures:', Object.keys(appRouter._def?.procedures || {}));

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
        <p>Available procedures: ${Object.keys(appRouter._def?.procedures || {}).join(', ')}</p>
      </body>
      </html>
    `);
  });

  server.get('/hello', async (request, reply) => {
    reply.type('text/plain').send('Hello world');
  });

    try {
    console.log('📡 Registering tRPC plugin...');
    
    await server.register(fastifyTRPCPlugin, {
      prefix: '/trpc',
      trpcOptions: {
        router: appRouter,
        createContext,
        onError({ path, error }) {
          console.error(`❌ tRPC Error on path '${path}':`, error.message);
        },
      } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
    });
    
    console.log('✅ tRPC plugin registered successfully');
  } catch (error) {
    console.error('❌ Failed to register tRPC plugin:', error);
    throw error;
  }
  return server;
};

export default getApp;