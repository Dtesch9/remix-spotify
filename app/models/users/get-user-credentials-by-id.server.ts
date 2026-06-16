import { db } from '@drizzle';

export async function getUserCredentialsById(userId: string) {
  return db.query.usersCredentials.findFirst({
    where: { user_id: userId },
  });
}
