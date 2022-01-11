import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import 'font-awesome/css/font-awesome.min.css';
import { FaBars } from "react-icons/fa"

export default function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" alt="logo" />
        </Link>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={handleClick}>
              Player
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/playlists" className="nav-links" onClick={handleClick}>
              Playlists
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/yoursongs" className="nav-links" onClick={handleClick}>
              Your Songs
            </Link>
          </li>
        </ul>
        <div className="nav-icon" onClick={handleClick}>
          <FaBars />
        </div>
      </div>
    </nav>
  );
}
