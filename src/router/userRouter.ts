import { router, publicProcedure } from '../context';
import { z } from 'zod';
import { 
  UserDatabase, 
  createUserSchema, 
  getUserByIdSchema,
  updateUserSchema 
} from '../db/users';

export const userRouter = router({
  getUserById: publicProcedure
    .input(getUserByIdSchema)
    .query(async ({ input, ctx }) => {
      const user = await UserDatabase.getUserById(input);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    }),

  getAllUsers: publicProcedure
    .query(async ({ ctx }) => {
      return await UserDatabase.getAllUsers();
    }),

  createUser: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ input, ctx }) => {
      return await UserDatabase.createUser(input);
    }),

  updateUser: publicProcedure
    .input(updateUserSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...updates } = input;
      const updatedUser = await UserDatabase.updateUser(id, updates);
      
      if (!updatedUser) {
        throw new Error('User not found');
      }
      
      return updatedUser;
    }),

  deleteUser: publicProcedure
    .input(getUserByIdSchema)
    .mutation(async ({ input, ctx }) => {
      const success = await UserDatabase.deleteUser(input);
      
      if (!success) {
        throw new Error('User not found');
      }
      
      return { success: true, id: input };
    }),

  searchUsers: publicProcedure
    .input(z.object({ query: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      return await UserDatabase.searchUsers(input.query);
    }),
});