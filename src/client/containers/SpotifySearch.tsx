import React, {useState, useEffect} from "react";

import FunctionButton from "../components/FunctionButton";
import SmallFunctionButton from './../components/SmallFunctionButton'
// import SearchOption from "../components/SearchOption";

const addIcon =
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" id="small-icon" viewBox="0 0 16 16">
  <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm.5 4v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z"/>
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

function SpotifySearch (props) {
	const [showOptions, setShowOptions] = useState(false);
	const [searchTerm, updateSearchTerm] = useState("");
	const [searchOptions, setSearchOptions] = useState({
		Track: true,
		// Album: false,
		// Artist: true,
		// Playlist: false,
		// Show: false,
		// Episode: false
	})
	const [songs, setSongs] = useState(songList)

	/**
		DEV NOTE:
		The code below includes logic to handle additional search parameters however the back-end does not support this feature yet.

		useEffect(()=> {;
			renderOptions(searchOptions);
		},[searchOptions])

		const editSearchOptions = (option) => {
			searchOptions[option] = !searchOptions[option];
			setSearchOptions(searchOptions);
			return searchOptions[option];
		}

		const toggleShowOptions = () => {
			setShowOptions(!showOptions);
		}

		const optionsMenu = () => {
			const menuArr = [];
			Object.keys(searchOptions).forEach((option, idx) => {
				menuArr.push(
					<SearchOption key={idx} name={option} defaultOption={searchOptions[option]}  func={editSearchOptions}/>
				)
			})
			return menuArr;
		}

		const renderOptions = (showBool) => {
			return showBool ? optionsMenu() : null;
		}
	 */

	const inputUpdate = (event) => {
		updateSearchTerm(event.target.value)
	}

	const submitSearch = () => {
		const searchObj = {
			searchTerm,
			searchOptions,
		}
		console.log("***** submitting search:", searchObj);
	}

	return (
		<div id="spotify-search-container">
			<div id="spotify-search-box">
				<div id="input-field-container">
					<input id="input-field" onChange={inputUpdate}>
					</input>
				</div>
				<div id="search-button-container">
					<FunctionButton name={"Search Tracks"} func={()=>submitSearch()}/>
					{/* <FunctionButton name={"View Search Options"} func={()=>toggleShowOptions()}/> */}
				</div>
			</div>
			{/* <div id="options-container">
				{renderOptions(showOptions)}
			</div> */}
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
		</div>
	)
}

export default SpotifySearch;