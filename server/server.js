const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Genius = require("genius-lyrics");

const Genius_client = new Genius.Client(" ");
const Spotify_client_Id = " ";
const Spotify_client_Secret = " ";
const local_host = "http://localhost:3000";

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/refresh", (req, res) => {
  const spotifyApi = new SpotifyWebApi({
    redirectUri: local_host,
    clientId: Spotify_client_Id,
    clientSecret: Spotify_client_Secret,
    refreshToken,
  });
  const refreshToken = req.body.refreshToken;

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: local_host,
    clientId: Spotify_client_Id,
    clientSecret: Spotify_client_Secret,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.get("/lyrics", async (req, res) => {
  const searches = await Genius_client.songs.search(
    req.query.track.toLowerCase()
  );
  const firstSong = searches[0];
  const lyrics = await firstSong.lyrics();

  res.json({ lyrics });
});

app.get("/savedTracks", async (req, res) => {
  const spotifyApi = new SpotifyWebApi({
    redirectUri: local_host,
    clientId: Spotify_client_Id,
    clientSecret: Spotify_client_Secret,
  });
  const token = (req.header("authorization") || "").replace("Bearer ", "");
  const page = parseInt(req.query.page) || 0;
  const limit = 50;
  const offset = limit * page;
  try {
    if (token) {
      spotifyApi.setAccessToken(token);
      const tracks = await spotifyApi.getMySavedTracks({ offset, limit });

      let trackIds = tracks.body.items.map((t) => t.track.id);

      prisma.tracks
        .findMany({ where: { id: { in: trackIds } } })
        .then((dbTracks) => {
          const dbTracksIds = dbTracks.map((t) => t.id);
          trackIds = trackIds.filter((id) => dbTracksIds.indexOf(id) < 0);
          spotifyApi.getAudioFeaturesForTracks(trackIds).then((features) => {
            const promises = features.body.audio_features.map(async (f) => {
              if (f) {
                const { id } = f;
                return prisma.tracks
                  .create({
                    data: {
                      id,
                      features: JSON.stringify(f),
                    },
                  })
                  .catch((e) => e); // ignoring error
              } else {
                return null;
              }
            });
            Promise.all(promises).then(() => {
              res.json(tracks);
            });
          });
        });
    } else {
      throw new Error("Unauthorized");
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(401);
  }
});

app.get("/playlist", async (req, res) => {
  const spotifyApi = new SpotifyWebApi({
    redirectUri: local_host,
    clientId: Spotify_client_Id,
    clientSecret: Spotify_client_Secret,
  });
  const token = (req.header("authorization") || "").replace("Bearer ", "");
  const page = parseInt(req.query.page) || 0;
  const limit = 10;
  const offset = limit * page;
  const idPlay = req.query.id.toString();

  try {
    if (token) {
      spotifyApi.setAccessToken(token);
      const playlistTracks = await spotifyApi.getPlaylistTracks(idPlay, {
        offset,
        limit,
      });

      let trackIds = playlistTracks.body.items.map((t) => t.track.id);

      prisma.playlistTracks
        .findMany({
          where: {
            AND: [{ id: { in: trackIds } }, { idPlaylist: { in: [idPlay] } }],
          },
        })
        .then((dbPlaylistTracks) => {
          const dbPlaylistTracksIds = dbPlaylistTracks.map((t) => t.id);
          trackIds = trackIds.filter(
            (id) => dbPlaylistTracksIds.indexOf(id) < 0
          );
          spotifyApi.getAudioFeaturesForTracks(trackIds).then((features) => {
            const promises = features.body.audio_features.map(async (f) => {
              if (f) {
                const { id } = f;
                return prisma.playlistTracks
                  .create({
                    data: {
                      id,
                      idPlaylist: idPlay,
                      features: JSON.stringify(f),
                    },
                  })
                  .catch((e) => e); // ignoring error
              } else {
                return null;
              }
            });
            Promise.all(promises).then(() => {
              console.log();
              res.json(playlistTracks);
            });
          });
        });
    } else {
      throw new Error("Unauthorized");
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(401);
  }
});

app.get("/features", async (req, res) => {
  const id = req.query.id;
  const origin = req.query.origin;
  const idPlay = req.query.playlistId;
  try {
    if (id && origin == "yourSongs") {
      prisma.tracks.findFirst({ where: { id } }).then((track) => {
        res.json(track);
      });
    } else if (id && origin == "publicList") {
      prisma.playlistTracks
        .findFirst({
          where: {
            AND: [{ id }, { idPlaylist: { in: [idPlay] } }],
          },
        })
        .then((track) => {
          res.json(track);
        });
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(401);
  }
});

app.listen(3001);
