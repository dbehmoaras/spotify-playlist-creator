import React, { useContext } from 'react';
import  LogInContext from './../context/LogInContext';

function Login (props) {

	const {logInState, toggleLogInState} = useContext(LogInContext);

	const logInDisplay = (logInState) => {
		if (logInState) return [<div key={0} >LOGGED IN</div>];
		else return [<div key={0}>NOT LOGGED IN</div>]
	}

	return(

		<div id="login-button" onClick={()=>toggleLogInState()}>
			LOG IN BUTTON
			{logInDisplay(logInState)}
		</div>
	)
}

export default Login;