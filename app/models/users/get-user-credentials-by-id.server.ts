import { db } from 'drizzle';
import { eq } from 'drizzle-orm';
import { usersCredentials } from 'drizzle/schemas';

export async function getUserCredentialsById(userId: string) {
  return db.query.usersCredentials.findFirst({
    where: eq(usersCredentials.user_id, userId),
  });
}
