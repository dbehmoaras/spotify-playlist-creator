

export interface SpotifyControl {
	apiRequest: Function,
	getPlayingSong: Function,
	getPlaylists: Function,
	getSongsFromPlaylist: Function,
	searchForItem: Function,
}

export interface Song {
	Title: string,
	Artist: string,
	Album: string,
	ID: string,
	URI: string
	ImageObject: object
}

export interface PlaylistArrInterface {
	name: string,
	url: string,
	id: string,
}

export interface PlaylistInterface {
	Name: string;
	URI: string,
	ID: string,
	TrackList: Song[],
}