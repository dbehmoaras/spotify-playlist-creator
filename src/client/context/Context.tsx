import React from 'react';

interface ContextInterface {
	logInState: boolean;
	toggleLogInState: Function;
	globalUserId: string;
	storeGlobalUserId: Function;
}

const Context = React.createContext<ContextInterface>({
	logInState: false,
	toggleLogInState: () => {},
	globalUserId: '',
	storeGlobalUserId: () => {},
})

export default Context;