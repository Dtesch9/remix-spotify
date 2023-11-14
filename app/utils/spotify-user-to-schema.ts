import type { UserShape } from '@/services/spotify/user';
import type { UserInput } from 'drizzle/schemas';

export function spotifyUserToSchema(user: UserShape): UserInput {
  const { id, images, followers, external_urls, ...dataThatMatchSchema } = user;

  return {
    ...dataThatMatchSchema,
    spotify_id: id,
    avatar_url: images?.[0]?.url,
    external_url: external_urls.spotify,
    followers: followers.total,
  };
}
