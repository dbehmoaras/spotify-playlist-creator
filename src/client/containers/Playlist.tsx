import React, { useContext, useEffect, useState } from 'react';
import FunctionButton from '../components/FunctionButton';
import SmallFunctionButton from './../components/SmallFunctionButton'
import serverRoutes from '../constants/serverRoutes';
import Context from './../context/Context';

declare function require(name: string);
const axios = require('axios');

const removeIcon =
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" id="small-icon" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M3.112 5.112a3.125 3.125 0 0 0-.17.613C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13H11L3.112 5.112zm11.372 7.372L4.937 2.937A5.512 5.512 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773a3.2 3.2 0 0 1-1.516 2.711zm-.838 1.87-12-12 .708-.708 12 12-.707.707z"/>
</svg>


function Playlist (props) {

	const [songs, setSongs] = useState([])
	const {globalUserId, activePlaylist} = useContext(Context);
	const loadPlaylistQString = serverRoutes.SRV_LOAD_PLAYLIST + '?user='	+ globalUserId + '&playlistId='	+ activePlaylist.id;
	const removeTrackQString = serverRoutes.SRV_REMOVE_TRACK + '?user='	+ globalUserId ;

	useEffect(() => {
		if(activePlaylist){
			loadPlaylist().then(list => {
				setSongs(list.TrackList);
			})
		}
	},[activePlaylist])

	const loadPlaylist = async () => {
		return await axios.get(loadPlaylistQString)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			console.log(err.response.data)
			return;
		})
	}

	const deleteSong = async(deleteBody) => {
		return await axios.delete(removeTrackQString, {data: deleteBody})
		.then(res=> {
			console.log(res);
			loadPlaylist().then(list => {
				setSongs(list.TrackList);
			})
		})
		.catch(err => {
			console.log(err.response.data)
		})
	}

	const renderPlaylist = () => {
		if (songs){
			return songs.map((ele, idx) => {
				return (
				<div key={idx} id="song-in-list-container">
					<div id="song-in-list">
						<span id="song-span" style={{fontWeight: 550}}>{ele.Title}</span>
						<span id="song-span" style={{fontStyle: 'italic'}}>{ele.Artist}</span>
					</div>
					<SmallFunctionButton name={{playlistId: activePlaylist.id, uris: [ele.URI]}} func={deleteSong} icon={removeIcon}/>
				</div>)
			})
		}	else return (
			<div key={0} id="song-in-list-container">
				<div id="song-in-list">
					<span id="song-span" style={{fontWeight: 550}}>No active playlist!</span>
					<span id="song-span" style={{fontStyle: 'italic'}}>Please select a playlist from the component on the left.</span>
				</div>
			</div>
		)
	}

	return(
		<div id="playlist-container">
			<FunctionButton id="function-button" name={"Refresh"} func={() =>
				loadPlaylist().then(list => {
					setSongs(list.TrackList);
				})
			} />
			<div id="playlist">
				<span style={{fontWeight: 550, textDecoration: 'underline'}}>Playlist:</span>
				{renderPlaylist()}
			</div>
		</div>
	)
}

export default Playlist;