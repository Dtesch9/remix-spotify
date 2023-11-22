import { UsersList } from '@/components/users-list';
import type { MetaFunction } from '@remix-run/node';

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

export default function Home() {
  return (
    <section className="flex-col gap-4 mt-4 mx-6">
      <h2 className="text-white text-xl font-bold">Friends</h2>

      <UsersList users={[]} />
    </section>
  );
}
