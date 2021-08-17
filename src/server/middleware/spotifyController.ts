import * as express from 'express';
import * as bodyParser from 'body-parser';
const axios = require('axios');

interface spotifyControl {
	apiRequest: Function,
	getPlayingSong: Function,
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
			console.log('***** SONG PLAYING DATA RETRIEVED: *****');
			// console.log(data);
			res.locals.songData = {
				title: data.data.item.name,
				artist: data.data.item.artists[0].name
			};
			console.log(res.locals.songData);
			return next();
		})
		.catch(err => {
			console.log('***** ERR: Error in getPlayingSong');
			console.log(err)
			return next();
		})
	}
}

module.exports = spotifyController;