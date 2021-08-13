import React , { useState } from 'react';
import { render } from 'react-dom';


interface Song {
	Title: string,
	Artist: string,
}


const songList: Song[] =
[
	{
		"Title": "The Kids Aren't Alright",
		"Artist": "The Offspring",
	},
	{
		"Title": "Chan Chan",
		"Artist": "Buena Vista Social Club"
	}
];


function CurrentSong (props) {
	const [currentSong, setCurrentSong] = useState(songList[0])

	return(
		<div id="current-song-container">
			<div id="current-song">
				{Object.keys(currentSong).map((ele, idx)=> {
					return (<div key={idx}>
						<span>{currentSong[ele]}</span>
					</div>)
				})}
			</div>
		</div>
	)
}

export default CurrentSong;