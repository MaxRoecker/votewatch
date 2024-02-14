import type {
  LinkDescriptor,
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { cssBundleHref } from '@remix-run/css-bundle';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from '@remix-run/react';
import { Button } from '~/commons/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/commons/components/dropdown-menu';
import { List } from '~/commons/components/icons';
import { Separator } from '~/commons/components/separator';
import { getIntl, loadLocale } from '~/commons/utils/intl';
import styles from './tailwind.css';

export const loader = ({ params }: LoaderFunctionArgs) => {
  const locale = loadLocale(params);
  return json({ locale });
};

export type Loader = typeof loader;

export const links: LinksFunction = () => {
  const links: Array<LinkDescriptor> = [
    { rel: 'stylesheet', href: styles },
    { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  ];
  if (cssBundleHref != null) {
    links.push({ rel: 'stylesheet', href: cssBundleHref });
  }
  return links;
};

export const meta: MetaFunction<Loader> = ({ data }) => {
  const intl = getIntl(data?.locale ?? 'en-US');
  return [
    { title: intl.formatMessage({ id: 'appName' }) },
    {
      name: 'description',
      content: intl.formatMessage({ id: 'appDescription' }),
    },
  ];
};

export default function App() {
  const { locale } = useLoaderData<Loader>();
  const intl = getIntl(locale);

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="mx-auto my-0 flex max-w-screen-lg flex-col gap-4 p-4 md:gap-8 md:p-6">
          <header className="flex items-center justify-between">
            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
              <Link to="/">VoteWatch</Link>
            </h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="md:hidden" icon>
                  <List />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/legislators">
                    {intl.formatMessage({
                      id: 'Legislators',
                      defaultMessage: 'Legislators',
                    })}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/bills">
                    {intl.formatMessage({
                      id: 'Bills',
                      defaultMessage: 'Bills',
                    })}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <nav className="hidden flex-row items-center justify-stretch md:flex">
              <Button variant="link" data-testid="nav-properties" asChild>
                <Link to="/legislators">
                  {intl.formatMessage({
                    id: 'Legislators',
                    defaultMessage: 'Legislators',
                  })}
                </Link>
              </Button>
              <Separator orientation="vertical" />
              <Button variant="link" data-testid="nav-bookings" asChild>
                <Link to="/bills">
                  {intl.formatMessage({ id: 'Bills', defaultMessage: 'Bills' })}
                </Link>
              </Button>
            </nav>
          </header>
          <main>
            <Outlet context={{ locale }} />
          </main>
          <Separator orientation="horizontal" />
          <footer className="flex items-center justify-center">
            {intl.formatMessage({ id: 'appName' })} /{' '}
            {intl.formatDate(Date.now(), { year: 'numeric' })}
          </footer>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
