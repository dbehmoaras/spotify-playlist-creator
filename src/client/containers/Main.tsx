import React , { useState } from 'react';
import { render } from 'react-dom';

import Playlist from './Playlist';
import CurrentSong from './CurrentSong';
import Context from '../context/Context';

function Main(props) {

	return(
		<div id="main">
			<Playlist />
		</div>
	)
}

export default Main;