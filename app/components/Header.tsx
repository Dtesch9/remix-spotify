import { Form, Link } from '@remix-run/react';
import { parse } from 'valibot';
import { UserSchema } from '~/models/user/user.types';
import { useMatchesData } from '~/utils';

export const Header = () => {
  const sessionData = useMatchesData('root');
  const user = parse(UserSchema, sessionData);

  return (
    <header className="flex justify-between bg-zinc-600 p-4">
      <Link to="/">Remix | Spotify</Link>

      {user ? (
        <Form action="/logout" method="post">
          <button>Welcome {user.display_name}</button>
        </Form>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </header>
  );
};
