import React from 'react';

interface ContextInterface {
	logInState: boolean;
	toggleLogInState: Function;
	globalUserId: string;
	storeGlobalUserId: Function;
	activePlaylist: {
		id: string,
		name: string,
	};
	setActivePlaylist: Function;
	currentSong: string;
	setCurrentSong: Function;

}

const Context = React.createContext<ContextInterface>({
	logInState: false,
	toggleLogInState: () => {},
	globalUserId: '',
	storeGlobalUserId: () => {},
	activePlaylist: {
		id: '',
		name: '',
	},
	setActivePlaylist: () => {},
	currentSong: '',
	setCurrentSong: () => {},
})

export default Context;