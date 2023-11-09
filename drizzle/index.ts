import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DB_URL ?? 'postgresql://postgres:postgres@localhost:5432/remix-spotify';

const client = postgres(connectionString, { max: 1 });
export const db = drizzle(client, { schema });
