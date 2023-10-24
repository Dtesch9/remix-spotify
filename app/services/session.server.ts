import { createCookieSessionStorage, redirect } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { SpotifyCredentialsSchema, type SpotifyCredentials } from './spotify';
import { safeParse } from 'valibot';

export const USER_SESSION_KEY = 'cred:meta';
const SPOTIFY_API = 'https://api.spotify.com/v1/me';

invariant(process.env.SESSION_SECRET, 'SESSION_SECRET must be set');

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

export async function getSession(request: Request) {
  const cookie = request.headers.get('Cookie');
  return sessionStorage.getSession(cookie);
}

export async function getUserCredentials(request: Request): Promise<SpotifyCredentials | null> {
  const session = await getSession(request);
  const credentials = session.get(USER_SESSION_KEY);

  const parsedCredentials = safeParse(SpotifyCredentialsSchema, credentials);

  if (!parsedCredentials.success) return null;

  return parsedCredentials.output;
}
/******************************************************************************/
export async function getUser(request: Request) {
  const credentials = await getUserCredentials(request);

  if (!credentials) return logout(request);

  const { token_type, access_token } = credentials;

  const res = await fetch(SPOTIFY_API, {
    headers: { Authorization: `${token_type} ${access_token}` },
  });

  const user = await res.json();
  console.log(user);
}
/******************************************************************************/

type CreateSessionArgs = {
  request: Request;
  credentials: SpotifyCredentials;
  remember: boolean;
  redirectTo: string;
};

export async function createUserSession(args: CreateSessionArgs) {
  const { request, credentials, remember, redirectTo } = args;

  const session = await getSession(request);
  session.set(USER_SESSION_KEY, credentials);

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  });
}

export async function logout(request: Request) {
  const session = await getSession(request);

  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
}
