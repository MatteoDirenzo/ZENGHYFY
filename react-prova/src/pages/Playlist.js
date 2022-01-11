import React, { useEffect, useState } from "react";
import setArrayMethod from "../utilities/setArrayMethod";
import PublicList from "../components/PublicList";
import "./Playlist.css"

export default function Playlist({ accessToken, chooseTrack, spotifyApi }) {
  const [playlists, setPlaylists] = useState([]);
  let counter = 0;

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    if (!playlists) return setPlaylists([]);
    spotifyApi.getUserPlaylists().then((res) => {
      let arrayTemp = [];
      res.body.items.map((item) => {
        return arrayTemp.push(
          setArrayMethod(item, item.images, "no", "playlists")
        );
      });
      setPlaylists(arrayTemp);
    });
  }, [accessToken, spotifyApi]);

  return (
    <div className="playlist-container">
      {playlists &&
        playlists.map((playlist) => {
          counter = counter + 1;
          return (
            <PublicList
              counter={counter}
              playlist={playlist}
              key={playlist.uri}
              chooseTrack={chooseTrack}
              accessToken={accessToken}
              spotifyApi={spotifyApi}
            />
          );
        })}
    </div>
  );
}
