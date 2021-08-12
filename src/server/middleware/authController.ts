// const authorizationController = {};

import * as express from 'express';
import * as bodyParser from 'body-parser'


interface authControl {
	requestAuthorization: Function,
}

const authorizationController: authControl = {
	requestAuthorization: (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		console.log('***** authController.requestAuthorization');
		return next();
	}
};





module.exports = authorizationController;