import type { InferInput } from 'valibot';
import { intersect, literal, number, object, optional, string } from 'valibot';

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

export const SessionCredentialsSchema = intersect([
  SpotifyCredentialsSchema,
  object({
    spotify_id: string(),
    user_id: string(),
  }),
]);

export type SpotifyCredentials = InferInput<typeof SpotifyCredentialsSchema>;
export type SessionCredentials = InferInput<typeof SessionCredentialsSchema>;
