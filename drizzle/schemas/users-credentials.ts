import { createId } from '@paralleldrive/cuid2';
import { bigint, pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { users } from '.';

export const usersCredentials = pgTable('users_credentials', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => createId()),
  access_token: text('access_token').notNull(),
  refresh_token: text('refresh_token').notNull(),
  token_type: varchar('token_type', { length: 20 }).notNull(),
  expires_in: bigint('expires_in', { mode: 'number' }).notNull(),
  scope: text('scope').notNull(),
  user_id: varchar('user_id', { length: 255 })
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),
});
