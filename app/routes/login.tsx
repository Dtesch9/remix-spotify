import { redirectToSpotifyAuthentication } from '@/services/spotify/auth/spotify.server';
import { type ActionFunctionArgs } from 'react-router';
import { Form, Link } from 'react-router';

export const action = async (_args: ActionFunctionArgs) => {
  return redirectToSpotifyAuthentication();
};

export default function Login() {
  return (
    <main className="flex flex-col items-center gap-4">
      <p>Login page</p>

      <Link to="/">Home</Link>

      <Form method="post">
        <button>Spotify login</button>
      </Form>
    </main>
  );
}
