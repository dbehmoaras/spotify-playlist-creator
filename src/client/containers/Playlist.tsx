import React, { useState } from 'react';
import FunctionButton from '../components/FunctionButton';
import SpotifySearch from './SpotifySearch';
import SmallFunctionButton from './../components/SmallFunctionButton'


const addIcon =
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" id="small-icon" viewBox="0 0 16 16">
  <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm.5 4v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z"/>
</svg>

const removeIcon =
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" id="small-icon" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M3.112 5.112a3.125 3.125 0 0 0-.17.613C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13H11L3.112 5.112zm11.372 7.372L4.937 2.937A5.512 5.512 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773a3.2 3.2 0 0 1-1.516 2.711zm-.838 1.87-12-12 .708-.708 12 12-.707.707z"/>
</svg>


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
			</div>
			<div id="search-results">
				<span style={{fontWeight: 550, textDecoration: 'underline'}}>Search Results:</span>
				{songs.map((ele, idx) => {
					return (
						<div key={idx} id="song-in-list-container">
							<div id="song-in-list">
								<span style={{fontWeight: 550}}>{ele.Title}</span>
								<span style={{fontStyle: 'italic'}}>{ele.Artist}</span>
							</div>
							<SmallFunctionButton func={()=>console.log("ADD")} icon={addIcon}/>
						</div>
					)
				})}
			</div>
			<div id="playlist">
				<span style={{fontWeight: 550, textDecoration: 'underline'}}>Playlist:</span>
				{songs.map((ele, idx) => {
					return (
					<div key={idx} id="song-in-list-container">
						<div id="song-in-list">
							<span style={{fontWeight: 550}}>{ele.Title}</span>
							<span style={{fontStyle: 'italic'}}>{ele.Artist}</span>
						</div>
						<SmallFunctionButton func={()=>console.log("REMOVE")} icon={removeIcon}/>
					</div>)
				})}
			</div>
		</div>
	)
}

export default Playlist;