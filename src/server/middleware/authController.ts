// const authorizationController = {};

import * as express from 'express';
import * as bodyParser from 'body-parser'
const axios = require('axios');
const db = require('./../database/pgPool');
require('dotenv').config();
// console.log("PROCESS", process.env);

const spotifyCallbackURI = process.env.SPOTIFY_CALLBACK_URI;
const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifySecret = process.env.SPOTIFY_SECRET;


interface authControl {
	requestAuthorization: Function,
	getAuthToken: Function,
	getUserInfo: Function,
	getSpotifyTokenFromDB: Function,
}

const authorizationController: authControl = {

	requestAuthorization: (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		console.log('***** authController.requestAuthorization');
		return next();
	},

	getAuthToken: (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		console.log("here")
		console.log(req.query.code)
		axios.post('https://accounts.spotify.com/api/token' +
			'?grant_type=authorization_code' +
			'&code=' + encodeURIComponent(req.query.code.toString()) +
			'&redirect_uri=' + encodeURIComponent(spotifyCallbackURI) +
			'&client_id=' + encodeURIComponent(spotifyClientId) +
			'&client_secret=' + encodeURIComponent(spotifySecret),null,
			{ headers:
					{ 'Content-Type' : 'application/x-www-form-urlencoded'},
			}
		)
		.then(data => data.data)
		.then(d => {
			console.log('STEP 1:',d);
			const accessParams = [d.access_token, d.token_type, d.scope, d.expires_in, d.refresh_token];
			const accessQuery = `INSERT INTO users
			(access_token, token_type, scope, token_life_seconds, refresh_token)
			VALUES ($1, $2, $3, $4, $5)
			RETURNING id, access_token;`;
			return db.query(accessQuery, accessParams)
		})
		.then(queryResult =>{
			res.locals.userId = queryResult.rows[0].id;
			res.locals.authToken = queryResult.rows[0].access_token
			console.log(res.locals);
			return next();
		})
		.catch(err => next({
			message: {err: 'error in authController.getAuthToken'},
			log: `error in authController.getAuthToken ERROR: ${err}`
		}))
	},

	getUserInfo: (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		console.log('getting user info');

		axios.get('https://api.spotify.com/v1/me',{
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
				'Authorization' : `Bearer ${res.locals.authToken}`
			}
		})
		.then(data => data.data)
		.then(u => {
			console.log('STEP 2:',u);
			res.locals.username = u.id;
			const updateParams = [u.id, u.display_name, u.email, u.external_urls.spotify, u.href, u.uri, res.locals.userId];
			const updateQuery = `UPDATE users
			SET username = $1, display_name = $2, email = $3, spotify_url = $4,
			api_href = $5, uri = $6, token_set_time = ${~~(Date.now() / 1000)}
			WHERE id = $7
			RETURNING *;`;

			return db.query(updateQuery,updateParams)
		})
		.then(() => next())
		.catch(err => next({
			message: {err: 'error in authController.getUserInfo'},
			log: `error in authController.getUserInfo ERROR: ${err}`
		}))
	},

	getSpotifyTokenFromDB: (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		console.log("req.query.user",req.query.user);
		const queryParams = [req.query.user]
		const query = `SELECT access_token, refresh_token, token_life_seconds, token_set_time, spotify_url, api_href
		FROM users WHERE username = $1`

		return db.query(query, queryParams)
			.then(data => {
				const { access_token, refresh_token, token_life_seconds, token_set_time, spotify_url, api_href} = data.rows[0]
				const timeNow = ~~(Date.now() / 1000)
				if (token_set_time + token_life_seconds < timeNow){
					console.log("path A")
					res.locals.refreshToken = refresh_token;
					authController.getAuthToken(req, res, next);
				}
				else {
					console.log("path B")
					res.locals.authToken = access_token;
					res.locals.spotifyURL = spotify_url;
					res.locals.apiHref = api_href;
					next();
				}
			})
			.catch(err => next({
				message: {err: 'error in authController.getSpotifyTokenFromDB'},
				log: `error in authController.getSpotifyTokenFromDB ERROR: ${err}`
			}))
	}

};







module.exports = authorizationController;