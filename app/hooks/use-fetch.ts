import { safeLog } from '@/utils/safeLog';
import { useEffect, useState } from 'react';

type FetchError = {
  status: 'error';
  error: any;
};

type FetchSuccess = {
  status: 'idle';
};

type FetchLoading = {
  status: 'fetching';
};

type FetchRevalidating = {
  status: 'revalidating';
};

type FetchData<T> = {
  data: T | null;
} & (FetchRevalidating | FetchLoading | FetchSuccess | FetchError);

/** Use relative path *`useFetch('/user')`* */
export function useFetch<T = unknown>(endpoint: string) {
  const [state, setState] = useState<FetchData<T>>({ data: (cache.get(endpoint) as T) ?? null, status: 'idle' });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        if (cache.get(endpoint)) {
          setState((prevState) => ({ ...prevState, status: 'revalidating' }));
        } else {
          setState({ data: null, status: 'fetching' });
        }

        const res = await fetch(resolveUrl(endpoint), { signal });

        if (!res.ok) {
          return setState({ data: null, status: 'error', error: { status: res.status, statusText: res.statusText } });
        }

        const data = await res.json();

        cache.set(endpoint, data);
        setState({ data, status: 'idle' });
      } catch (error: any) {
        if ('name' in error && error.name === 'AbortError') {
          safeLog('ABORTED:', signal.aborted);
          return;
        }

        setState({ data: null, status: 'error', error });
        safeLog(error);
      }
    })();

    return () => controller.abort();
  }, [endpoint]);

  return state;
}
/******************************************************************************/

const cache = new Map<string, unknown>();

/** Get's a partial url and resolve to absolute url
 *  `'/user'` -> 'http://localhost:3000/user/
 */
function resolveUrl(endpoint: string) {
  if (typeof window === 'undefined') return '';
  const absoluteEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  return `${location.protocol}//${location.host}${absoluteEndpoint}`;
}
