import { eq, and, desc } from 'drizzle-orm';
import { z } from 'zod';
import { db } from './connection';
import { snippets, users, type Snippet, type NewSnippet } from './schema/schema';
import { faker } from '@faker-js/faker';
import { generateUniqSlug } from '../utils/generate-uniq-slug';

export const createSnippetSchema = z.object({
  name: z.string().min(1).max(100),
  code: z.string().min(1),
  language: z.enum(['javascript', 'python', 'java', 'php', 'ruby', 'html']),
});

export const updateSnippetSchema = createSnippetSchema.partial().extend({
  id: z.number()
});

export const getSnippetByIdSchema = z.number();
export const getSnippetByUsernameSlugSchema = z.object({
  username: z.string(),
  slug: z.string()
});

export type CreateSnippetInput = z.infer<typeof createSnippetSchema>;
export type UpdateSnippetInput = z.infer<typeof updateSnippetSchema>;

export class SnippetDatabase {
  private static async verifyUserExists(userId: number): Promise<void> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
  }

  static async getSnippetById(id: number): Promise<Snippet | undefined> {
    try {
      const [snippet] = await db
        .select()
        .from(snippets)
        .where(eq(snippets.id, id))
        .limit(1);
      
      return snippet;
    } catch (error) {
      console.error('Error in getSnippetById:', error);
      throw new Error('Failed to get snippet by ID');
    }
  }

  static async getSnippetByUsernameSlug(username: string, slug: string): Promise<Snippet | undefined> {
    try {
      const [result] = await db
        .select()
        .from(snippets)
        .innerJoin(users, eq(snippets.userId, users.id))
        .where(and(eq(users.username, username), eq(snippets.slug, slug)))
        .limit(1);
      
      return result?.snippets;
    } catch (error) {
      console.error('Error in getSnippetByUsernameSlug:', error);
      throw new Error('Failed to get snippet by username and slug');
    }
  }

  static async getAllSnippets(): Promise<Snippet[]> {
    try {
      return await db
        .select()
        .from(snippets)
        .orderBy(desc(snippets.createdAt));
    } catch (error) {
      console.error('Error in getAllSnippets:', error);
      throw new Error('Failed to get all snippets');
    }
  }

  static async createSnippet(userId: number, snippetData: CreateSnippetInput): Promise<Snippet> {
    try {
      await this.verifyUserExists(userId);
      
      const slug = await this.generateSlug(userId);
      if (!slug) {
        throw new Error('Failed to generate slug');
      }

      const [result] = await db.insert(snippets)
        .values({
          name: snippetData.name,
          code: snippetData.code,
          language: snippetData.language,
          slug,
          userId,
        })
        .returning();
      
      if (!result) {
        throw new Error('Database returned empty result');
      }
      
      return result;
    } catch (error) {
      console.error('Error in createSnippet:', error);
      throw new Error(`Failed to create snippet: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async updateSnippet(id: number, updates: UpdateSnippetInput): Promise<Snippet> {
    try {
      const [result] = await db
        .update(snippets)
        .set({
          name: updates.name,
          code: updates.code,
          language: updates.language,
        })
        .where(eq(snippets.id, id))
        .returning();

      if (!result) {
        throw new Error(`Snippet with id ${id} not found`);
      }
      
      return result;
    } catch (error) {
      console.error('Error in updateSnippet:', error);
      throw new Error(`Failed to update snippet: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async deleteSnippet(id: number): Promise<boolean> {
    try {
      const result = await db
        .delete(snippets)
        .where(eq(snippets.id, id));
      
      return result.changes > 0;
    } catch (error) {
      console.error('Error in deleteSnippet:', error);
      throw new Error(`Failed to delete snippet: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private static async generateSlug(userId: number): Promise<string> {
    try {
      const userSnippets = await db
        .select({ slug: snippets.slug })
        .from(snippets)
        .where(eq(snippets.userId, userId));
      
      return generateUniqSlug(userSnippets);
    } catch (error) {
      console.error('Error in generateSlug:', error);
      // Fallback to random slug if generation fails
      return Math.random().toString(36).substring(2, 10);
    }
  }

  static generateName(): string {
    const adjectiveLength = 3 + Math.round(Math.random() * 6);
    const adjective = faker.word.adjective(adjectiveLength);
    const animal = faker.animal.type();
    return `${adjective}-${animal}`;
  }
}