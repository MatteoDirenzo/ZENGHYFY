import { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken) return null;
  return (
    <SpotifyPlayer
    styles={{
      bgColor: 'trasparent',
      sliderColor: '#1DB954',
      sliderTrackColor: '#858484',
      sliderHandleColor: 'white',
      trackNameColor: 'white',
      color: 'white',
      trackArtistColor: '#858484'
    }}
      token={accessToken}
      showSaveIcon
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
  );
}
