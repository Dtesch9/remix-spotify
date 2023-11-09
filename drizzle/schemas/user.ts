import { createId } from '@paralleldrive/cuid2';
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => createId()),
  access_token: text('access_token'),
  refresh_token: text('refresh_token'),
  token_type: varchar('token_type', { length: 20 }),
  expires_in: timestamp('expires_in'),
  scope: text('scope', { enum: ['user-read-email user-read-private'] }),
});
