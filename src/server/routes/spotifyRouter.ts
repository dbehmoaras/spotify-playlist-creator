const expressSpotify = require('express');
const spotifyRoutes = expressSpotify.Router();
const spotifyController = require('./../middleware/spotifyController');
const authControlSpotify = require('./../middleware/authController');

spotifyRoutes.get('/',
	authControlSpotify.getSpotifyTokenFromDB,
	spotifyController.apiRequest,
	(req, res) => {
		res.status(200).json(res.locals.data);
	}
);


spotifyRoutes.get('/playing',
	authControlSpotify.getSpotifyTokenFromDB,
	spotifyController.getPlayingSong,
	(req, res) => {
		console.log(res.locals.songData)
		res.status(200).send(res.locals.songData);
	}
);

spotifyRoutes.get('/playlists',
	authControlSpotify.getSpotifyTokenFromDB,
	spotifyController.getPlaylists,
	(req, res) => {
		res.status(200).send(res.locals.playlistArr);
	}
)

spotifyRoutes.get('/loadPlaylist',
	authControlSpotify.getSpotifyTokenFromDB,
	spotifyController.getSongsFromPlaylist,
	(req, res) => {
		res.status(200).send(res.locals.playlist)
	}
)


module.exports = spotifyRoutes;