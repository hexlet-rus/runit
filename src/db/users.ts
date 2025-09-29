import { eq, like, or, desc } from 'drizzle-orm';
import { z } from 'zod';
import { db } from './connection';
import { users, type User, type NewUser } from './schema/schema';

export const createUserSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email().max(60),
  password: z.string().min(6).max(60),
  recoverHash: z.string().max(50).optional(),
});

export const updateUserSchema = z.object({
  id: z.number(),
  username: z.string().min(3).max(20).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).max(60).optional(),
  recoverHash: z.string().max(50).optional(),
});

export const getUserByIdSchema = z.number();

export const getUserByEmailSchema = z.object({
  email: z.string().email().max(60),
  password: z.string().min(6),
})

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

// Операции с базой данных
export class UserDatabase {
  static async getUserById(id: number): Promise<User | undefined> {
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);
      
      return user;
    } catch (error) {
      console.error('Error getting user by id:', error);
      throw new Error('Failed to get user');
    }
  }

  static async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
      
      return user;
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw new Error('Failed to get user');
    }
  }

  static async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1);
      
      return user;
    } catch (error) {
      console.error('Error getting user by username:', error);
      throw new Error('Failed to get user');
    }
  }

  static async getAllUsers(): Promise<User[]> {
    try {
      const allUsers = await db
        .select()
        .from(users)
        .orderBy(desc(users.created_at));
      
      return allUsers;
    } catch (error) {
      console.error('Error getting all users:', error);
      throw new Error('Failed to get users');
    }
  }

  static async createUser(userData: CreateUserInput): Promise<User> {
    try {
      const newUser: NewUser = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        recoverHash: userData.recoverHash || null,
      };

      const result = await db.insert(users).values(newUser).returning();
      
      if (!result[0]) {
        throw new Error('Failed to create user');
      }
      
      return result[0];
    } catch (error) {
      console.error('Error creating user:', error);
      if (error instanceof Error && error.message.includes('UNIQUE constraint')) {
        if (error.message.includes('username')) {
          throw new Error('Username already exists');
        }
        if (error.message.includes('email')) {
          throw new Error('Email already exists');
        }
      }
      throw new Error('Failed to create user');
    }
  }

  static async updateUser(id: number, updates: Partial<Omit<CreateUserInput, 'password'>> & { password?: string }): Promise<User | null> {
    try {
      const updateData: Partial<NewUser> = {
        ...updates,
      };

      const result = await db
        .update(users)
        .set(updateData)
        .where(eq(users.id, id))
        .returning();

      if (result.length === 0) {
        return null; // Пользователь не найден
      }

      return result[0];
    } catch (error) {
      console.error('Error updating user:', error);
      if (error instanceof Error && error.message.includes('UNIQUE constraint')) {
        if (error.message.includes('username')) {
          throw new Error('Username already exists');
        }
        if (error.message.includes('email')) {
          throw new Error('Email already exists');
        }
      }
      throw new Error('Failed to update user');
    }
  }

  static async deleteUser(id: number): Promise<boolean> {
    try {
      const result = await db
        .delete(users)
        .where(eq(users.id, id));

      return result.changes > 0;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  }

  static async updateRecoverHash(email: string, recoverHash: string | null): Promise<boolean> {
    try {
      const result = await db
        .update(users)
        .set({ recoverHash })
        .where(eq(users.email, email));

      return result.changes > 0;
    } catch (error) {
      console.error('Error updating recover hash:', error);
      throw new Error('Failed to update recover hash');
    }
  }
}