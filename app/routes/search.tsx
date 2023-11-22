import { MainLayout } from '@/components/layouts/main-layout';
import { UsersList } from '@/components/users-list';
import { searchUsersByName } from '@/models/users/search-users-by-name';
import type { LoaderFunctionArgs, MetaFunction, SerializeFrom } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

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
  const url = new URL(request.url);

  // @todo: Here we are going to look at our backend to see if any query match
  // if it does, we are going to use the match user's id to search on our backend
  // and verify if this user is already connected
  const query = url.searchParams.get('q');

  const users = await searchUsersByName(query ?? '');

  // If not, we are going to show a message, and a button to invite user

  return { pathname: url.pathname, query, users };
}

export type SearchPageLoaderData = SerializeFrom<typeof loader>;

export default function Search() {
  // @todo: Display recent connected users
  const { users } = useLoaderData<typeof loader>();

  return (
    <MainLayout>
      <section className="flex-col gap-4 mt-4 mx-6">
        <h2 className="text-white text-xl font-bold">Search</h2>

        <UsersList users={users} />
      </section>
    </MainLayout>
  );
}
