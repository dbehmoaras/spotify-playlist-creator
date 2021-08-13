const expressLogin = require('express');
const authController = require('./../middleware/authController');
const querystring = require('querystring');

const loginRoutes = expressLogin.Router();

const my_client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;


const generateRandomString = (length: number) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};


loginRoutes.get('/',
	authController.requestAuthorization,
	(req, res, next) => {
		// console.log("*** RES", res);
		// console.log(redirect_uri)
		const scopes = 'user-read-private user-read-email';
		const state = generateRandomString(16);
		// res.redirect('https://accounts.spotify.com/authorize' +
		// 	'?response_type=code' +
		// 	'&client_id=' + my_client_id +
		// 	(scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
		// 	'&redirect_uri=' + encodeURIComponent(redirect_uri));
		// console.log(req, res)
		res.redirect('https://accounts/spotify.com/authorize?' +
			querystring.stringify({
				response_type: 'code',
				client_id: my_client_id,
				scope: scopes,
				redirect_uri: redirect_uri,
				state: state,
			})
		)
	}
);

loginRoutes.get('/afterAuth', (req, res, next) => {
	console.log(req, res);
	res.status(200).send({afterAuth: true});
})



module.exports = loginRoutes;