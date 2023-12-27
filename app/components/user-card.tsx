import { useSubmit } from '@remix-run/react';
import type { User } from 'drizzle/schemas';
import { PlusCircleIcon } from 'lucide-react';
import { UserCardPlayer } from './user-card-player';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@ui/tooltip';
import { TooltipArrow } from '@radix-ui/react-tooltip';
// import { ClientOnly } from 'remix-utils/client-only'

type UserCardProps = {
  user: User;
};

export const UserCard = ({ user }: UserCardProps) => {
  const submit = useSubmit();

  return (
    <article className="group relative gap-[inherit] w-full max-w-[260px] min-h-64 p-4 bg-neutral-900 rounded-lg flex-col justify-start items-start inline-flex">
      <img className="w-full max-h-36 relative rounded-md object-cover" src={user.avatar_url} alt={user.display_name} />

      <div className="w-full gap-2 flex-col justify-start items-start flex">
        <h2 className="text-white text-base font-bold">{user.display_name}</h2>

        <UserCardPlayer userId={user.id} />
      </div>

      <>
        <span className="absolute inset-x-0 top-3 bottom-20 inline-flex justify-center bg-black/60 blur-sm [transition:_all_200ms] invisible group-hover:visible" />

        <button
          type="submit"
          onClick={() => submit({ userId: user.id }, { method: 'post' })}
          className="absolute inset-x-0 top-3 bottom-20 grid place-items-center invisible group-hover:visible"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <PlusCircleIcon className="w-10 h-10 text-primary translate-y-5 opacity-0 group-hover:animate-enter-in" />
              </TooltipTrigger>

              <TooltipContent side="top" className="[&>span:first-of-type]:bottom-[1px_!important]">
                <TooltipArrow />

                <span>
                  Add <strong>{user.display_name}</strong> as friend
                </span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </button>
      </>
    </article>
  );
};
UserCard.displayName = 'UserCard';
