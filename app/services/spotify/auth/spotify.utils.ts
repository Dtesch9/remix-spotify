import type { Input } from 'valibot';
import { literal, merge, number, object, string } from 'valibot';

export const SpotifyCredentialsSchema = object({
  access_token: string(),
  token_type: literal('Bearer'),
  expires_in: number(),
  refresh_token: string(),
  scope: literal('user-read-email user-read-private'),
});

export const SessionCredentialsSchema = merge([
  SpotifyCredentialsSchema,
  object({
    spotify_id: string(),
  }),
]);

export type SpotifyCredentials = Input<typeof SpotifyCredentialsSchema>;
export type SessionCredentials = Input<typeof SessionCredentialsSchema>;
