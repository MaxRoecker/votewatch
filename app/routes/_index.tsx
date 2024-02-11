import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <div className="mx-auto my-0 flex max-w-screen-xl flex-col gap-4 p-4 md:p-6">
      <header className="flex items-center justify-between">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
          <Link to="/">VoteWatch</Link>
        </h1>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="md:hidden" icon>
              <HamburgerMenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="..">
                <FormattedMessage id="Properties" defaultMessage="Properties" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="bookings">
                <FormattedMessage id="Bookings" defaultMessage="Bookings" />
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <nav className="hidden flex-row items-center justify-stretch md:flex">
          <Button variant="link" data-testid="nav-properties" asChild>
            <Link to="..">
              <FormattedMessage id="Properties" defaultMessage="Properties" />
            </Link>
          </Button>
          <Separator orientation="vertical" />
          <Button variant="link" data-testid="nav-bookings" asChild>
            <Link to="bookings">
              <FormattedMessage id="Bookings" defaultMessage="Bookings" />
            </Link>
          </Button>
        </nav> */}
      </header>
    </div>
  );
}
