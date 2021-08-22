

export interface SpotifyControl {
	apiRequest: Function,
	getPlayingSong: Function,
	getPlaylists: Function,
	getSongsFromPlaylist: Function,
	searchForItem: Function,
	addTrack: Function,
	removeTrack: Function,
}

export interface Song {
	Title: string,
	Artist: string,
	Album: string,
	ID: string,
	URI: string
	ImageObject: {
		width: number,
		height: number,
		url: string,
	}
}

export interface PlaylistArrInterface {
	name: string,
	url: string,
	id: string,
}

export interface PlaylistInterface {
	Name: string,
	URI: string,
	ID: string,
	TrackList: Song[],
}

export interface Artist {
	Name: string,
	URI: string,
	ID: string,
}

export interface Album {
	Name: string,
	URI: string,
	ID: string,
}

export interface SearchResults {
	Name: 'searchResults',
	TrackList: Song[],
}