import { router } from '../context';
import { userRouter } from './userRouter';
import { snippetRouter } from './snippetRouter'; // Импортируем роутер сниппетов

export const appRouter = router({
  users: userRouter,    // Роутер для пользователей
  snippets: snippetRouter, // Добавляем роутер для сниппетов
});

export type AppRouter = typeof appRouter;
