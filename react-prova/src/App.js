import React from "react";
import "./Reset.css";
import Login from "./pages/Login";
import Dashboard from "./components/Dashboard";
import spotifyWebApi from "spotify-web-api-node";
import "./App.css"

function App() {
  const code = new URLSearchParams(window.location.search).get("code");

  const client_Id = " ";

  const spotifyApi = new spotifyWebApi({
    clientId: client_Id,
  });

  return code ? (
    <Dashboard
      code={code}
      spotifyApi={spotifyApi}
      className="dashboard"
    />
  ) : (
    <Login clientId={client_Id} />
  );
}

export default App;
