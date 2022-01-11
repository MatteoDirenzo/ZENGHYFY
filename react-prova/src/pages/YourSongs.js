import React, { useEffect, useState } from "react";
import setArrayMethod from "../utilities/setArrayMethod";
import TrackSearchResult from "../components/TrackSearchResult";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "./YourSongs.css";

export default function YourSongs({ spotifyApi, accessToken, chooseTrack }) {
  const [tracks, setTracks] = useState([]);
  const [newPage, setnewPage] = useState(0);
  const [hasMore, sethasMore] = useState(true);

  const fetchTracks = async () => {
    spotifyApi.setAccessToken(accessToken);

    await axios
      .get(`http://localhost:3001/savedTracks?page=${newPage}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(({ data }) => {
        let arrayTemp = [];

        arrayTemp = data.body.items.map((item) => {
          return setArrayMethod(
            item.track,
            item.track.album.images,
            item.added_at,
            "tracks"
          );
        });

        setTracks([...tracks, ...arrayTemp]);
        setnewPage(newPage + 1);

        if (arrayTemp.length === 0) {
          return sethasMore(false);
        }
      });
  };

  useEffect(() => {
    let myInterval = setInterval(fetchTracks(), 3000);
    if (!hasMore) {
      clearInterval(myInterval);
    }
  }, []);

  return (
    <div className="yoursongs-container">
      <div id="scrollable" className="scrollable-container">
        <InfiniteScroll
          dataLength={tracks.length} //This is important field to render the next data
          next={fetchTracks}
          hasMore={hasMore}
          scrollableTarget="scrollable"
          className="infinite-scroll"
        >
          {tracks.map((track, index) => {
            return (
              <TrackSearchResult
                track={track}
                spotifyApi={spotifyApi}
                accessToken={accessToken}
                key={index}
                chooseTrack={chooseTrack}
                origin={"yourSongs"}
              />
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
}
