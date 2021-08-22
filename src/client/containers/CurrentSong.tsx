import React , { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Cookies from 'js-cookie';
import FunctionButton from './../components/FunctionButton'
import serverRoutes from './../constants/serverRoutes';
import { Song } from './../../interfaces/spotifyInterfaces';

declare function require(name: string);
const axios = require('axios');




function CurrentSong (props) {
	const [currentSong, setCurrentSong] = useState([]);
	const [currentAlbum, setCurrentAlbum] = useState({
		url: "",
		width: 0,
		height: 0
	});

	useEffect(() => {
		getPlayingSong().then(song=>{
			console.log('use eff ',song)
			setCurrentSong(song);
		})
	},[])

	const getPlayingSong = async () => {
		const userId = Cookies.get('userId');
		const {SRV_MAIN, SRV_PLAYING_SONG} = serverRoutes;
		const queryString = SRV_PLAYING_SONG + '?user=' + userId;

		return await axios.get(queryString)
		.then(res => {
			console.log('RES',res.data)
			const {data} = res;
			return {
				Title: data.Title,
				Artist: data.Artist,
				Album: data.Album,
				ID: data.ID,
				URI: data.URI,
				ImageObject: {
					height: data.ImageObject.height,
					width: data.ImageObject.width,
					url: data.ImageObject.url,
				}
			}
		})
		.catch(err => {
			console.log(err)
			return null;
		})
	}


	return(
		<div id="current-song-container">
			<h2 id="song-header">
				Current Song:
			</h2>
			<div id="current-song-functions">
				<FunctionButton name={"Add Song"} func={() => console.log("Add Song")}/>
				<FunctionButton id="function-button" name={"Refresh"} func={() =>
					getPlayingSong().then(song=>{
						console.log(song)
						return setCurrentSong(song);
					})} />
				</div>
			{/* <div id="album-image">
				<img src={currentSong ? currentSong.ImageObject.url : ""} height={currentSong ? currentSong.height/3 : 0} width={currentSong ? currentSong.width/3 : 0}></img>
			</div>
			<div id="current-song">
				{

					Object.keys(currentSong).map((ele, idx)=> {
						const styleMap = {
							Title: {fontWeight: 'bold', textDecoration: 'underline'},
							Artist: {fontWeight: 'bold', fontStyle: 'italic'},
							Album: {fontStyle: 'italic'}
						}
						if (!currentSong[ele] && idx === 0)
							return (<div key={idx}>No Song Playing</div>)
						else
							return (<div key={idx}>
								<div id="song-details" style={styleMap[ele]}>{currentSong[ele]}</div>
							</div>)
					})
				}
			</div> */}
		</div>
	)
}

export default CurrentSong;