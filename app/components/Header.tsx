import { Form, Link } from "@remix-run/react";
import { useMatchesData } from "~/utils";

export const Header = () => {
  const userId = useMatchesData("root");

  return (
    <header className="flex justify-between bg-zinc-600 p-4">
      <Link to="/">Remix | Spotify</Link>

      {userId ? (
        <Form method="delete">
          <button>Welcome: {userId}</button>
        </Form>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </header>
  );
};
