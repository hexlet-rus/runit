import { router, publicProcedure } from '../context';
import { z } from 'zod';
import { 
  SnippetDatabase, 
  createSnippetSchema, 
  updateSnippetSchema,
  getSnippetByIdSchema,
  getSnippetByUsernameSlugSchema
} from '../db/snippets';

export const snippetRouter = router({
  getSnippetById: publicProcedure
    .input(getSnippetByIdSchema)
    .query(async ({ input }) => {
      const snippet = await SnippetDatabase.getSnippetById(input);
      if (!snippet) {
        throw new Error('Snippet not found');
      }
      return snippet;
    }),

  getSnippetByUsernameSlug: publicProcedure
    .input(getSnippetByUsernameSlugSchema)
    .query(async ({ input }) => {
      const snippet = await SnippetDatabase.getSnippetByUsernameSlug(input.username, input.slug);
      if (!snippet) {
        throw new Error('Snippet not found');
      }
      return snippet;
    }),

  getAllSnippets: publicProcedure
    .query(async () => {
      return await SnippetDatabase.getAllSnippets();
    }),

  createSnippet: publicProcedure
    .input(createSnippetSchema)
    .mutation(async ({ input }) => {
      return await SnippetDatabase.createSnippet(1, input); // TEMP_USER_ID = 1
    }),

  updateSnippet: publicProcedure
    .input(updateSnippetSchema)
    .mutation(async ({ input }) => {
      const { id, ...updates } = input;
      const updatedSnippet = await SnippetDatabase.updateSnippet(id, updates);
      
      if (!updatedSnippet) {
        throw new Error('Snippet not found');
      }
      
      return updatedSnippet;
    }),

  deleteSnippet: publicProcedure
    .input(getSnippetByIdSchema)
    .mutation(async ({ input }) => {
      const success = await SnippetDatabase.deleteSnippet(input);
      
      if (!success) {
        throw new Error('Snippet not found');
      }
      
      return { success: true, id: input };
    }),

  generateSnippetName: publicProcedure
    .query(() => {
      return { name: SnippetDatabase.generateName() };
    }),
});