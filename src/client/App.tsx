import React , { useState } from 'react';
import { render } from 'react-dom';
import Cookies from 'js-cookie';

import Login from './containers/Login';
import Main from './containers/Main';
import Playlist from './containers/Playlist';
import CurrentSong from './containers/CurrentSong';
import LogInContext from './context/LogInContext';

function App(props) {

  const [logInState, setLogInState] = useState(Cookies.get('userName') ? true : false);
  const toggleLogInState = () => setLogInState(Cookies.get('userName') ? true : false)


  let renderArr = [<Login key={0}/>];
  if (logInState) renderArr.push(<Main key={1}/>);

  return(
    <LogInContext.Provider value={{logInState, toggleLogInState}}>
      <div id="main-app-container">
        {renderArr}
      </div>
    </LogInContext.Provider>
  )
}

export default App;