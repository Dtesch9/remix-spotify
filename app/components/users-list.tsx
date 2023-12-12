import type { User } from 'drizzle/schemas';
import { UserCard } from './user-card';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

type UsersListProps = {
  users: Array<User>;
} & ComponentPropsWithoutRef<'div'>;

export const UsersList = ({ users, className, ...props }: UsersListProps) => {
  return (
    <div
      data-list-big={users.length > 4}
      className={cn(
        'grid',
        'data-[list-big=true]:grid-auto-fit-[theme(spacing.48)]',
        'data-[list-big=false]:grid-auto-fill-[12.6rem]',
        'mt-[inherit]',
        'gap-[inherit]',
        className,
      )}
      {...props}
    >
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};
