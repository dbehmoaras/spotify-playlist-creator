const expressLogin = require('express');
const authController = require('./../middleware/authController');

const loginRoutes = expressLogin.Router();

const my_client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

// console.log(authController.requestAuthorization)
// const auth = new authController()


loginRoutes.get('/',
	authController.requestAuthorization,
	(req, res) => {
  // console.log('***** REQ:\n',req);
  // console.log('***** RES:\n',res);
		var scopes = 'user-read-private user-read-email';
		res.redirect('https://accounts.spotify.com/authorize' +
			'?response_type=code' +
			'&client_id=' + my_client_id +
			(scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
			'&redirect_uri=' + encodeURIComponent(redirect_uri));
	}
);


module.exports = loginRoutes;