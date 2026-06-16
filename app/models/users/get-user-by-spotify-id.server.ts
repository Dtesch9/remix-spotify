import { db } from '@drizzle';

export async function getUserBySpotifyId(spotify_id: string) {
  const user = await db.query.users.findFirst({ where: { spotify_id } });

  return user;
}
