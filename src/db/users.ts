import { eq, like, or, desc } from 'drizzle-orm';
import { z } from 'zod';
import { db } from './connection';
import { users, type User, type NewUser } from './schema';

// Схемы валидации
export const createUserSchema = z.object({
  name: z.string().min(3).max(50),
  bio: z.string().max(142).optional(),
  email: z.string().optional(),
});

export const updateUserSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(50).optional(),
  bio: z.string().max(142).optional(),
  email: z.string().optional(),
});

export const getUserByIdSchema = z.string();

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

// Операции с базой данных
export class UserDatabase {
  static async getUserById(id: string): Promise<User | undefined> {
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

  static async getAllUsers(): Promise<User[]> {
    try {
      const allUsers = await db
        .select()
        .from(users)
        .orderBy(desc(users.createdAt));
      
      return allUsers;
    } catch (error) {
      console.error('Error getting all users:', error);
      throw new Error('Failed to get users');
    }
  }

  static async createUser(userData: CreateUserInput): Promise<User> {
    try {
      const id = Date.now().toString();
      const timestamp = new Date().toISOString();
      
      const newUser: NewUser = {
        id,
        name: userData.name,
        bio: userData.bio || null,
        email: userData.email || null,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      await db.insert(users).values(newUser);
      
      const createdUser = await this.getUserById(id);
      if (!createdUser) {
        throw new Error('Failed to retrieve created user');
      }
      
      return createdUser;
    } catch (error) {
      console.error('Error creating user:', error);
      if (error instanceof Error && error.message.includes('UNIQUE constraint')) {
        throw new Error('Email already exists');
      }
      throw new Error('Failed to create user');
    }
  }

  static async updateUser(id: string, updates: Partial<CreateUserInput>): Promise<User | null> {
    try {
      const updateData: Partial<NewUser> = {
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      const result = await db
        .update(users)
        .set(updateData)
        .where(eq(users.id, id));

      if (result.changes === 0) {
        return null; // Пользователь не найден
      }

      return await this.getUserById(id) || null;
    } catch (error) {
      console.error('Error updating user:', error);
      if (error instanceof Error && error.message.includes('UNIQUE constraint')) {
        throw new Error('Email already exists');
      }
      throw new Error('Failed to update user');
    }
  }

  static async deleteUser(id: string): Promise<boolean> {
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

  static async searchUsers(query: string): Promise<User[]> {
    try {
      const searchPattern = `%${query}%`;
      
      const foundUsers = await db
        .select()
        .from(users)
        .where(
          or(
            like(users.name, searchPattern),
            like(users.bio, searchPattern),
            like(users.email, searchPattern)
          )
        )
        .orderBy(desc(users.createdAt));
      
      return foundUsers;
    } catch (error) {
      console.error('Error searching users:', error);
      throw new Error('Failed to search users');
    }
  }
}