import React from 'react';

interface ContextInterface {
	logInState: boolean;
	toggleLogInState: Function;
	globalUserId: string;
	storeGlobalUserId: Function;
	activePlaylist: string;
	setActivePlaylist: Function;
	currentSong: string;
	setCurrentSong: Function;
}

const Context = React.createContext<ContextInterface>({
	logInState: false,
	toggleLogInState: () => {},
	globalUserId: '',
	storeGlobalUserId: () => {},
	activePlaylist: '',
	setActivePlaylist: () => {},
	currentSong: '',
	setCurrentSong: () => {},
})

export default Context;