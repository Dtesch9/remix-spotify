import { type MetaFunction } from '@remix-run/node';

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
    <main>
      <p>home</p>
    </main>
  );
}
