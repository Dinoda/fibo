import { ImplementationError } from 'fibo-common';

import AuthenticationError from './exception/authenticationError.js';

class Authenticator {
	constructor() {
		if (this.constructor == Authenticator) {
			ImplementationError.implementConstructor("Authenticator");
		}
	}

	/**
	 * Authenticate if the data authenticate this user.
	 *
	 * @param user The user's data
	 * @param data The authenticating data (e.g. password)
	 * @return A boolean at true if authentication is validated
	 */
	async authenticateUser(user, data) {
		ImplementationError.implementMethod("Authenticator", "authenticateUser");
	}

	/**
	 * Prepares the user for storage with the source.
	 *
	 * @param user The user to prepare
	 * @param data The data to insert to the user for storage (e.g. plain password)
	 * @return The user, ready for storage
	 * /!\ The returned user is unsecure for client side /!\
	 */
	async userForStorage(user, data) {
		ImplementationError.implementMethod("Authenticator", "userForStorage");
	}
}

export default Authenticator;
