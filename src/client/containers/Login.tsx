import React, { useContext } from 'react';
import LogInContext from './../context/LogInContext';
import serverRoutes from './../constants/serverRoutes';

declare function require(name: string);
const axios = require('axios');

axios.defaults.headers.common = {
	'Access-Control-Allow-Origin' : '*'
}

function Login (props) {

	const {logInState, toggleLogInState} = useContext(LogInContext);

	const logInDisplay = (logInState) => {
		if (logInState) return [<div key={0} >LOGGED IN</div>];
		else return [<div key={0}>NOT LOGGED IN</div>]
	}

	// console.log(serverRoutes)

	const clickToLogIn = () => {
		console.log('***** clickToLogIn FIRED *****');

		axios.get(serverRoutes.SRV_LOGIN)
			.then((res) => {
				console.log('axios res:', res);
				return;
			})
			.catch((err) => {
				console.log(err);
				return;
			})
			console.log('***** clickToLogIn ENDED *****');
	}

	return(

		<div id="login-button" onClick={()=>
			{
				// clickToLogIn();
				// return toggleLogInState()
				return window.open('http://localhost:3001/login', '_self')

			}}>
			LOG IN BUTTON
			{logInDisplay(logInState)}
		</div>
	)
}

export default Login;
