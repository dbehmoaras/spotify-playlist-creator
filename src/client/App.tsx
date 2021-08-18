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


  const toggleLogInState = () => setLogInState(Cookies.get('userName') ? true : false);
  const storeGlobalUserId = () => setGlobalUserId(Cookies.get('userId') ? Cookies.get('userId') : '')

  let renderArr = [<Login key={0}/>];
  if (logInState) renderArr.push(
    <UserPlaylists key={1}/>,
    <Main key={2}/>,
    <CurrentSong key={3}/>
  );

  console.log("user id:", globalUserId)
  return(
    <Context.Provider value={{
      logInState,
      toggleLogInState,
      globalUserId,
      storeGlobalUserId
    }}>
      <div id="app-container">
        {renderArr}
      </div>
    </Context.Provider>
  )
}

export default App;