import React, { useContext } from 'react';
import Cookies from 'js-cookie';

import Context from '../context/Context';
import serverRoutes from './../constants/serverRoutes';

declare function require(name: string);
const axios = require('axios');

// axios.defaults.headers.common = {
// 	'Access-Control-Allow-Origin' : '*'
// }

function Login (props) {

	const {logInState, toggleLogInState} = useContext(Context);

	const logInDisplay = (logInState) => {
		if (logInState) return [<div key={0} >{Cookies.get('userName')}</div>];
		else return [<div key={0}>Please Log In</div>]
	}

	const clickToLogIn = () => {
		axios.get(serverRoutes.SRV_LOGIN)
			.then((res) => {
				console.log('axios res:', res);
				console.log('here')
				return;
			})
			.catch((err) => {
				console.log(err);
				return;
			})
	}

	return(

		<div id="login-button" onClick={()=>
			{
				return window.open('http://localhost:3001/login', '_self')
			}}>
			User:
			{logInDisplay(logInState)}
		</div>
	)
}

export default Login;
