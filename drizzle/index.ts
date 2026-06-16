import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { relations } from './relations';

const connectionString = process.env.DB_URL ?? 'postgresql://postgres:postgres@127.0.0.1:5432/remix-spotify';

const client = postgres(connectionString, { max: 1 });
export const db = drizzle({ client, relations });
