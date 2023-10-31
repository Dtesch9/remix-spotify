import { type ActionFunctionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { redirectToSpotifyAuthentication } from '~/services';

export const action = async ({ request }: ActionFunctionArgs) => {
  return redirectToSpotifyAuthentication();
};

export default function Login() {
  return (
    <main className="flex flex-col items-center">
      <p>Login page</p>

      <Form method="post">
        <button>Spotify login</button>
      </Form>
    </main>
  );
}
