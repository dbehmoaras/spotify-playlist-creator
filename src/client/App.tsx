import * as React from 'react';
import { render } from 'react-dom';

import Playlist from './containers/Playlist';
import Login from './containers/Login'

function App() {
  return(
    <div>
      App Header
      <Login />
      <h1 id="colorTestDiv">
        Spotify Playlist Creator
      </h1>
      <Playlist />
    </div>
  )
}

export default App;