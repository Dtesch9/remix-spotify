import type { HeadersFunction, LoaderFunctionArgs } from 'react-router';
import { Links, data, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import { getUserBySpotifyId } from './models/users/get-user-by-spotify-id.server';
import { getUserSessionCredentials } from './services';
import { MainLayout } from './components/layouts/main-layout';
import type { Route } from './+types/root';

import './globals.css';

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return { 'cache-control': loaderHeaders.get('cache-control') ?? '' };
};

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const credentials = await getUserSessionCredentials(request);

  if (!credentials) return data(null, { status: 200 });

  const user = await getUserBySpotifyId(credentials.spotify_id);

  if (user) {
    return data(
      { user, pathname: url.pathname, query: url.searchParams.get('q') },
      {
        headers: {
          'Cache-Control': 'private, max-age=60, s-maxage=60',
        },
      },
    );
  }

  return data(null, { status: 200 });
};

export type RootLoaderData = typeof loader;

export default function App() {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* All meta exports on all routes will go here */}
        <Meta />

        {/* All link exports on all routes will go here */}
        <Links />
      </head>

      <body className="bg-black text-white min-h-screen">
        <MainLayout>
          <Outlet />
        </MainLayout>

        {/* Manages scroll position for client-side transitions */}
        {/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
        <ScrollRestoration />

        {/* Script tags go here */}
        {/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
        <Scripts />
      </body>
    </html>
  );
}
