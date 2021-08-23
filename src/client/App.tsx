import React , { useState } from 'react';
import { render } from 'react-dom';
import Cookies from 'js-cookie';

import Context from './context/Context';

import CurrentSong from './containers/CurrentSong';
import Login from './containers/Login';
import Main from './containers/Main';
import Playlist from './containers/Playlist';
import UserPlaylists from './containers/UserPlaylists';


function App(props) {

  const [logInState, setLogInState] = useState(Cookies.get('userName') ? true : false);
  const [globalUserId, setGlobalUserId] = useState(Cookies.get('userId') ? Cookies.get('userId') :'');
  const [activePlaylist, setActivePlaylist] = useState({
		id: '',
		name: '',
  });
  const [currentSong, setCurrentSong] = useState('');


  const toggleLogInState = () => setLogInState(Cookies.get('userName') ? true : false);
  const storeGlobalUserId = () => setGlobalUserId(Cookies.get('userId') ? Cookies.get('userId') : '');


  let renderArr = [];
  if (logInState) renderArr.push(
    <UserPlaylists key={2}/>,
    <Main key={3}/>,
    <CurrentSong key={4}/>
  );

  return(
    <Context.Provider value={{
      logInState,
      toggleLogInState,
      globalUserId,
      storeGlobalUserId,
      activePlaylist,
      setActivePlaylist,
      currentSong,
      setCurrentSong,
    }}>
      <div id="master-container">
        <h1 key={0} id="playlist-header">
          Spotify Playlist Creator
        </h1>
        <Login key={1}/>
        <div id="app-container">
          {renderArr}
        </div>
      </div>
    </Context.Provider>
  )
}

export default App;