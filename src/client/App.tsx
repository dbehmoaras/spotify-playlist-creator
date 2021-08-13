import React , { useState } from 'react';
import { render } from 'react-dom';

import Playlist from './containers/Playlist';
import Login from './containers/Login';
import CurrentSong from './containers/CurrentSong';
import LogInContext from './context/LogInContext';

function App() {

  const [logInState, setLogInState] = useState(false);
  const toggleLogInState = () => setLogInState(!logInState)
  // const loggedInContext = React.useContext(LogInContext);

  return(
    <LogInContext.Provider value={{logInState, toggleLogInState}}>
      <div id="main-app-container">
        <span id="log-in-header">
          Please Log In:
        </span>
        <Login />
        <h2 id="song-header">
          Current Song:
        </h2>
        <CurrentSong />
        <h1 id="playlist-header">
          Spotify Playlist Creator
        </h1>
        <Playlist />
      </div>
    </LogInContext.Provider>
  )
}

export default App;