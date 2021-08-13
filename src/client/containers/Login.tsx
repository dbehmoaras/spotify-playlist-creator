import React, { useState } from 'react';
// import {LogInContext} from './../context/LogInContext';
import  LogInContext from './../context/LogInContext';

declare function require(name:string);

// interface LocalLogInState {

// }


function Login (props) {
	// console.log("***LOGIN PROPS:",props.logInState)
	const { logInState } = props;
	console.log("props:",props)

	// const [localLogInstate, setLocalLog]

	const div = (logInState) => {
		if (logInState) return [<div key={0} >LOGGED IN</div>];
		else return [<div key={0}>NOT LOGGED IN</div>]
	}

	return(
		// <LogInContext.Consumer>
			<div id='login-button' onClick={props.onClick}>
				Log in button
				{div(logInState)}
			</div>
			// {({logInState, toggleLogInState}) => (
			// 	<div onClick={()=>toggleLogInState()}>
			// 		toggleLogIn
			// 		{console.log(logInState, toggleLogInState)}
			// 	</div>
			// )}
		// </LogInContext.Consumer>
	)
}

export default Login;