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

export const Header = () => {
  const submit = useSubmit();
  const sessionData = useMatchesData('root');

  const user = parse(MaybeUserSchema, sessionData);

  function logout(event: MouseEvent<HTMLButtonElement>) {
    submit(event.currentTarget.form, { action: '/logout', method: 'post' });
  }

  return (
    <header className="flex items-center justify-between bg-neutral-900 p-4 rounded-lg min-h-[72px]">
      <Link to="/">Remix | Spotify</Link>

      <Link to="/login">login</Link>

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

          <DropdownMenuContent align="end" className="rounded-md bg-white p-2 text-violet-400">
            <DropdownMenuArrow />

            <DropdownMenuLabel className="text-violet-900">{user.display_name}</DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1 h-[1px] bg-violet-300" />

            <DropdownMenuItem asChild>
              <button
                onClick={logout}
                className="w-full px-1 text-left hover:border-none hover:text-violet-600 focus-visible:text-violet-600 focus-visible:outline-violet-600 hover:focus-visible:outline-none"
              >
                Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </header>
  );
};
