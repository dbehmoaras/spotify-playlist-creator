require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const authController = require('./middleware/authController')
const port = process.env.SERVER_PORT;

const app = express();

const scopes = 'user-read-email user-top-read user-read-recently-played user-follow-modify user-read-currently-playing user-library-read';
const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyCallbackURI = process.env.SPOTIFY_CALLBACK_URI;
const spotifyRedirectURI = process.env.SPOTIFY_REDIRECT_URI;

app.use('/assets', express.static(path.join(__dirname, './../assets/')));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
  console.log('*** serving root of landing page ( / )');
  res.sendFile(path.resolve(__dirname + './../index.html'))
})

//test route
app.get('/test', (req, res) =>{
  console.log('***** REACHED TEST ENDPOINT *****');
  return res.status(200).send({test:true});
})

app.get('/login', (req, res) => {
  console.log("in login")
  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + spotifyClientId +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(spotifyCallbackURI));
});

app.get('/callback',
  authController.getAuthToken,
  authController.getUserInfo,
  // settingsController.createInitialSettings,
  (req, res) => {
		console.log("HERE")
		console.log(res.locals.username, 'Successfully Authorized in DB');
		// const profileUrl = appRootDomain + '/profile/' + res.locals.username;
		// const profileUrl = process.env.SPOTIFY_REDIRECT_URI;
		res.redirect(spotifyRedirectURI);
})

//Global 404 handler
app.use('*', (req, res) => {
  return res.status(404).send('********** GLOBAL BAD REQUEST / 404 ERROR **********');
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});