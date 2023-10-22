import invariant from "tiny-invariant";

invariant(process.env.SPOTIFY_CLIENT_ID, "SPOTIFY_CLIENT_ID must be set");
invariant(process.env.SPOTIFY_SECRET, "SPOTIFY_SECRET be set");

const clientId = process.env.SPOTIFY_CLIENT_ID; // Your client id
const clientSecret = process.env.SPOTIFY_SECRET; // Your secret

// your application requests authorization
const authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
  },
};

export async function getSpotifyCredentials() {
  const res = await fetch(authOptions.url, {
    method: "POST",
    headers: authOptions.headers,
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  });

  if (!res.ok) throw new Error("Something went wrong");

  // @todo: zod here
  // set cookie
  // private routes
  //  consume Spotify api
  console.log(await res.json());
}
