import React, { useState } from "react";

declare function require(name:string);


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

function Playlist () {

	const [songs, setSongs] = useState(songList)

	return(
		<div>
			<div id="playlist-container">
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