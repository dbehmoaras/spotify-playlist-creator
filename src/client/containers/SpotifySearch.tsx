import React, {useState, useEffect} from "react";

import FunctionButton from "../components/FunctionButton";
import SearchOption from "../components/SearchOption";

function SpotifySearch (props) {
	const [showOptions, setShowOptions] = useState(false);
	const [searchOptions, setSearchOptions] = useState({
		Album: false,
		Artist: true,
		Playlist: false,
		Track: true,
		Show: false,
		Episode: false
	})

	useEffect(()=> {;
		console.log('useEff')
		renderOptions(searchOptions)
	},[searchOptions])

	const editSearchOptions = (option) => {
		console.log("edit")
		console.log("before:", searchOptions)
		searchOptions[option] = !searchOptions[option];
		console.log("after:", searchOptions)
		setSearchOptions(searchOptions);
		return searchOptions[option];
	}

	const toggleShowOptions = () => {
		console.log('toggle show options')
		setShowOptions(!showOptions);
	}

	const optionsMenu = () => {
		const menuArr = [<div key={0}>Options:</div>];
		Object.keys(searchOptions).forEach((option, idx) => {
			menuArr.push(
			<SearchOption key={idx+1} name={option} defaultOption={searchOptions[option]}  func={editSearchOptions}/>
			)
		})
		return menuArr;
	}

	const renderOptions = (showBool) => {
		return showBool ? optionsMenu() : null;
	}

	return (
		<div id="spotify-search-container">
			<div>
				<input id="song-search-input">
				</input>
				<FunctionButton name={"View Search Options"} func={()=>toggleShowOptions()}/>
			</div>
			{renderOptions(showOptions)}
		</div>
	)
}

export default SpotifySearch;