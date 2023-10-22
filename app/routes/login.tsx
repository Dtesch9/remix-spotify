import { type ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { getSpotifyCredentials } from "~/utils";
import { createUserSession } from "~/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  await getSpotifyCredentials();

  return createUserSession({
    redirectTo: "/",
    remember: false,
    request,
    userId: "douglas-id",
  });
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
