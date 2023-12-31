import { redirect } from '@remix-run/node';
import crypto from 'crypto';
import invariant from 'tiny-invariant';

invariant(process.env.SPOTIFY_CLIENT_ID, 'SPOTIFY_CLIENT_ID must be set');
invariant(process.env.SPOTIFY_SECRET, 'SPOTIFY_SECRET be set');

export const REDIRECT_URI = 'http://localhost:3000/login/spotify/callback';
const SPOTIFY_API_URL = 'https://accounts.spotify.com/authorize';
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID; // Your client id

export async function redirectToSpotifyAuthentication() {
  return redirect(
    `${SPOTIFY_API_URL}?${new URLSearchParams({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: 'user-read-private user-read-email user-read-playback-state',
      redirect_uri: REDIRECT_URI,
      state: crypto.randomUUID(),
    })}`,
  );
}
