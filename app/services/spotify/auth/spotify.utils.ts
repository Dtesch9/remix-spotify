import type { Input } from 'valibot';
import { literal, merge, number, object, optional, string } from 'valibot';

export const SpotifyCredentialsSchema = object({
  access_token: string(),
  token_type: literal('Bearer'),
  expires_in: number(),
  refresh_token: string(),
  scope: string(),
});

export const SpotifyCredentialsRefreshSchema = object({
  access_token: string(),
  token_type: literal('Bearer'),
  expires_in: number(),
  refresh_token: optional(string()),
  scope: string(),
});

export const SessionCredentialsSchema = merge([
  SpotifyCredentialsSchema,
  object({
    spotify_id: string(),
  }),
]);

export type SpotifyCredentials = Input<typeof SpotifyCredentialsSchema>;
export type SessionCredentials = Input<typeof SessionCredentialsSchema>;
