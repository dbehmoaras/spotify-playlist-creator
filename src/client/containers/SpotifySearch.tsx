import React, {useState, useEffect} from "react";

import FunctionButton from "../components/FunctionButton";
import SearchOption from "../components/SearchOption";






function SpotifySearch (props) {
	const [showOptions, setShowOptions] = useState(false);
	const [searchOptions, setSearchOptions] = useState({
		album: false,
		artist: true,
		playlist: false,
		track: true,
		show: false,
		episode: false
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
	}

	const toggleShowOptions = () => {
		console.log('toggle show options')
		setShowOptions(!showOptions);
	}

	const optionsMenu = () => {
		const menuArr = [];
		Object.keys(searchOptions).forEach((option, idx) => {
			menuArr.push(
			<SearchOption key={idx} name={option} include={searchOptions[option]}  func={editSearchOptions}/>
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
			Options:
			{renderOptions(showOptions)}
		</div>
	)
}

export default SpotifySearch;