import React , { useState } from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

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
     <Router>
        <div id="main-app-container">
          <Switch>
            <Route path="/" component={Login} />
            <Route path="/home">
              <h2 id="song-header">
                Current Song:
              </h2>
              <CurrentSong />
              <h1 id="playlist-header">
                Spotify Playlist Creator
              </h1>
              <Playlist />
            </Route>
            <Route path="*">
              NOPE NOT YET
            </Route>
          </Switch>
        </div>
      </Router>
    </LogInContext.Provider>
  )
}

export default App;