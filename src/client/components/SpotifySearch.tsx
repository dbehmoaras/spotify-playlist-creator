import React, {useState, useEffect} from "react";


const SearchOptionsMap = {
	album: false,
	artist: true,
	playlist: false,
	track: true,
	show: false,
	episode: false
}


function SpotifySearch (props) {
	const [viewOptions, toggleViewOptions] = useState(false);
	const [searchOption, setSearchOption] = useState(SearchOptionsMap)

	return (
		<div id="song-search-container">
			<input id="song-search-input">
			</input>
			{if (viewOptions)}
		</div>
	)
}