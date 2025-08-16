import { router, publicProcedure } from '../context';
import { z } from 'zod';
import { SnippetDatabase } from '../db/snippets';

// Явно определим схемы здесь, чтобы избежать проблем с парсингом
const createSchema = z.object({
  name: z.string().min(1).max(100),
  code: z.string().min(1),
  language: z.enum(['javascript', 'python', 'java', 'php', 'ruby', 'html']),
});

const updateSchema = createSchema.partial();

export const snippetRouter = router({
  getAll: publicProcedure.query(async () => {
    return await SnippetDatabase.findAll();
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() })) // Явно оборачиваем в z.object
    .query(async ({ input }) => {
      const snippet = await SnippetDatabase.findOne(input.id);
      if (!snippet) throw new Error('Snippet not found');
      return snippet;
    }),

  getByUsernameSlug: publicProcedure
    .input(z.object({
      username: z.string(),
      slug: z.string()
    }))
    .query(async ({ input }) => {
      const snippet = await SnippetDatabase.findByUsernameSlug(input.username, input.slug);
      if (!snippet) throw new Error('Snippet not found');
      return snippet;
    }),

  create: publicProcedure
    .input(createSchema)
    .mutation(async ({ input }) => {
      return await SnippetDatabase.create(1, input); // TEMP_USER_ID = 1
    }),

  update: publicProcedure
    .input(z.object({
      id: z.number(),
      data: updateSchema
    }))
    .mutation(async ({ input }) => {
      const updated = await SnippetDatabase.update(input.id, input.data);
      if (!updated) throw new Error('Snippet not found');
      return updated;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const success = await SnippetDatabase.delete(input.id);
      if (!success) throw new Error('Snippet not found');
      return { success: true };
    }),

  generateName: publicProcedure
    .query(() => {
      return { name: SnippetDatabase.generateName() };
    }),
});