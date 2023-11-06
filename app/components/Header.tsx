import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MaybeUserSchema } from '@/models/user/user.types';
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
import { Link, useSubmit } from '@remix-run/react';
import type { MouseEvent } from 'react';
import { parse } from 'valibot';
import { cn } from '@/lib/utils';

export const Header = () => {
  const submit = useSubmit();
  const sessionData = useMatchesData('root');

  const user = parse(MaybeUserSchema, sessionData);

  function logout(event: MouseEvent<HTMLButtonElement>) {
    submit(event.currentTarget.form, { action: '/logout', method: 'post' });
  }

  return (
    <header className="flex justify-between items-center bg-neutral-900 py-4 px-6 rounded-lg min-h-[72px]">
      <Link to="/">Remix | Spotify</Link>

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
