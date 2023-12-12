import type { SpotifyCredentials } from '@/services/spotify/auth';
import { db } from 'drizzle';
import { usersCredentials } from 'drizzle/schemas';

type SaveCredentialsArgs = {
  userId: string;
  credentials: SpotifyCredentials;
};

export async function saveCredentials({ userId, credentials }: SaveCredentialsArgs) {
  try {
    const [{ accessToken, refreshToken }] = await db
      .insert(usersCredentials)
      .values({
        ...credentials,
        user_id: userId,
      })
      .onConflictDoUpdate({
        target: usersCredentials.user_id,
        set: credentials,
      })
      .returning({ accessToken: usersCredentials.access_token, refreshToken: usersCredentials.refresh_token });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Could not save Credentials', { error });
    throw error;
  }
}
