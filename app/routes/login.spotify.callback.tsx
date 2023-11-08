import { createUserSession } from '@/services';
import { REDIRECT_URI, SpotifyCredentialsSchema } from '@/services/spotify/auth';
import type { LoaderFunctionArgs } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { parse } from 'valibot';

invariant(process.env.SPOTIFY_CLIENT_ID, 'SPOTIFY_CLIENT_ID must be set');
invariant(process.env.SPOTIFY_SECRET, 'SPOTIFY_SECRET be set');

const SPOTIFY_API_URL = 'https://accounts.spotify.com/api/token';
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID; // Your client id
const CLIENT_SECRET = process.env.SPOTIFY_SECRET; // Your secret

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  // your application requests authorization
  const AuthOptions: RequestInit = {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code ?? '',
      redirect_uri: REDIRECT_URI,
    }),
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
    },
  };

  const res = await fetch(`${SPOTIFY_API_URL}`, AuthOptions);

  const credentials = parse(SpotifyCredentialsSchema, await res.json());

  return createUserSession({
    redirectTo: '/',
    remember: true,
    request,
    credentials,
  });
};
