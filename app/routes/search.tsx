import { UsersList } from '@/components/users-list';
import { searchUsersByName } from '@/models/users/search-users-by-name.server';
import { getUserSessionCredentials, requiredUserSession } from '@/services';
import { json, redirect } from '@remix-run/node';
import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction, SerializeFrom } from '@remix-run/node';
import { isRouteErrorResponse, useActionData, useLoaderData, useRouteError } from '@remix-run/react';
import { db } from 'drizzle';
import { usersToFriends } from 'drizzle/schemas';
import { useEffect } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Remix | Spotify' },
    {
      property: 'og:title',
      content: 'Remix | Spotify',
    },
    {
      name: 'description',
      content: 'This app is the best',
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  await requiredUserSession(request);

  const url = new URL(request.url);

  const query = url.searchParams.get('q');
  const usersAndCredentials = await searchUsersByName(query ?? '');
  const users = usersAndCredentials.map(({ users }) => users);

  if (query && users.length === 0) {
    throw json({ query }, { status: 404 });
  }

  return json({ users });
}

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  const { userId } = Object.fromEntries(data);

  const loggedUser = await getUserSessionCredentials(request);

  if (!loggedUser) return redirect('/login');

  const friendId = String(userId);

  await db.insert(usersToFriends).values({ user_id: loggedUser.user_id, friend_id: friendId }).onConflictDoNothing();

  return json({ ok: true });
}

export type SearchPageLoaderData = SerializeFrom<typeof loader>;

export default function Search() {
  // @todo: Display recent connected users
  const { users } = useLoaderData<typeof loader>();

  const data = useActionData<typeof action>();

  useEffect(() => {
    if (data?.ok) {
      alert('Friend added');
    }
  }, [data]);

  return (
    <section className="flex-col gap-4 mt-4 mx-6">
      <h2 className="text-white text-xl font-bold">Search</h2>

      <UsersList users={users} />
    </section>
  );
}
/******************************************************************************/

export function ErrorBoundary() {
  const error = useRouteError();

  // @todo: If not, we are going to show a message, and a button to invite user

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        return (
          <div>
            User <strong>{error.data.query}</strong> not found!
          </div>
        );
    }

    return (
      <div>
        Something went wrong: {error.status} {error.statusText}
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
