import { defineRelations } from 'drizzle-orm';
import * as schema from './schema';

export const relations = defineRelations(schema, (r) => ({
  users: {
    credentials: r.one.usersCredentials({
      from: r.users.id,
      to: r.usersCredentials.user_id,
      optional: false,
    }),
    friends: r.many.users({
      from: r.users.id.through(r.usersToFriends.user_id),
      to: r.users.id.through(r.usersToFriends.friend_id),
      alias: 'friends',
    }),
  },
  usersCredentials: {
    user: r.one.users({
      from: r.usersCredentials.user_id,
      to: r.users.id,
      optional: false,
    }),
  },
  usersToFriends: {
    user: r.one.users({
      from: r.usersToFriends.user_id,
      to: r.users.id,
      optional: false,
    }),
    friend: r.one.users({
      from: r.usersToFriends.friend_id,
      to: r.users.id,
      optional: false,
    }),
  },
}));
