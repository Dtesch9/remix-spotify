import { Form, Link } from '@remix-run/react';
import { safeParse } from 'valibot';
import { SpotifyCredentialsSchema } from '~/services';
import { useMatchesData } from '~/utils';

export const Header = () => {
  const sessionData = useMatchesData('root');
  const credentials = safeParse(SpotifyCredentialsSchema, sessionData);

  return (
    <header className="flex justify-between bg-zinc-600 p-4">
      <Link to="/">Remix | Spotify</Link>

      {credentials.success ? (
        <Form action="/logout" method="post">
          <button>Welcome</button>
        </Form>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </header>
  );
};
