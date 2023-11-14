import { cn } from '@/lib/utils';
import { NavLink } from '@remix-run/react';
import type { LucideIcon } from 'lucide-react';
import { Home, Search, Users } from 'lucide-react';

type LinkShape = { label: string; to: string; Icon: LucideIcon };

const NavLinks: Array<LinkShape> = [
  {
    label: 'Home',
    to: '/',
    Icon: Home,
  },
  {
    label: 'Search',
    to: '/search',
    Icon: Search,
  },
  {
    label: 'Friends',
    to: '/friends',
    Icon: Users,
  },
];

export const SidebarNav = () => {
  return (
    <nav className="gap-4 px-4 pt-8 self-stretch h-40 bg-neutral-900 rounded-lg flex-col justify-start items-start flex text-zinc-400 text-base font-bold">
      {NavLinks.map(({ label, to, Icon }) => (
        <NavLink
          key={label}
          className={({ isActive, isPending }) =>
            cn(
              'flex gap-2 hover:text-white transition-all w-full',
              isActive ? 'text-white' : isPending ? 'text-white' : '',
            )
          }
          to={to}
        >
          <Icon /> {label}
        </NavLink>
      ))}
    </nav>
  );
};
