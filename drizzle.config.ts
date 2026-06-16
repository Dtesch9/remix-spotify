import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL ?? 'postgresql://postgres:postgres@127.0.0.1:5432/remix-spotify',
  },
});
