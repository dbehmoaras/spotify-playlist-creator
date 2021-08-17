import * as express from 'express';
import * as bodyParser from 'body-parser';
const axios = require('axios');

interface spotifyControl {
	apiRequest: Function,
	getPlayingSong: Function,
	getPlaylists: Function
}

interface PlaylistInterface {
	name: string,
	url: string
}

const spotifyController: spotifyControl = {
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
		.then(data => {
			res.locals.songData = {
				title: data.data.item.name,
				artist: data.data.item.artists[0].name,
				album: data.data.item.album.name,
				imageObject: data.data.item.album.images[0]
			};
			console.log('***** CURRENT SONG DATA RETRIEVED: *****');
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
			let playlists:PlaylistInterface[] = [];
			response.data.items.forEach(ele => {
				const playlistObj = {
					name: ele.name,
					url: ele.href
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

	// getSongsFromPlaylist(
	// 	req: express.Request,
	// 	res: express.Response,
	// 	next: express.NextFunction
	// ) => {

	// }

}

module.exports = spotifyController;