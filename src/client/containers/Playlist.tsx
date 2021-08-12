import React, { useState } from "react";

declare function require(name:string);


interface Song {
	Title: string,
	Artist: string,
}

const songList: Song[] = [
	{
		"Title": "Time",
		"Artist": "Hans Zimmer",
	},
	{
		"Title": "From Past To Present",
		"Artist": "Jeremy Soule"
	}
];

function Playlist () {

	const [songs, setSongs] = useState(songList)

	return(
		<div>

			<div className='playlist-container'>
				{songs.map((ele) => {
					return (<div>
						<span>{ele.Title}</span>
						<span>{ele.Artist}</span>
					</div>)
				})}
			</div>
		</div>
	)
}

export default Playlist;