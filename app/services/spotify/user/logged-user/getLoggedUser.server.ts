import { getUserSessionCredentials, logout } from '@/services';
import { throwTranslatedIssues } from '@/utils/validation/throw-translated-issues';
import { safeParse } from 'valibot';
import type { SpotifyCredentials } from '../../auth';
import { UserSchema } from './getLoggedUser.types';

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

  if (!user.success) throwTranslatedIssues('UserSchema', user.issues);

  return user.output;
}
