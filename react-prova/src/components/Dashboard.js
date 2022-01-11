import React, { useState } from "react";
import AllPlayer from "../pages/AllPlayer";
import Playlist from "../pages/Playlist";
import useAuth from "./useAuth";
import Player from "./Player";
import YourSongs from "../pages/YourSongs";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";

export default function Dashboard({ code, spotifyApi }) {
  const accessToken = useAuth(code);
  const [playingTrack, setPlayingTrack] = useState();
  const [search, setSearch] = useState("");
  const [lyrics, setLyrics] = useState("");

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <AllPlayer
                chooseTrack={chooseTrack}
                spotifyApi={spotifyApi}
                playingTrack={playingTrack}
                search={search}
                setSearch={setSearch}
                setLyrics={setLyrics}
                accessToken={accessToken}
                lyrics={lyrics}
              />
            }
          />
          <Route
            exact
            path="/yoursongs"
            element={
              <YourSongs
                spotifyApi={spotifyApi}
                accessToken={accessToken}
                chooseTrack={chooseTrack}
              />
            }
          />
          <Route
            exact
            path="/playlists"
            element={
              <Playlist
                spotifyApi={spotifyApi}
                accessToken={accessToken}
                chooseTrack={chooseTrack}
              />
            }
          />
        </Routes>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </Router>
    </>
  );
}
