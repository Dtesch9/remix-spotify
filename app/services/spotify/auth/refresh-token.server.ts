import type { SpotifyCredentials } from '@/services/spotify/auth';
import { SpotifyCredentialsRefreshSchema, SpotifyCredentialsSchema } from '@/services/spotify/auth';
import { throwTranslatedIssues } from '@/utils/validation/throw-translated-issues';
import invariant from 'tiny-invariant';
import { parse, safeParse } from 'valibot';

invariant(process.env.SPOTIFY_CLIENT_ID, 'SPOTIFY_CLIENT_ID must be set');
invariant(process.env.SPOTIFY_SECRET, 'SPOTIFY_SECRET be set');

const SPOTIFY_API_URL = 'https://accounts.spotify.com/api/token';
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID; // Your client id
const CLIENT_SECRET = process.env.SPOTIFY_SECRET; // Your secret

export async function refreshToken(refreshToken: string): Promise<SpotifyCredentials> {
  const AuthOptions: RequestInit = {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
      'content-type': 'application/x-www-form-urlencoded',
    },
  };
  const res = await fetch(SPOTIFY_API_URL, AuthOptions);

  if (!res.ok) throw new Response('Could not refresh token', { status: res.status, statusText: res.statusText });

  const data = await res.json();
  const credentials = safeParse(SpotifyCredentialsRefreshSchema, data);

  if (!credentials.success) throwTranslatedIssues('SpotifyCredentialsRefreshSchema', credentials.issues);

  const credentialsOutput = credentials.output;

  if (!credentialsOutput.refresh_token) return { ...credentialsOutput, refresh_token: refreshToken };

  return parse(SpotifyCredentialsSchema, credentialsOutput);
}
