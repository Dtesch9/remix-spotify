import { db } from 'drizzle';
import { eq, ilike } from 'drizzle-orm';
import { users, usersCredentials } from 'drizzle/schemas';

export async function searchUsersByName(query: string) {
  return db
    .select()
    .from(users)
    .innerJoin(usersCredentials, eq(users.id, usersCredentials.user_id))
    .where(ilike(users.display_name, `%${query}%`));
}
