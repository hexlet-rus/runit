import { router, publicProcedure } from '../context';
import { 
  UserDatabase, 
  createUserSchema, 
  getUserByEmailSchema, 
  getUserByIdSchema,
  updateUserSchema 
} from '../db/users';

// Это написал фронтендер :) Нужен анализ
export const userRouter = router({
  isUserExist: publicProcedure
  .input(getUserByEmailSchema)
  .mutation(async ({ input, ctx }) => {
    const user = await UserDatabase.getUserByEmail(input.email);
    if (user) {
      const correctPwd = user?.password === input.password;
      if (correctPwd) {
        return { success: true, user };
      } 
      throw new Error('Wrong password!');
    }
    throw new Error('Email doesnt exist');
  }),

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
});