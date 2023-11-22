import { db } from 'drizzle';
import { ilike } from 'drizzle-orm';
import { users } from 'drizzle/schemas';

export async function searchUsersByName(query: string) {
  return db
    .select()
    .from(users)
    .where(ilike(users.display_name, `%${query}%`));
}
