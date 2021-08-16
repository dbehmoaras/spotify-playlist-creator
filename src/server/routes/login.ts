const expressLogin = require('express');
// const authController = require('./../middleware/authController');
const querystring = require('querystring');
require('dotenv').config();
const loginRoutes = expressLogin.Router();

// console.log(process.env.SPOTIFY_CALLBACK_URI)
// const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
// const spotifyCallbackURI = process.env.SPOTIFY_CALLBACK_URI;
// const scopes = 'user-read-email user-top-read user-read-recently-played user-follow-modify user-read-currently-playing user-library-read';

// loginRoutes.get('/', (req, res) => {
//   res.redirect('https://accounts.spotify.com/authorize' +
//     '?response_type=code' +
//     '&client_id=' + spotifyClientId +
//     (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
//     '&redirect_uri=' + encodeURIComponent(spotifyCallbackURI));
// });

// loginRoutes.get('/callback',
//   authController.getAuthToken,
//   authController.getUserInfo,
//   // settingsController.createInitialSettings,
//   (req, res) => {
// 		console.log("HERE")
// 		console.log(res.locals.username, 'Successfully Authorized in DB');
// 		// const profileUrl = appRootDomain + '/profile/' + res.locals.username;
// 		const profileUrl = process.env.SPOTIFY_REDIRECT_URI;
// 		res.redirect(profileUrl);
// })


module.exports = loginRoutes;