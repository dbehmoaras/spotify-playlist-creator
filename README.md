# Spotify Playlist Creator

## Getting Started:

1. Create API credentials for Spotify and PostgreSQL

	- Navigate to your Spotify Developer Dashboard and create the **App** "spotify-playlist-creator". Save the Client ID and the Client Secret for Step 2. Add your Spotify credentials in the Users and Access tab of the **App** you just created in your dashboard to grant your account with permission to access the **App**.
	- Navigate to ElephantSQL and follow the steps to create an account and then create a new database instance. Once the instance is created, save the revealed URL for the next step.

	---
2. Create a .env file in the root directory with the following information:
	```js
	SERVER_PORT=3001
	DEV_PORT=9001
	NODE_ENV=development
	SPOTIFY_REDIRECT_URI=http://localhost:9001/
	SPOTIFY_CALLBACK_URI=http://localhost:3001/callback
	SPOTIFY_CLIENT_ID=<PROVIDED_BY_SPOTIFY>
	SPOTIFY_CLIENT_SECRET=<PROVIDED_BY_SPOTIFY>
	PG_URI=<PROVIDED_BY_POSTGRES>
	```
	---

3. Run the following command to install dependencies:
	```
	npm install
	```
	---

4. Run the following command to run the webapp in development mode:
   ```
   npm run dev
   ```
	---

5. Open your browser, navigate to the link below, and log in with your Spotify account to use the app:
	```html
	http://localhost:9001/
	```
___