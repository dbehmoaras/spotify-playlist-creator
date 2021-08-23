// const authorizationController = {};

import * as express from 'express';
import * as bodyParser from 'body-parser'
const axios = require('axios');
const db = require('./../database/pgPool');
require('dotenv').config();


const spotifyCallbackURI = process.env.SPOTIFY_CALLBACK_URI;
const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifySecret = process.env.SPOTIFY_CLIENT_SECRET;


interface authControl {
	getAuthToken: Function,
	getUserInfo: Function,
	getSpotifyTokenFromDB: Function,
	setCookie: Function,
}

const authorizationController: authControl = {

	getAuthToken: (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		const codeString = req.query.code.toString();
		axios.post('https://accounts.spotify.com/api/token' +
			'?grant_type=authorization_code' +
			'&code=' + encodeURIComponent(codeString) +
			'&redirect_uri=' + encodeURIComponent(spotifyCallbackURI) +
			'&client_id=' + encodeURIComponent(spotifyClientId) +
			'&client_secret=' + encodeURIComponent(spotifySecret),
			null,
			{ headers:
				{ 'Content-Type' : 'application/x-www-form-urlencoded'},
			}
		)
		.then(data => data.data)
		.then(d => {
			res.locals.accessData = {
				accessToken: d.access_token,
				tokenType: d.token_type,
				scope: d.scope,
				expiresIn: d.expires_in,
				refreshToken: d.refresh_token
			}
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

		axios.get('https://api.spotify.com/v1/me',{
			headers: {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json',
				'Authorization' : `Bearer ${res.locals.accessData.accessToken}`
			}
		})
		.then(data => data.data)
		.then(async user => {

			res.locals.username = user.display_name;
			res.locals.userId = user.id;

			const {accessData} = res.locals;

			const updateParams = [
				accessData.accessToken,
				accessData.tokenType,
				accessData.scope,
				accessData.expiresIn,
				accessData.refreshToken,
				user.id,
				user.display_name,
				user.email,
				user.external_urls.spotify,
				user.href,
				user.uri,
				Math.floor(Date.now() / 1000),
			];

			const checkUserQueryParams = [user.id];
			const checkUserQueryString = 'SELECT * FROM users WHERE username=$1;';
			const result = await db.query(checkUserQueryString, checkUserQueryParams);

			let comboQuery: string;
			if (result.rows.length !== 0) {
				comboQuery = `UPDATE users SET access_token = $1, token_type = $2, scope = $3, token_life_seconds = $4, refresh_token = $5, display_name = $7, email = $8, spotify_url = $9, api_href = $10, uri = $11, token_set_time = $12 WHERE username = $6;`
			}	else {
				comboQuery = `INSERT INTO users (access_token, token_type, scope, token_life_seconds, refresh_token, username, display_name, email, spotify_url, api_href, uri, token_set_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`
			};

			return db.query(comboQuery,updateParams);//updateParams)
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


		const queryParams = [req.query.user]
		const query = `SELECT access_token, refresh_token, token_life_seconds, token_set_time, spotify_url, api_href
		FROM users WHERE username = $1`

		return db.query(query, queryParams)
		.then(data => {
			const { access_token, refresh_token, token_life_seconds, token_set_time, spotify_url, api_href} = data.rows[0]
			const timeNow = ~~(Date.now() / 1000)
			if (token_set_time + token_life_seconds < timeNow){
				res.locals.refreshToken = refresh_token;
				authorizationController.getAuthToken(req, res, next);
			}
			else {
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
	},

	setCookie: (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		res.cookie('userId', res.locals.userId, {httpOnly: false, maxAge: 86400000});
		res.cookie('userName', res.locals.username, {httpOnly: false, maxAge: 86400000})
		return next();
	}

};

module.exports = authorizationController;