import type { Input } from 'valibot';
import { number, object, string, literal } from 'valibot';

export const SpotifyCredentialsSchema = object({
  access_token: string(),
  token_type: literal('Bearer'),
  expires_in: number(),
  refresh_token: string(),
  scope: literal('user-read-email user-read-private'),
});

export type SpotifyCredentials = Input<typeof SpotifyCredentialsSchema>;
