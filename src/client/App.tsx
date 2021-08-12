import * as React from 'react';
import { render } from 'react-dom';

import Playlist from './containers/Playlist';

function App() {
  return(
    <div>
      <h1 id="colorTestDiv">
        HEY IT'S A DIV
      </h1>
      <Playlist />
    </div>
  )
}

export default App;