import React from 'react';

interface LogInContextInterface {
	logInState: boolean;
	toggleLogInState: Function;
}

const LogInContext = React.createContext<LogInContextInterface>({
	logInState: false,
	// toggleLogInState: function(){
	// 	this.logInState = !this.logInState;
	// 	return !this.logInState;
	// }
	toggleLogInState: () => {},
})

export default LogInContext;