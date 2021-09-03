import { rest } from "msw";
// require("dotenv").config();

const spotifyUri = "http://localhost/spotify/";

export const handlers = [
  rest.get(spotifyUri + "playing", (req, res, ctx) => {
    console.log("***** HIT - currentSong *****");
    return res(
      ctx.json({
        Title: "Strong",
        Artist: "Tesla Boy",
        Album: "Strong",
        ID: "73MUjIcRB7yBfVDuShpv8d",
        URI: "spotify:track:73MUjIcRB7yBfVDuShpv8d",
        ImageObject: {
          height: 640,
          url: "https://i.scdn.co/image/ab67616d0000b273d8f8d86c635c684c73cd3d22",
          width: 640,
        },
      })
    );
  }),
  rest.get(spotifyUri + "playlists", (req, res, ctx) => {
    console.log("***** HIT - playlists *****");
    return res(
      ctx.json([
        {
          name: "test_1",
          url: "https://api.spotify.com/v1/playlists/test_1_id",
          id: "test_1_id",
        },
        {
          name: "test_2",
          url: "https://api.spotify.com/v1/playlists/test_2_id",
          id: "test_2_id",
        },
        {
          name: "test_3",
          url: "https://api.spotify.com/v1/playlists/test_3_id",
          id: "test_3_id",
        },
      ])
    );
  }),
  rest.get(spotifyUri + "loadPlaylist", (req, res, ctx) => {
    console.log("***** HIT - loadPlaylist *****");
    return res(
      ctx.json({
        Name: "test_1",
        URI: "spotify:playlist:test_1_id",
        ID: "test_1_id",
        TrackList: [
          {
            Title: "Time",
            Artist: "Hans Zimmer",
            Album: "Inception (Music From The Motion Picture)",
            ID: "6ZFbXIJkuI1dVNWvzJzown",
            URI: "spotify:track:6ZFbXIJkuI1dVNWvzJzown",
            ImageObject: {
              height: 640,
              url: "https://i.scdn.co/image/ab67616d0000b273bb53ecc4d4e007f8c0464753",
              width: 640,
            },
          },
          {
            Title: "Chan chan",
            Artist: "Compay Segundo",
            Album: "Antologia",
            ID: "7FmQoo7sjlVhgGJv28huVW",
            URI: "spotify:track:7FmQoo7sjlVhgGJv28huVW",
            ImageObject: {
              height: 640,
              url: "https://i.scdn.co/image/ab67616d0000b2735b088cdf64feb0f80ffffae8",
              width: 640,
            },
          },
          {
            Title: "The Kids Aren't Alright",
            Artist: "The Offspring",
            Album: "Americana",
            ID: "4EchqUKQ3qAQuRNKmeIpnf",
            URI: "spotify:track:4EchqUKQ3qAQuRNKmeIpnf",
            ImageObject: {
              height: 640,
              url: "https://i.scdn.co/image/ab67616d0000b273cbd2ee7dff77bfb2b5f0af52",
              width: 640,
            },
          },
          {
            Title: "Gigi l'amoroso - French Version",
            Artist: "Dalida",
            Album: "40 succès en or",
            ID: "4ArgA1vhM4y4qSd3DvYIhy",
            URI: "spotify:track:4ArgA1vhM4y4qSd3DvYIhy",
            ImageObject: {
              height: 640,
              url: "https://i.scdn.co/image/ab67616d0000b273891246211bc49eeccbc4dac3",
              width: 640,
            },
          },
          {
            Title: "Chan Chan",
            Artist: "Buena Vista Social Club",
            Album: "Buena Vista Social Club",
            ID: "5sbw5zIz9ck2pOEDXUR0QU",
            URI: "spotify:track:5sbw5zIz9ck2pOEDXUR0QU",
            ImageObject: {
              height: 640,
              url: "https://i.scdn.co/image/ab67616d0000b2732a896bf89ee1e87f1a774cb6",
              width: 640,
            },
          },
          {
            Title: "Fly Me To The Moon (In Other Words)",
            Artist: "Frank Sinatra",
            Album: "Sinatra/Basie: The Complete Reprise Studio Recordings",
            ID: "5b7OgznPJJr1vHNYGyvxau",
            URI: "spotify:track:5b7OgznPJJr1vHNYGyvxau",
            ImageObject: {
              height: 640,
              url: "https://i.scdn.co/image/ab67616d0000b273cb81eb3c1238c60f2bbfd3b5",
              width: 640,
            },
          },
          {
            Title: "The Letter",
            Artist: "Rupert Gregson-Williams",
            Album:
              "The Crown: Season One (Soundtrack from the Netflix Original Series)",
            ID: "0Gztnz1xHZgq9tRj69T0uc",
            URI: "spotify:track:0Gztnz1xHZgq9tRj69T0uc",
            ImageObject: {
              height: 640,
              url: "https://i.scdn.co/image/ab67616d0000b273b1503ead5dd422816f21bb46",
              width: 640,
            },
          },
        ],
      })
    );
  }),
];
