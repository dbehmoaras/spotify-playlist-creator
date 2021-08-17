import React , { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Cookies from 'js-cookie';

declare function require(name: string);
const axios = require('axios');

import serverRoutes from './../constants/serverRoutes';


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

	let song:Song = {
		Title: "",
		Artist: "",
		Album: ""
	};
	let albumCover:AlbumCover = {
		ImageObj: {}
	};
	return await axios.get(queryString)
	.then(res => {
		song.Title = res.data.currentSong.Title;
		song.Artist = res.data.currentSong.Artist;
		song.Album = res.data.currentSong.Album;
		albumCover.ImageObj = res.data.currentSong.ImageObject;
		return [song, albumCover];
	})
	.catch(err => {
		console.log(err)
		return null;
	})
}

function CurrentSong (props) {
	getPlayingSong();
	const [currentSong, setCurrentSong] = useState([]);
	const [currentAlbum, setCurrentAlbum] = useState({
		url: "",
		width: 0,
		height: 0
	});

	useEffect(() => {
		getPlayingSong().then(song=>{
			console.log("retrieved song:",song[0])
			setCurrentSong(song[0]);
			console.log("retrieved album cover", song[1].ImageObj)
			setCurrentAlbum(song[1].ImageObj)
		})
	},[])

	return(
		<div id="current-song-container">
			{/* <img src={albumCover.ImageObj.url}></img> */}
			<div id="album-image">
				{/* {if(currentAlbum)} */}
				<img src={currentAlbum ? currentAlbum.url : ""} height={currentAlbum ? currentAlbum.height/2 : 0} width={currentAlbum ? currentAlbum.width/2 : 0}></img>
			</div>
			<div id="current-song">
				{Object.keys(currentSong).map((ele, idx)=> {
					return (<div key={idx}>
						<span>{currentSong[ele]}</span>
					</div>)
				})}
			</div>
		</div>
	)
}

export default CurrentSong;