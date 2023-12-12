import { db } from 'drizzle';
import { eq } from 'drizzle-orm';
import { users } from 'drizzle/schemas';

export async function getUserBySpotifyId(spotify_id: string) {
  const user = await db.query.users.findFirst({ where: eq(users.spotify_id, spotify_id) });

  return user;
}
