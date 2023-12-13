import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { RootLoaderData } from '@/root';
import { Form, Link, useLocation, useRouteLoaderData, useSubmit } from '@remix-run/react';
import {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { InputGroup, InputSearch, LeftElement } from '@ui/input-search';
import { selectUserSchema } from 'drizzle/schemas';
import { Search } from 'lucide-react';
import type { MouseEvent } from 'react';
import { safeParse } from 'valibot';

export const Header = () => {
  const submit = useSubmit();

  const { pathname } = useLocation();
  const rootData = useRouteLoaderData<RootLoaderData>('root');

  function logout(event: MouseEvent<HTMLButtonElement>) {
    submit(event.currentTarget.form, { action: '/logout', method: 'post' });
  }

  const parsedSession = safeParse(selectUserSchema, rootData?.user);

  const needSearchBar = pathname === '/search';
  const user = parsedSession.success ? parsedSession.output : null;

  return (
    <header className="flex justify-between items-center bg-neutral-900 py-4 px-6 rounded-lg min-h-[72px]">
      <Form action="/search">
        <InputGroup className={cn(needSearchBar ? 'visible' : 'invisible select-none')}>
          {needSearchBar && (
            <>
              <LeftElement>
                <Search />
              </LeftElement>

              <InputSearch
                className={cn('max-w-xs rounded-full')}
                placeholder="Search"
                name="q"
                defaultValue={rootData?.query ?? void 0}
              />
            </>
          )}
        </InputGroup>
      </Form>

      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full">
            <Avatar className="select-none">
              <AvatarImage src={user.avatar_url} alt={user.display_name} />

              <AvatarFallback asChild>
                <img src={user.avatar_url} alt={user.display_name} />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className={cn([
              'rounded-md',
              'bg-white',
              'p-2',
              'text-violet-400',
              '[&>:where(a,button)]:text-violet-400',
              '[&>:where(a,button)]:w-full',
              '[&>:where(a,button)]:px-1',
              '[&>:where(a,button)]:text-left',
              '[&>:where(a,button)]:hover:border-none',
              '[&>:where(a,button)]:hover:text-violet-600',
              '[&>:where(a,button):focus]:text-violet-600',
              '[&>:where(a,button):focus-visible]:text-violet-600',
              '[&>:where(a,button):focus-visible]:outline-violet-600',
              '[&>:where(a,button):hover:focus-visible]:outline-none',
            ])}
          >
            <DropdownMenuArrow />

            <DropdownMenuLabel className="text-violet-900">{user.display_name}</DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1 h-[1px] bg-violet-300" />

            <DropdownMenuItem asChild>
              <Link to="/friends">Friends</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <button onClick={logout}>Logout</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </header>
  );
};
