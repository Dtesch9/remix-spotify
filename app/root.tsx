import { cssBundleHref } from '@remix-run/css-bundle';
import type { LoaderFunctionArgs, LinksFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import tailwindCSS from './tailwind.css';
import { Header } from './components/Header';
import { USER_SESSION_KEY, sessionStorage } from './services/session.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookie = request.headers.get('Cookie');
  const session = await sessionStorage.getSession(cookie);

  const credentials = session.get(USER_SESSION_KEY);
  return credentials ?? null;
};

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
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* All meta exports on all routes will go here */}
        <Meta />

        {/* All link exports on all routes will go here */}
        <Links />
      </head>

      <body className="bg-gray-600  text-white">
        <div>
          <Header />

          <main className="px-4">
            {/* Child routes go here */}
            <Outlet />
          </main>
        </div>

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
