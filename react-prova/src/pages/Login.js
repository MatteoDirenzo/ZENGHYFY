import React from "react";
import "./Login.css"

export default function Login({ clientId }) {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private`;

  return (
    <div className="Login-container">
      <div className="anchor-container">
        <a className="anchor" href={AUTH_URL}>
          Login with Spotify
        </a>
      </div>
    </div>
  );
}
