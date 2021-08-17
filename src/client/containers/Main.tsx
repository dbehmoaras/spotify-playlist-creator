import React , { useState } from 'react';
import { render } from 'react-dom';

import Playlist from './Playlist';
import CurrentSong from './CurrentSong';
import LogInContext from './../context/LogInContext';

function Main(props) {

	return(
		<div id="main">
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

export default Main;