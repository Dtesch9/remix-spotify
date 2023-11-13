import { createId } from '@paralleldrive/cuid2';
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-valibot';
import type { Input, Output } from 'valibot';

export const users = pgTable('users', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => createId()),
  display_name: text('display_name').notNull(),
  href: text('href').notNull(),
  spotify_id: text('spotify_id').notNull(),
  type: text('type').notNull(),
  uri: text('uri').notNull(),
  followers: text('followers').notNull(),
  country: text('country').notNull(),
  product: text('product').notNull(),
  email: text('email').notNull(),
  avatar_url: text('avatar_url').notNull(),
  external_url: text('external_url').notNull(),
});

export const usersCredentials = pgTable('users_credentials', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => createId()),
  accessToken: text('access_token'),
  refresh_token: text('refresh_token'),
  tokenType: varchar('token_type', { length: 20 }),
  expiresIn: timestamp('expires_in'),
  scope: text('scope', { enum: ['user-read-email user-read-private'] }),
  userId: varchar('user_id', { length: 255 }).references(() => users.id),
});

// Schema for inserting a user - can be used to validate API requests
export const insertUserSchema = createInsertSchema(users);

// Schema for selecting a user - can be used to validate API responses
export const selectUserSchema = createSelectSchema(users);

export type UserInput = Input<typeof insertUserSchema>;
export type UserOutput = Output<typeof selectUserSchema>;
