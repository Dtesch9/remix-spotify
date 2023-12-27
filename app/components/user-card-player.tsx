import { useFetch } from '@/hooks';
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from '@ui/tooltip';
import { ClientOnly } from './client-only';

type UserCardPlayerProps = {
  userId: string;
};

export const UserCardPlayer = ({ userId }: UserCardPlayerProps) => {
  // @todo: make valibot schema for type-safe
  const { data, status } = useFetch<any>(`/api/user/${userId}/playing-state`);

  return (
    <div className="w-full flex gap-2 justify-between">
      <ClientOnly fallback={<PlayerFallback />} keepFallback={status === 'fetching'}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-full flex-1 flex gap-[inherit] justify-between cursor-default">
              <p className="text-left text-neutral-300 text-sm font-semibold">
                <span className="text-neutral-400 font-normal line-clamp-1">
                  {data?.playerState ? data?.playerState?.item?.name : 'Not active'}
                </span>
              </p>

              <img
                className="w-[0.9rem] h-[0.9rem]"
                src="https://open.spotifycdn.com/cdn/images/equaliser-green.f8937a92.svg"
                alt="Player"
              />
            </TooltipTrigger>

            <TooltipContent side="bottom" className="[&>span:first-of-type]:top-[1px!important]">
              <TooltipArrow />

              <p>{data?.playerState ? `Listening to: ${data?.playerState?.item?.name}` : 'Not active'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ClientOnly>
    </div>
  );
};
UserCardPlayer.displayName = 'UserCardPlayer';
/******************************************************************************/

const PlayerFallback = () => {
  return (
    <div className="w-full flex-1 flex gap-[inherit] justify-between">
      <p className="text-neutral-300 text-sm font-semibold">
        <span className="text-neutral-400 font-normal line-clamp-1">loading...</span>
      </p>

      <img
        className="w-[0.9rem] h-[0.9rem]"
        src="https://open.spotifycdn.com/cdn/images/equaliser-green.f8937a92.svg"
        alt="Player"
      />
    </div>
  );
};
