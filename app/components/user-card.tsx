import type { User } from 'drizzle/schemas';
import { UserCardPlayer } from './user-card-player';
// import { ClientOnly } from 'remix-utils/client-only'

type UserCardProps = {
  user: User;
};

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <article className="gap-[inherit] w-full max-w-[260px] min-h-64 p-4 bg-neutral-900 rounded-lg flex-col justify-start items-start inline-flex">
      <img className="w-full max-h-36 relative rounded-md object-cover" src={user.avatar_url} alt={user.display_name} />

      <div className="w-full gap-2 flex-col justify-start items-start flex">
        <h2 className="text-white text-base font-bold">{user.display_name}</h2>

        <UserCardPlayer userId={user.id} />
      </div>
    </article>
  );
};
UserCard.displayName = 'UserCard';
