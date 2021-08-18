import React , { useState } from 'react';
import { render } from 'react-dom';

import Playlist from './Playlist';
import CurrentSong from './CurrentSong';
import Context from '../context/Context';

function Main(props) {

	return(
		<div id="main">
			<h1 id="playlist-header">
				Spotify Playlist Creator
			</h1>
			<Playlist />
		</div>
	)
}

export default Main;