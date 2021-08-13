import React from 'react';

// const LoginContext = React.createContext(false);

// export default LoginContext;

interface LogInContextInterface {
	logInState: boolean;
	toggleLogInState: Function;
}

const LogInContext = React.createContext<LogInContextInterface>({
	logInState: false,
	toggleLogInState: function(){
		console.log("in the toggle")
		// console.log("this", this)
		this.logInState = !this.logInState;
		return !this.logInState;
		// console.log("this", this)
	}
})

export default LogInContext;