import { cssBundleHref } from '@remix-run/css-bundle';
import { json } from '@remix-run/node';
import type { HeadersFunction, LinksFunction, LoaderFunctionArgs, SerializeFrom } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import tailwindCSS from './globals.css';
import { getUserBySpotifyId } from './models/users/get-user-by-spotify-id';
import { getUserSessionCredentials } from './services';
import { MainLayout } from './components/layouts/main-layout';

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return { 'cache-control': loaderHeaders.get('cache-control') ?? '' };
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const credentials = await getUserSessionCredentials(request);

  if (!credentials) return json(null, { status: 200 });

  const user = await getUserBySpotifyId(credentials.spotify_id);

  if (user) {
    return json(
      { user, pathname: url.pathname, query: url.searchParams.get('q') },
      {
        headers: {
          'Cache-Control': 'private, max-age=60, s-maxage=60',
        },
      },
    );
  }

  return json(null, { status: 200 });
};

export type RootLoaderData = SerializeFrom<typeof loader>;

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [
        { rel: 'stylesheet', href: cssBundleHref },
        { rel: 'stylesheet', href: tailwindCSS },
      ]
    : [{ rel: 'stylesheet', href: tailwindCSS }]),
];

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

        {/* Sets up automatic reload when you change code */}
        {/* and only does anything during development */}
        {/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
        <LiveReload />
      </body>
    </html>
  );
}
