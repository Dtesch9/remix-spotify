import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MaybeUserSchema } from '@/services/spotify/user/';
import { useMatchesData } from '@/utils';
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@ui/dropdown-menu';
import { Form, Link, useSubmit } from '@remix-run/react';
import type { MouseEvent } from 'react';
import { parse } from 'valibot';
import { cn } from '@/lib/utils';
import { InputSearch, InputGroup, SearchIcon } from '@ui/input-search';

export const Header = () => {
  const submit = useSubmit();

  const sessionData = useMatchesData('root');
  const pathname = useMatchesData('routes/search');

  const user = parse(MaybeUserSchema, sessionData);

  function logout(event: MouseEvent<HTMLButtonElement>) {
    submit(event.currentTarget.form, { action: '/logout', method: 'post' });
  }

  const needSearchBar = pathname === '/search';

  return (
    <header className="flex justify-between items-center bg-neutral-900 py-4 px-6 rounded-lg min-h-[72px]">
      <Form>
        <InputGroup className={cn(needSearchBar ? 'visible' : 'invisible select-none')}>
          <SearchIcon />

          <InputSearch className={cn('max-w-xs rounded-full')} placeholder="Search" name="q" />
        </InputGroup>
      </Form>

      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full">
            <Avatar className="select-none">
              <AvatarImage src={user.images[0].url} alt={user.display_name} />

              <AvatarFallback asChild>
                <img src={user.images[0].url} alt={user.display_name} />
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
