import React, { useContext, useEffect, useState } from "react";
import SmallFunctionButton from "../components/SmallFunctionButton";
import Context from './../context/Context';
import serverRoutes from './../constants/serverRoutes';
import { PlaylistArrInterface } from './../../interfaces/spotifyInterfaces';
import FunctionButton from "../components/FunctionButton";

declare function require(name: string);
const axios = require('axios');

const gearIcon =
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" id="small-icon" viewBox="0 0 16 16">
  <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
</svg>;

function UserPlaylists (props) {

	const [newPlaylist, setNewPlaylist] = useState("");
	const [playlists, setPlaylists] = useState([]);
	const {globalUserId} = useContext(Context);
	const {activePlaylist, setActivePlaylist} = useContext(Context);

	useEffect(() => {
		getPlaylists().then(list => {
			setPlaylists(list);
		})
	},[])

	const inputUpdate = (event) => {
		setNewPlaylist(event.target.value);
	}

	const getPlaylists = async () => {
		return await axios.get(serverRoutes.SRV_GET_PLAYLISTS
			+ '?user='
			+ globalUserId)
		.then(res => {
			const updatePlaylists = [];

			res.data.forEach((playlist, idx) => {
				updatePlaylists.push(
					<div key={idx} id="list-label-container">
						<span id="list-label">{playlist.name}</span>
						<SmallFunctionButton name={{id: playlist.id, name:playlist.name}} func={clickToSelectPlaylist}icon={gearIcon}/>
					</div>
				)
			})
			return updatePlaylists;
		})
		.catch(err => {
			console.log(err)
			return;
		})
	}

	const renderPlaylists = () => {
		return playlists;
	}

	const clickToSelectPlaylist = (id) => {
		setActivePlaylist(id);
	}




	return(
		<div id="user-playlists">
			<div id="user-playlist-header">
				User's Playlists:
			</div>
			<div id="spotify-search-box">
				<div id="input-field-container">
					<input id="input-field" onChange={inputUpdate}>
					</input>
				</div>
				<div id="search-button-container">
					<FunctionButton name={"AddPlaylist"} func={()=>
						// submitSearch().then(list => {
						// 	setSongs(list);
						// 	toggleSendSearch(!sendSearch)
						// })
						console.log("*** ADD PLAYLIST ***")
					}/>
					{/* <FunctionButton name={"View Search Options"} func={()=>toggleShowOptions()}/> */}
				</div>
			</div>
			<div id="list-container">
				{playlists}
			</div>
		</div>
	)
}

export default UserPlaylists;