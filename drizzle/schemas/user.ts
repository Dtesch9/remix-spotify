import { createId } from '@paralleldrive/cuid2';
import { bigint, integer, pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-valibot';
import type { Input, Output } from 'valibot';

export const users = pgTable('users', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => createId()),
  display_name: text('display_name').notNull(),
  href: text('href').notNull(),
  spotify_id: text('spotify_id').notNull().unique(),
  type: text('type').notNull(),
  uri: text('uri').notNull(),
  followers: integer('followers').notNull(),
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
  access_token: text('access_token').notNull(),
  refresh_token: text('refresh_token').notNull(),
  token_type: varchar('token_type', { length: 20 }).notNull(),
  expires_in: bigint('expires_in', { mode: 'number' }).notNull(),
  scope: text('scope', { enum: ['user-read-email user-read-private'] }).notNull(),
  user_id: varchar('user_id', { length: 255 })
    .references(() => users.id)
    .notNull()
    .unique(),
});

// Schema for inserting a user - can be used to validate API requests
export const insertUserSchema = createInsertSchema(users);

// Schema for selecting a user - can be used to validate API responses
export const selectUserSchema = createSelectSchema(users);

export type UserInput = Input<typeof insertUserSchema>;
export type User = Output<typeof selectUserSchema>;
