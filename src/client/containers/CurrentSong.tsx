import React , { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Cookies from 'js-cookie';


import FunctionButton from './../components/FunctionButton'
// import {}
import serverRoutes from './../constants/serverRoutes';



declare function require(name: string);
const axios = require('axios');



interface Song {
	Title: string,
	Artist: string,
	Album: string
}

interface AlbumCover {
	ImageObj: Object
}


const getPlayingSong = async () => {
	const userId = Cookies.get('userId');
	const {SRV_MAIN, SRV_PLAYING_SONG} = serverRoutes;
	const queryString = SRV_MAIN + SRV_PLAYING_SONG + '?user=' + userId;

	const song:Song = {
		Title: "",
		Artist: "",
		Album: ""
	};
	const albumCover:AlbumCover = {
		ImageObj: {}
	};

	return await axios.get(queryString)
	.then(res => {
		song.Title = res.data.Title;
		song.Artist = res.data.Artist;
		song.Album = res.data.Album;
		albumCover.ImageObj = res.data.ImageObject;
		return [song, albumCover];
	})
	.catch(err => {
		console.log(err)
		return null;
	})
}

function CurrentSong (props) {
	const [currentSong, setCurrentSong] = useState([]);
	const [currentAlbum, setCurrentAlbum] = useState({
		url: "",
		width: 0,
		height: 0
	});

	useEffect(() => {
		getPlayingSong().then(song=>{
			setCurrentSong(song[0]);
			setCurrentAlbum(song[1].ImageObj)
		})
	},[])

	return(
		<div id="current-song-container">
			<h2 id="song-header">
				Current Song:
			</h2>
			<div id="current-song-functions">
				<FunctionButton name={"Add Song"} func={() => console.log("Add Song")}/>
				<FunctionButton id="function-button" name={"Refresh"} func={() =>
					getPlayingSong().then(song=>{
						setCurrentSong(song[0]);
						setCurrentAlbum(song[1].ImageObj)
					})} />
				</div>
			<div id="album-image">
				<img src={currentAlbum ? currentAlbum.url : ""} height={currentAlbum ? currentAlbum.height/3 : 0} width={currentAlbum ? currentAlbum.width/3 : 0}></img>
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
			</div>
		</div>
	)
}

export default CurrentSong;