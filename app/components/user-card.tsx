import type { User } from 'drizzle/schemas';

type UserCardProps = {
  user: User;
};

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <article className="gap-[inherit] w-full max-w-[260px] min-h-64 p-4 bg-neutral-900 rounded-lg flex-col justify-start items-start inline-flex">
      <img className="w-full max-h-36 relative rounded-md object-cover" src={user.avatar_url} alt={user.display_name} />

      <div className="gap-2 flex-col justify-start items-start flex">
        <h2 className="text-white text-base font-bold">{user.display_name}</h2>

        <div className="flex gap-2">
          <p className="text-neutral-300 text-sm font-semibold ">
            Playing: <span className="text-neutral-400 font-normal">MC Naldo </span>
          </p>
          <img
            className="w-[0.9rem] h-[0.9rem]"
            src="https://open.spotifycdn.com/cdn/images/equaliser-green.f8937a92.svg"
            alt="Player"
          />
        </div>
      </div>
    </article>
  );
};
UserCard.displayName = 'UserCard';
