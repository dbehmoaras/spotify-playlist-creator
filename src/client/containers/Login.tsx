import React, { useState } from "react";
import { isPropertySignature } from "typescript";

declare function require(name:string);

// interface LocalLogInState {

// }


function Login (props) {
	// console.log("***LOGIN PROPS:",props.logInState)
	const { logInState } = props;

	// const [localLogInstate, setLocalLog]

	const div = (logInState) => {
		if (logInState) return [<div key={0} >LOGGED IN</div>];
		else return [<div key={0}>NOT LOGGED IN</div>]
	}

	return(
		<div id='login-button' onClick={props.onClick}>
			Log in button
			{div(logInState)}
		</div>
	)
}

export default Login;