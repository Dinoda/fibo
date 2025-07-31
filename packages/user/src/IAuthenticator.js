import { ImplementationError } from 'fibo-common';

import AuthenticationError from './exception/AuthenticationError.js';

export default class IAuthenticator {
	constructor() {
		if (this.constructor == Authenticator) {
			ImplementationError.implementConstructor("Authenticator");
		}
	}

	/**
	 * Authenticate if the data authenticate this user.
	 *
	 * @param {any} user The user's data, as given by the source
	 * @param {Request} req The Express request
	 * @return {Passport} The user's passport, or null if non-authenticated
	 */
	async authenticateUser(user, req) {
		ImplementationError.implementMethod("Authenticator", "authenticateUser");
	}
}

export default Authenticator;
