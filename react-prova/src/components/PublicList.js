import React, { useState, useEffect } from "react";
import TrackSearchResult from "./TrackSearchResult";
import setArrayMethod from "../utilities/setArrayMethod";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "./PublicList.css";

export default function PublicList({
  playlist,
  accessToken,
  chooseTrack,
  spotifyApi,
  counter,
}) {
  const [tracks, setTracks] = useState([]);
  const [newPage, setnewPage] = useState(0);
  const [hasMore, sethasMore] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const fetchTracks = async () => {
    spotifyApi.setAccessToken(accessToken);

    await axios
      .get(`http://localhost:3001/playlist?page=${newPage}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { id: playlist.id.toString() },
      })
      .then(({ data }) => {
        let arrayTemp = [];

        arrayTemp = data.body.items.map((item) => {
          if (item.track.album.images)
            return setArrayMethod(
              item.track,
              item.track.album.images,
              item.added_at,
              "tracks"
            );
          else
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
    fetchTracks();
  }, []);

  const accordation = () => {
    var acc = document.getElementsByClassName("public-list-container");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        console.log(panel.style.display);
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  };

  return (
    <>
      <div className="accordation">
        <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
          <div className="header-container">
            <img
              src={playlist.playlistUrl}
              alt="playlist cover"
              className="playlist-image"
            />
            <h1 className="playlist-title">{playlist.title}</h1>
          </div>
          <div className="icon">{isActive ? "-" : "+"}</div>
        </div>
        {isActive && (
            <div className="songs-container" id={"scrollable" + counter}>
              <InfiniteScroll
                dataLength={tracks.length}
                next={fetchTracks}
                hasMore={hasMore}
                scrollableTarget={"scrollable" + counter}
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                {tracks.map((track, index) => {
                  return (
                    <TrackSearchResult
                      track={track}
                      spotifyApi={spotifyApi}
                      accessToken={accessToken}
                      key={index}
                      chooseTrack={chooseTrack}
                      playlistId={playlist.id}
                      origin={"publicList"}
                    />
                  );
                })}
              </InfiniteScroll>
            </div>
        )}
      </div>
      {/* <div className="panel">
        <div className="header-container">
          <div className="playlist-title-container">{playlist.title}</div>
        </div>
        <div className="songs-container" id={"scrollable" + counter}>
          <InfiniteScroll
            dataLength={tracks.length}
            next={fetchTracks}
            hasMore={hasMore}
            scrollableTarget={"scrollable" + counter}
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {tracks.map((track, index) => {
              return (
                <TrackSearchResult
                  track={track}
                  spotifyApi={spotifyApi}
                  accessToken={accessToken}
                  key={index}
                  chooseTrack={chooseTrack}
                  playlistId={playlist.id}
                  origin={"publicList"}
                />
              );
            })}
          </InfiniteScroll>
        </div>
      </div> */}
    </>
  );
}
