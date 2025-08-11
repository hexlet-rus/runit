import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema/*',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'database.sqlite',
  },
  verbose: true,
  strict: true,
  breakpoints: true,
});

// credentials for postgres:
// dbCredentials: {
//     url: "postgres://user:password@host:port/db",
//   }