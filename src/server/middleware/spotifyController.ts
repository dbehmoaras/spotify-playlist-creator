import * as express from 'express';
import * as bodyParser from 'body-parser';
const axios = require('axios');

import {SpotifyControl, Song, PlaylistArrInterface, PlaylistInterface} from './../interfaces/spotifyInterfaces';



const spotifyController: SpotifyControl = {
	apiRequest: (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		axios.get(res.locals.apiHref, {
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
				'Authorization' : `Bearer ${res.locals.authToken}`
			}
		})
		.then(data => {
			res.locals.data = data.data;
			return next();
		})
		.catch(err => {
			console.log(err);
			return next();
		})
	},

	getPlayingSong: (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		const playingSongURI = 'https://api.spotify.com/v1/me/player/currently-playing';
		axios.get(playingSongURI, {
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
				'Authorization' : `Bearer ${res.locals.authToken}`
			}
		})
		.then(response => {
			if (!response.data) {
				console.log('*** NO SONG PLAYING, RETURN FALSE ***');
				return next();
			}

			const currentSongData:Song = {
				Title: response.data.item.name,
				Artist: response.data.item.artists[0].name,
				Album: response.data.item.album.name,
				ID: response.data.item.id,
				URI: response.data.item.uri,
				ImageObject: response.data.item.album.images[0]
			}

			res.locals.songData = currentSongData;
			console.log('***** CURRENT SONG DATA RETRIEVED *****');
			return next();
		})
		.catch(err => {
			console.log('***** ERR: Error in getPlayingSong');
			console.log(err)
			return next();
		})
	},

	getPlaylists: (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		const playlistsURI = 'https://api.spotify.com/v1/me/playlists';
		axios.get(playlistsURI, {
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
				'Authorization' : `Bearer ${res.locals.authToken}`
			}
		})
		.then(response => {
			let playlists:PlaylistArrInterface[] = [];
			response.data.items.forEach(ele => {
				const playlistObj = {
					name: ele.name,
					url: ele.href,
					id: ele.id
				}
				playlists.push(playlistObj);
			})
			res.locals.playlistArr = playlists;
			return next();
		})
		.catch(err => {
			console.log(err);
			return next();
		})
	},

	getSongsFromPlaylist: (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		const playlistId = req.query.playlistId;
		const getSongsFromPlaylistURI = 'https://api.spotify.com/v1/playlists/' + playlistId;

		console.log('*****playlistId', playlistId)

		axios.get(getSongsFromPlaylistURI, {
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
				'Authorization' : `Bearer ${res.locals.authToken}`
			}
		})
		.then(response => {
			console.log(response.data);
			// res.locals.playlistData = response.data;

			const pData = response.data;
			const {items} = pData.tracks;

			const playlist:PlaylistInterface = {
				Name: pData.name,
				URI: pData.uri,
				ID: pData.id,
				TrackList: [],
			}

			items.forEach((ele, idx) => {
				const {track} = ele;
				playlist.TrackList.push({
					Title: track.name,
					Artist: track.artists[0].name,
					Album: track.album.name,
					ID: track.id,
					URI: track.uri,
					ImageObject: track.album.images[0],
				});
			})

			res.locals.playlist = playlist;
			return next();
		})
		.catch(err => {
			console.log('Error in getSongsFromPlaylist');
			console.log(err);
			return next();
		})
	},

	searchForItem: (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		console.log('here');
		const {query} = req;
		// console.log(query);
		const searchStringURI = 'https://api.spotify.com/v1/search?q='+
			encodeURIComponent(query.q.toString())
			+ '&type=' +
			encodeURIComponent(query.type.toString());
		console.log(searchStringURI);


		//need to write the reducer

		axios.get(searchStringURI, {
			headers: {
				'Accept': 'application/json',
				'Content-Type' : 'application/json',
				'Authorization' : `Bearer ${res.locals.authToken}`
			}
		})
		.then(response => {
			console.log('***** SEARCH response',response.data)
			console.log('items object:', response.data.tracks.items);
			return next();
		})
		.catch(err => {
			console.log('***** ERR in searchForItem');
			console.error(err);
			return next();
		})
	}
}

module.exports = spotifyController;