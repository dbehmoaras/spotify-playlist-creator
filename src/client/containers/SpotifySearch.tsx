import React, {useState, useEffect, useContext} from "react";
import { Song } from './../../interfaces/spotifyInterfaces';
import FunctionButton from "../components/FunctionButton";
import SmallFunctionButton from './../components/SmallFunctionButton';
import Context from './../context/Context';
import serverRoutes from '../constants/serverRoutes';
// import SearchOption from "../components/SearchOption";

declare function require(name: string);
const axios = require('axios');

const addIcon =
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" id="small-icon" viewBox="0 0 16 16">
  <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm.5 4v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z"/>
</svg>


const songList: Song[] = [];

function SpotifySearch (props) {
	const { globalUserId, activePlaylist, setActivePlaylist } = useContext(Context);
	const [showOptions, setShowOptions] = useState(false);
	const [searchTerm, updateSearchTerm] = useState("");
	const [sendSearch, toggleSendSearch] = useState(false);
	const [songs, setSongs] = useState(songList);
	const [searchOptions, setSearchOptions] = useState({
		Track: true,
	})
	const addTrackQString = serverRoutes.SRV_ADD_TRACK + '?user=' + globalUserId;

	useEffect(() => {
		if(searchTerm){
			submitSearch().then(list => {
				setSongs(list);
			})
		}
	},[sendSearch])

	const inputUpdate = (event) => {
		updateSearchTerm(event.target.value)
	}

	const submitSearch = async () => {
		const searchObj = {
			searchTerm,
			searchOptions,
		}
		const searchQString = serverRoutes.SRV_SEARCH + '?user=' + globalUserId + '&q=' + searchObj.searchTerm + '&type=track';


		return await axios.get(searchQString)
		.then(res => {
			return res.data.TrackList;
		})
		.catch(err => {
			console.log(err.response.data);
			return;
		})
	}

	const addSong = async(addBody) => {
		console.log()
		return await axios.post(addTrackQString, addBody)
		.then(res => {
			const triggerActivePlaylist = Object.assign("",activePlaylist);
			setActivePlaylist(triggerActivePlaylist);
		})
	}

	const renderResults = () => {
		if (songs){
			return songs.map((ele, idx) => {
				return (
					<div key={idx} id="song-in-list-container">
						<div id="song-in-list">
							<span id="song-span" style={{fontWeight: 550}}>{ele.Title}</span>
							<span id="song-span" style={{fontStyle: 'italic'}}>{ele.Artist}</span>
						</div>
						<SmallFunctionButton name={{playlistId: activePlaylist.id, playlistName: activePlaylist.name, uris: [ele.URI]}} func={addSong} icon={addIcon}/>
					</div>
				)
			})
		} else return (
			<div key={0} id="song-in-list-container">
				<div id="song-in-list">
					<span id="song-span" style={{fontWeight: 550}}>No query!</span>
					<span id="song-span" style={{fontStyle: 'italic'}}>Please enter a search query.</span>
				</div>
			</div>
		)
	}

	return (
		<div id="spotify-search-container">
			<div id="spotify-search-box">
				<div id="input-field-container">
					<input id="input-field" onChange={inputUpdate}>
					</input>
				</div>
				<div id="search-button-container">
					<FunctionButton name={"Search Tracks"} func={()=>
						submitSearch().then(list => {
							setSongs(list);
							toggleSendSearch(!sendSearch)
						})
					}/>
					{/* <FunctionButton name={"View Search Options"} func={()=>toggleShowOptions()}/> */}
				</div>
			</div>
			<div id="search-results">
				<span style={{fontWeight: 550, textDecoration: 'underline'}}>Search Results:</span>
				{renderResults()}
			</div>
		</div>
	)
}

export default SpotifySearch;



	/**
		DEV NOTE:
		The code below includes logic to handle additional search parameters however the back-end does not support this feature yet.

		const [searchOptions, setSearchOptions] = useState({
			Track: true,
			// Album: false,
			// Artist: true,
			// Playlist: false,
			// Show: false,
			// Episode: false
		})

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