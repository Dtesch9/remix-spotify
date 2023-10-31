import type { Output } from 'valibot';
import { array, boolean, nullable, number, object, string } from 'valibot';

export const UserSchema = object({
  display_name: string(),
  href: string(),
  id: string(),
  type: string(),
  uri: string(),
  followers: object({ href: nullable(string()), total: number() }),
  country: string(),
  product: string(),
  explicit_content: object({ filter_enabled: boolean(), filter_locked: boolean() }),
  email: string(),
  images: array(
    object({
      url: string(),
      height: number(),
      width: number(),
    }),
  ),
  external_urls: object({
    spotify: string(),
  }),
});

export type UserShape = Output<typeof UserSchema>;
