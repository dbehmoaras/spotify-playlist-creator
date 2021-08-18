import React, { useState } from 'react';
import FunctionButton from '../components/FunctionButton';
import SpotifySearch from './SpotifySearch';


interface Song {
	Title: string,
	Artist: string,
}

const songList: Song[] =
[
	{
		"Title": "Time",
		"Artist": "Hans Zimmer",
	},
	{
		"Title": "From Past To Present",
		"Artist": "Jeremy Soule"
	},
	{
		"Title": "The Kids Aren't Alright",
		"Artist": "The Offspring",
	},
	{
		"Title": "Chan Chan",
		"Artist": "Buena Vista Social Club"
	}
];

function Playlist (props) {

	const [songs, setSongs] = useState(songList)

	return(
		<div id="playlist-container">
			<div id="spotify-search-container">
				<SpotifySearch />
			</div>
			<div id="function-button-container">
				<FunctionButton name={"Add Song"} func={() => console.log("Add Song")}/>
				<FunctionButton name={"Remove Song"} func={() => console.log("Remove Song")}/>
				{/* <FunctionButton /> */}
			</div>
			<div id="playlist">
				{songs.map((ele, idx) => {
					return (<div key={idx} id="song-in-playlist">
						<span>{ele.Title}, {ele.Artist}</span>
					</div>)
				})}
			</div>
		</div>
	)
}

export default Playlist;