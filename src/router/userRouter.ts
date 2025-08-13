import { router, publicProcedure, protectedProcedure } from '../context';
import { z } from 'zod';
import { UserDatabase } from '../db/users';
import { TRPCError } from '@trpc/server';

// Улучшенные схемы валидации с сообщениями об ошибках
const createUserSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores"),
  email: z.string()
    .email("Invalid email format")
    .max(254, "Email must be at most 254 characters")
    .transform(val => val.toLowerCase().trim()),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/, 
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character")
});

const updateUserSchema = z.object({
  id: z.number().positive("Invalid user ID"),
  username: z.string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/)
    .optional(),
  email: z.string()
    .email()
    .max(254)
    .transform(val => val.toLowerCase().trim())
    .optional(),
  password: z.string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/)
    .optional()
});

const getUserByIdSchema = z.number().positive("Invalid user ID");

export const userRouter = router({
  // Получение текущего пользователя (защищенный роут)
  getCurrentUser: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        const user = await UserDatabase.getUserById(ctx.user.userId);
        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found'
          });
        }
        return user;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch user',
          cause: error
        });
      }
    }),

  // Получение пользователя по ID (публичный доступ)
  getUserById: publicProcedure
    .input(getUserByIdSchema)
    .query(async ({ input, ctx }) => {
      try {
        const user = await UserDatabase.getUserById(input);
        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found'
          });
        }
        return user;
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch user',
          cause: error
        });
      }
    }),

  // Получение всех пользователей (публичный доступ)
  getAllUsers: publicProcedure
    .query(async ({ ctx }) => {
      try {
        return await UserDatabase.getAllUsers();
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch users',
          cause: error
        });
      }
    }),

  // Создание пользователя (публичный доступ)
  createUser: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ input }) => {
      try {
        const existingUser = await UserDatabase.getUserByEmail(input.email);
        if (existingUser) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Email already in use'
          });
        }

        const existingByUsername = await UserDatabase.getUserByUsername(input.username);
        if (existingByUsername) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Username already taken'
          });
        }

        return await UserDatabase.createUser(input);
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create user',
          cause: error
        });
      }
    }),

  // Обновление пользователя (защищенный доступ)
  updateUser: protectedProcedure
    .input(updateUserSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        // Проверка прав доступа
        if (ctx.user.userId !== input.id && !ctx.user.isAdmin) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'You can only update your own profile'
          });
        }

        const { id, ...updates } = input;
        const updatedUser = await UserDatabase.updateUser(id, updates);
        
        if (!updatedUser) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found'
          });
        }
        
        return updatedUser;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update user',
          cause: error
        });
      }
    }),

  // Удаление пользователя (защищенный доступ)
  deleteUser: protectedProcedure
    .input(getUserByIdSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        // Проверка прав доступа
        if (ctx.user.userId !== input && !ctx.user.isAdmin) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'You can only delete your own account'
          });
        }

        const success = await UserDatabase.deleteUser(input);
        
        if (!success) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found'
          });
        }
        
        return { success: true, id: input };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete user',
          cause: error
        });
      }
    }),
});