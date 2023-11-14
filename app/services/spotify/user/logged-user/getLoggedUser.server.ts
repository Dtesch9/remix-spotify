import { safeParse } from 'valibot';
import { getUserSessionCredentials, logout } from '@/services';
import { UserSchema } from './getLoggedUser.types';
import type { SpotifyCredentials } from '../../auth';

const SPOTIFY_API = 'https://api.spotify.com/v1/me';

export async function getLoggedUser(request: Request) {
  const credentials = await getUserSessionCredentials(request);

  if (!credentials) return null;

  const { token_type, access_token } = credentials;

  const res = await fetch(SPOTIFY_API, {
    headers: { Authorization: `${token_type} ${access_token}` },
  });

  if (!res.ok) throw await logout(request);

  const user = safeParse(UserSchema, await res.json());

  if (!user.success) throw user.issues;

  return user.output;
}

export async function getUserByCredentials(credentials: SpotifyCredentials) {
  const { token_type, access_token } = credentials;

  const res = await fetch(SPOTIFY_API, {
    headers: { Authorization: `${token_type} ${access_token}` },
  });

  const user = safeParse(UserSchema, await res.json());

  if (!user.success) throw user.issues;

  return user.output;
}
