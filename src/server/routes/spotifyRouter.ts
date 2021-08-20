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
		if (res.locals.songData)
			res.status(200).send(res.locals.songData);
		else
			res.status(200).send(false);
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

spotifyRoutes.get('/searchForItem',
	authControlSpotify.getSpotifyTokenFromDB,
	spotifyController.searchForItem,
	(req, res) => {
		res.status(200).send(res.locals.searchResults)
	}
)



module.exports = spotifyRoutes;