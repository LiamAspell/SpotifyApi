import React from 'react';
import { useEffect, useState } from "react";
import SpotifyPlayer from 'react-spotify-web-playback'
import Button from 'react-bootstrap/Button';

export const Player = () => {
  const CLIENT_ID = "89dba4db4d2642e2ac2e0f4d5dc0d457"
  const REDIRECT_URI = "http://localhost:3000/Player"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPE = "user-top-read, user-modify-playback-state, streaming, user-read-email, user-read-private, user-library-read, user-library-modify, user-read-playback-state, user-modify-playback-state"
  const [token, setToken] = useState("")
  const track_uri = "spotify:artist:0UVthdD1eqqsoNLX9ek4Xb"    //spotify:track:7xGfFoTpQ2E7fRF5lN10tr

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")
    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }
    setToken(token)
  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
    window.location.reload();
  }

  return (
    <div className='App'>
      <div className="Player-header">
        <h1>Player</h1>
      </div>
      <div className='App-header'>
      
        {token ?
          <div className='BuiltInPlayer'>
            <div style={{ height: "30%", width: "30%", alignItems: "center",  display:'flex', justifyContent: "center" }}>
            <SpotifyPlayer
              token={token}
              uris={track_uri}
              styles={{
                activeColor: '#fff',
                bgColor: '#333',
                color: '#fff',
                loaderColor: '#fff',
                sliderColor: 'blue',
                trackArtistColor: '#00FF00',
                trackNameColor: '#00FF00', 
              }}
            />
            </div>
          </div>
          : <div style={{ width: "30%" }}>
            You are not authenticated.<br />
            To view this page, Please Login with Spotify
          </div>
        }

        {!token ?
          <Button variant="success" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Click To Login on with Spotify</Button>
          : <Button variant="danger" onClick={logout} style={{ color: 'white' }}>Click to Logout</Button>
        }
        
      </div>
    </div>
  );

}

export default Player