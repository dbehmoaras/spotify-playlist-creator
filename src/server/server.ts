require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

const authController = require('./middleware/authController');
const spotifyRouter = require('./routes/spotifyRouter');

const port = process.env.SERVER_PORT;
const scopes = 'user-read-email user-top-read user-read-recently-played user-follow-modify user-read-currently-playing user-library-read';
const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyCallbackURI = process.env.SPOTIFY_CALLBACK_URI;
const spotifyRedirectURI = process.env.SPOTIFY_REDIRECT_URI;



app.use('/assets', express.static(path.join(__dirname, './../assets/')));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cors());
app.use(cookieParser());

app.use('/spotify', spotifyRouter);


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
  authController.setCookie,
  (req, res) => {
		console.log("HERE")
		console.log(res.locals.username, 'Successfully Authorized in DB');
		res.redirect(spotifyRedirectURI);
})

app.get('/home', (req, res) => {
  return res.status(302).send("IT's pointing to the back-end home.");
})

//Global 404 handler
app.use('*', (req, res) => {
  return res.status(404).send('********** GLOBAL BAD REQUEST / 404 ERROR **********');
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});