import { pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';
import { users } from '.';

export const usersToFriends = pgTable(
  'users_to_friends',
  {
    user_id: varchar('user_id', { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    friend_id: varchar('friend_id', { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  },
  (table) => {
    return {
      id: primaryKey(table.user_id, table.friend_id),
    };
  },
);
