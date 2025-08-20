import { ImplementationError } from 'fibo-common';

import AuthenticationError from './exception/AuthenticationError.js';

export default class IAuthenticator {
	constructor() {
		if (this.constructor == IAuthenticator) {
			ImplementationError.implementConstructor("Authenticator");
		}
	}

	/**
	 * Authenticate if the data authenticate this user.
	 *
   * @param {UserManager} manager The user manager class calling
	 * @param {any} user The user's data, as given by the source
	 * @param {Request} req The Express request
   * @param {Response} res The Express response
	 * @return {Passport} The user's passport, or null if non-authenticated
	 */
	async authenticateUser(manager, user, req, res) {
		ImplementationError.implementMethod("Authenticator", "authenticateUser");
	}
}

export default Authenticator;
