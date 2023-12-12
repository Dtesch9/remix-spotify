const SPOTIFY_API_URL = 'https://api.spotify.com/v1/me/player?market=BR';

export async function getPlayerState(accessToken: string) {
  return fetch(SPOTIFY_API_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
