import { MainLayout } from '@/components/layouts/main-layout';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';

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
  // if it does, we are going to user the match user's id to search on spotify api
  const query = url.searchParams.get('q');
  console.log(query);

  // If query does not match, we are going to return an error
  // So we can render a feedback of user not-found

  return url.pathname;
}

export default function Search() {
  return (
    <MainLayout>
      <section className="flex-col gap-4 mt-4 mx-6">
        <h2 className="text-white text-xl font-bold">Search</h2>
      </section>
    </MainLayout>
  );
}
