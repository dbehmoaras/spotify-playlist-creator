import React , { useState } from 'react';
import { render } from 'react-dom';

import Context from '../context/Context';
import CurrentSong from './CurrentSong';
import Playlist from './Playlist';
import SpotifySearch from './SpotifySearch';

function Main(props) {

	return(
		<div id="main">
			<SpotifySearch />
			<Playlist />
		</div>
	)
}

export default Main;