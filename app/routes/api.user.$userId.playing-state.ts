import { getUserCredentialsById } from '@/models/users/get-user-credentials-by-id.server';
import { data, type LoaderFunctionArgs } from 'react-router';
import { object, parse, string } from 'valibot';
import { refreshToken } from '@/services/spotify/auth';
import { getPlayerState } from '@/services/spotify/user/get-player-state';
import { saveCredentials } from '@/models/users/save-credentials.server';

const paramsSchema = object({ userId: string() });

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { userId } = parse(paramsSchema, params);

  const credentials = await getUserCredentialsById(userId);

  if (!credentials)
    return data({ notFound: true, userId }, { status: 404, statusText: `User with id: ${userId} not found` });

  // @todo: This flow should be placed somewhere else, refresh an save
  const freshCredentials = await refreshToken(credentials.refresh_token);

  try {
    await saveCredentials({ credentials: freshCredentials, userId });
  } catch {
    return new Response('Internal server error', { status: 500, statusText: 'Internal server Error' });
  }

  const playerState = await getPlayerState(freshCredentials.access_token);

  if (playerState.status !== 200 && playerState.ok) {
    return data({ playerState: null });
  }

  if (!playerState.ok) {
    return new Response(playerState.statusText, { status: playerState.status, statusText: playerState.statusText });
  }

  return data({ playerState: await playerState.json() });
};
