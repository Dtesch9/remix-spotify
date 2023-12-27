import type { SpotifyCredentials } from '@/services/spotify/auth';
import type { SpotifyUserShape } from '@/services/spotify/user';
import { spotifyUserToSchema } from '@/utils/spotify-user-to-schema';
import { db } from 'drizzle';
import { users, usersCredentials } from 'drizzle/schemas';

type SaveUserAndCredentialsArgs = {
  user: SpotifyUserShape;
  credentials: SpotifyCredentials;
};

export async function saveUserAndCredentials({ user, credentials }: SaveUserAndCredentialsArgs) {
  const maybeResponse = await db.transaction(async (tx) => {
    const schemaUser = spotifyUserToSchema(user);

    try {
      const [{ user_id, spotify_id }] = await tx
        .insert(users)
        .values(schemaUser)
        .onConflictDoUpdate({ target: users.spotify_id, set: { avatar_url: schemaUser.avatar_url } })
        .returning({ spotify_id: users.spotify_id, user_id: users.id });

      await tx
        .insert(usersCredentials)
        .values({
          ...credentials,
          user_id,
        })
        .onConflictDoUpdate({
          target: usersCredentials.user_id,
          set: credentials,
        });

      return { spotify_id, user_id };
    } catch (error) {
      console.error(error);
      tx.rollback();
    }
  });

  return { user_id: maybeResponse?.user_id, spotify_id: maybeResponse?.spotify_id };
}
