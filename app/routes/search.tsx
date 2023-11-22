import { UsersList } from '@/components/users-list';
import { searchUsersByName } from '@/models/users/search-users-by-name';
import { requiredUserSession } from '@/services';
import { json, type LoaderFunctionArgs, type MetaFunction, type SerializeFrom } from '@remix-run/node';
import { isRouteErrorResponse, useLoaderData, useRouteError } from '@remix-run/react';

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
  const users = await searchUsersByName(query ?? '');

  if (query && users.length === 0) {
    throw json({ query }, { status: 404 });
  }

  return json({ users });
}

export type SearchPageLoaderData = SerializeFrom<typeof loader>;

export default function Search() {
  // @todo: Display recent connected users
  const { users } = useLoaderData<typeof loader>();

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
        return <div>User {error.data.query} not found!</div>;
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
