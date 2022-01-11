import React, { useEffect, useState } from "react";
import TrackSearchResult from "../components/TrackSearchResult";
import axios from "axios";
import setArrayMethod from "../utilities/setArrayMethod";
import "./AllPlayer.css";

export default function AllPlayer({
  chooseTrack,
  spotifyApi,
  accessToken,
  playingTrack,
  search,
  setSearch,
  lyrics,
  setLyrics,
}) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!playingTrack) return;
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [accessToken, playingTrack, spotifyApi]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    let cancel = false;

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      let arrayTemp = [];
      res.body.tracks.items.map((item) => {
        return arrayTemp.push(
          setArrayMethod(item, item.album.images, "no", "tracks")
        );
      });
      setSearchResults(arrayTemp);
    });

    return () => (cancel = true);
  }, [search, accessToken, spotifyApi]);

  return (
    <>
      <div className="container-all-player">
        <div className="container-media">
          <input
            type="search"
            value={search}
            placeholder="Search song/artists"
            onChange={(e) => setSearch(e.target.value)}
            className="input-search"
          />
        </div>
        <div className="search-container">
          {searchResults.map((track) => {
            return (
              <TrackSearchResult
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
                spotifyApi={spotifyApi}
                origin={"allPlayer"}
              />
            );
          })}
          {searchResults.length === 0 && (
            <div className="lyrics-container">{lyrics}</div>
          )}
        </div>
      </div>
    </>
  );
}
