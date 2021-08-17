import React , { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Cookies from 'js-cookie';

declare function require(name: string);
const axios = require('axios');

import serverRoutes from './../constants/serverRoutes';


interface Song {
	Title: string,
	Artist: string,
}


const songList: Song[] =
[
	{
		"Title": "The Kids Aren't Alright",
		"Artist": "The Offspring",
	},
	{
		"Title": "Chan Chan",
		"Artist": "Buena Vista Social Club"
	}
];

const getPlayingSong = async () => {
	const userId = Cookies.get('userId');
	const {SRV_MAIN, SRV_PLAYING_SONG} = serverRoutes;
	const queryString = SRV_MAIN + SRV_PLAYING_SONG + '?user=' + userId;

	let song:Song = {
		Title:"",
		Artist: ""
	};
	return await axios.get(queryString)
	.then(res => {
		song.Title = res.data.title;
		song.Artist = res.data.artist;
		return song;
	})
	.catch(err => {
		console.log(err)
		return null;
	})
}

function CurrentSong (props) {
	getPlayingSong();
	const [currentSong, setCurrentSong] = useState([])

	useEffect(() => {
		getPlayingSong().then(song=>{
			setCurrentSong(song);
		})
	},[])

	return(
		<div id="current-song-container">
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