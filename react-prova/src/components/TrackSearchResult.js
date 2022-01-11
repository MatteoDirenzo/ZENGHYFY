import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import "./TrackSearchResult.css";
import { FaPlay } from "react-icons/fa";

export default function TrackSearchResult({
  track,
  chooseTrack,
  origin,
  playlistId,
}) {
  const [features, setfeatures] = useState({});

  function handlePlay() {
    chooseTrack(track);
  }

  const danceability = features.danceability;
  const acousticness = features.acousticness;
  const energy = features.energy;
  const liveness = features.liveness;
  const tempo = features.tempo;
  const positiveness = features.valence;

  const date = new Date(track.addedAt).toLocaleString();

  useEffect(() => {
    if (!features) return setfeatures({});
    if (origin === "allPlayer") return;
    axios
      .get(`http://localhost:3001/features?id=${track.id}`, {
        params: { origin, playlistId },
      })
      .then((res) => {
        setfeatures(JSON.parse(res.data.features));
      });
  }, [track.id]);

  return (
    <div className="all">
      <div>
        <img src={track.albumUrl} alt="album cover" className="image-card" />
        <FaPlay alt="play song" className="button-play" onClick={handlePlay} />
      </div>
      <h1 className="text-card" id="title">
        {track.title}
      </h1>
      <h1 className="text-card" id="artist">
        {track.artist}
      </h1>
      <h1 className="text-card" id="special-text">
        {date === "Invalid Date" ? "" : "added at: " + date}
      </h1>
      {tempo ? (
        <h1 className="text-card" id="special-text">
          BPM: &#32;{tempo}
        </h1>
      ) : (
        ""
      )}
      <div className="feature-container">
        {danceability ? <h1 className="text-card">dance: </h1> : ""}
        {danceability ? <Slider number={danceability} /> : ""}
      </div>
      <div className="feature-container">
        {acousticness ? <h1 className="text-card">acoustic: </h1> : ""}
        {acousticness ? <Slider number={acousticness} /> : ""}
      </div>
      <div className="feature-container">
        {liveness ? <h1 className="text-card">liveness: </h1> : ""}
        {liveness ? <Slider number={liveness} /> : ""}
      </div>
      <div className="feature-container">
        {energy ? <h1 className="text-card">energy: </h1> : ""}
        {energy ? <Slider number={energy} /> : ""}
      </div>
      <div className="feature-container">
        {positiveness ? <h1 className="text-card">positiveness: </h1> : ""}
        {positiveness ? <Slider number={positiveness} /> : ""}
      </div>
    </div>
  );
}
