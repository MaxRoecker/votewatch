import type { LinkDescriptor, LinksFunction } from '@remix-run/node';
import { cssBundleHref } from '@remix-run/css-bundle';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import styles from './tailwind.css';

export const links: LinksFunction = () => {
  const links: Array<LinkDescriptor> = [{ rel: 'stylesheet', href: styles }];
  if (cssBundleHref != null) {
    links.push({ rel: 'stylesheet', href: cssBundleHref });
  }
  return links;
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
