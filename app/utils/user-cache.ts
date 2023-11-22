import type { MaybeSpotifyUser } from '@/services/spotify/user';

type CacheMeta = {
  user: MaybeSpotifyUser;
  hitAt: number;
  /** `In minutes` */
  revalidateTime: number;
};

const cache = new Map<'user', CacheMeta>();

const _shouldRevalidate = (cache?: CacheMeta) => !cache?.user || hasExpire(timeToRevalidate(cache));

export function getUserCache() {
  function get() {
    return cache.get('user')?.user || null;
  }

  function set({ user, revalidateTime }: Omit<CacheMeta, 'hitAt'>) {
    cache.set('user', { user, hitAt: Date.now(), revalidateTime });
  }

  function clear() {
    cache.delete('user');
  }

  function shouldRevalidate() {
    return _shouldRevalidate(cache.get('user'));
  }

  return { get, set, clear, shouldRevalidate };
}
/******************************************************************************/

function timeToRevalidate({ hitAt, revalidateTime }: Omit<CacheMeta, 'user'>) {
  return addTo(hitAt, { minutesMs: minutesToMs(revalidateTime) });
}

function minutesToMs(timeInMinutes: number) {
  return timeInMinutes * 60 * 1000;
}

function addTo(valToIncrement: number, { minutesMs }: { minutesMs: number }) {
  return valToIncrement + minutesMs;
}

/** When timeToCompare has passed current time, this means we want it to be expired */
function hasExpire(timeToCompare: number) {
  return Date.now() > timeToCompare;
}
