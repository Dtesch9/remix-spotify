import { type ActionFunctionArgs } from '@remix-run/node';
import { Form, Link } from '@remix-run/react';
import { redirectToSpotifyAuthentication } from '@/services';

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
