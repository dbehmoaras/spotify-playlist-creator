import React , { useState } from 'react';
import { render } from 'react-dom';

import Playlist from './containers/Playlist';
import Login from './containers/Login';
import CurrentSong from './containers/CurrentSong';
import LogInContext from './context/LogInContext';

// interface LogInState {
//   isLoggedIn: boolean
// }


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const loggedInContext = React.useContext(LogInContext);
  // console.log("context",loggedInContext);
  // loggedInContext.setLogInState();
  // console.log("context",loggedInContext);
  // loggedInContext.setLogInState();
  // console.log("context",loggedInContext);
  // loggedInContext.setLogInState();
  // console.log("context",loggedInContext);

  // const toggleLogInState = () => {
  //   setLoggedIn(!loggedIn);
  // }

  console.log(loggedIn);
  return(
    <div id="main-app-container">
      <span id="log-in-header">
        Please Log In:
      </span>
      <Login
      logInState={loggedInContext.logInState} onClick={()=>loggedInContext.toggleLogInState()}
      // logInState={loggedIn} onClick={()=>setLoggedIn(!loggedIn)}
      />
      <h2 id="song-header">
        Current Song:
      </h2>
      <CurrentSong />
      <h1 id="playlist-header">
        Spotify Playlist Creator
      </h1>
      <Playlist />
    </div>
  )
}

export default App;