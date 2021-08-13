import React from 'react';

interface LogInContextInterface {
	logInState: boolean;
	toggleLogInState: Function;
}

const LogInContext = React.createContext<LogInContextInterface>({
	logInState: false,
	toggleLogInState: () => {},
})

export default LogInContext;