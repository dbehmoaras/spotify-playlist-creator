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
		renderOptions(searchOptions)
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

	return (
		<div id="spotify-search-container">
			<div id="spotify-search-box">
				<div id="input-field-container">
					<input id="input-field">
					</input>
				</div>
				<div id="search-button-container">
					<FunctionButton name={"Search"} func={()=>toggleShowOptions()}/>
					<FunctionButton name={"View Search Options"} func={()=>toggleShowOptions()}/>
				</div>
			</div>
			<div id="options-container">
				{renderOptions(showOptions)}
			</div>
		</div>
	)
}

export default SpotifySearch;