import { router } from '../context';
import { userRouter } from './userRouter';

export const appRouter = router({
  users: userRouter,
});

export type AppRouter = typeof appRouter;
