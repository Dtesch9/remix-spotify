import { createCookieSessionStorage, redirect } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { safeParse } from 'valibot';
import type { SessionCredentials } from './spotify/auth/spotify.utils';
import { SessionCredentialsSchema } from './spotify/auth/spotify.utils';

export const USER_SESSION_KEY = 'credentials:meta';

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

export async function getUserSessionCredentials(request: Request): Promise<SessionCredentials | null> {
  const session = await getSession(request);
  const credentials = session.get(USER_SESSION_KEY);

  const parsedCredentials = safeParse(SessionCredentialsSchema, credentials);

  if (!parsedCredentials.success) return null;

  return parsedCredentials.output;
}

export async function requiredUserSession(request: Request) {
  const session = await getSession(request);
  const credentials = session.get(USER_SESSION_KEY);

  if (!credentials) {
    // if there is no user session, redirect to login
    throw redirect('/login');
  }
}
/******************************************************************************/

type CreateSessionArgs = {
  request: Request;
  credentials: SessionCredentials;
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

export async function destroySession(request: Request) {
  const session = await getSession(request);
  return sessionStorage.destroySession(session);
}

export async function logout(request: Request) {
  return redirect('/', {
    headers: {
      'Set-Cookie': await destroySession(request),
      'Cache-Control': 'no-store, max-age=0, s-maxage=0',
    },
  });
}
