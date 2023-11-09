import type { Config } from 'drizzle-kit';

export default {
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DB_URL ?? 'postgresql://postgres:postgres@localhost:5432/remix-spotify',
  },
} satisfies Config;
