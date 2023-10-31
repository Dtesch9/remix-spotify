import { safeParse } from 'valibot';
import { getUserCredentials } from '~/services';
import { UserSchema } from './user.types';

const SPOTIFY_API = 'https://api.spotify.com/v1/me';

export async function getUser(request: Request) {
  const credentials = await getUserCredentials(request);

  if (!credentials) return null;

  const { token_type, access_token } = credentials;

  const res = await fetch(SPOTIFY_API, {
    headers: { Authorization: `${token_type} ${access_token}` },
  });

  if (!res.ok) return null;

  const user = safeParse(UserSchema, await res.json());

  if (!user.success) throw user.issues;

  return user.output;
}
