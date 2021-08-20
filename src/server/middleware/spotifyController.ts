import * as express from 'express';
import * as bodyParser from 'body-parser';
const axios = require('axios');

import {SpotifyControl, Song, PlaylistArrInterface, PlaylistInterface, SearchResults} from '../../interfaces/spotifyInterfaces';



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
			console.log('***** apiRequest');
			console.log(err.response.data);
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
			console.log(err.response.data)
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
			console.log('***** ERR in getPlaylists');
			console.log(err.response.data);
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


		axios.get(getSongsFromPlaylistURI, {
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
				'Authorization' : `Bearer ${res.locals.authToken}`
			}
		})
		.then(response => {
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
			console.log('***** ERR in getSongsFromPlaylist');
			console.log(err.response.data);
			return next();
		})
	},

	searchForItem: (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		const {query} = req;
		const searchStringURI = 'https://api.spotify.com/v1/search?q='+
			encodeURIComponent(query.q.toString())
			+ '&type=' +
			encodeURIComponent(query.type.toString())
			+ '&limit=10';

		axios.get(searchStringURI, {
			headers: {
				'Accept': 'application/json',
				'Content-Type' : 'application/json',
				'Authorization' : `Bearer ${res.locals.authToken}`
			}
		})
		.then(response => {

			const {items} = response.data.tracks;
			const searchResults:SearchResults = {
				Name: 'searchResults',
				TrackList: []
			}

			items.forEach((track, idx) => {
				searchResults.TrackList.push({
					Title: track.name,
					Artist: track.artists[0].name,
					Album: track.album.name,
					ID: track.id,
					URI: track.uri,
					ImageObject: track.album.images[0],
				});
			})

			res.locals.searchResults = searchResults;
			return next();
		})
		.catch(err => {
			console.log('***** ERR in searchForItem');
			console.error(err.response.data);
			return next();
		})
	},

	addTrack: (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		// const {query} = req;
		const {body} = req;
		const addTrackStringURI = 'https://api.spotify.com/v1/playlists/'
			+ encodeURIComponent(body.playlistId) +
			'/tracks';
		const addTrackBody = {
			uris: body.uris,
		}

		axios.post(addTrackStringURI,addTrackBody, {
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
				'Authorization' : `Bearer ${res.locals.authToken}`
			}
		})
		.then(response => {
			res.locals.response = response;
			return next();
		})
		.catch(err => {
			console.log('***** ERR in addTrack');
			console.log(err.response.data)
			return next();
		})
	},

	removeTrack: (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		// const {query} = req;
		const {body} = req;
		const removeTrackStringURI = 'https://api.spotify.com/v1/playlists/'
			+ encodeURIComponent(body.playlistId) +
			'/tracks';
		const removeTrackBody = {
			tracks: [
				{
					uri: body.uris[0],
				}
			],
		}

		axios.delete(removeTrackStringURI, {
			data: removeTrackBody,
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
				'Authorization' : `Bearer ${res.locals.authToken}`
			}
		})
		.then(response => {
			res.locals.response = response;
			return next();
		})
		.catch(err => {
			console.log('***** ERR in addTrack');
			console.log(err.response.data)
			return next();
		})
	}
}


module.exports = spotifyController;