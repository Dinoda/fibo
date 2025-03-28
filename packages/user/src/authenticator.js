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

class AuthenticatorList {
	constructor(authenticators) {
		for (const k in authenticators) {
			if (!(authenticators[k] instanceof Authenticator)) {
				throw new Error(`Only authenticators are expected into the authenticator list: "${k}" is not an Authenticator`);
			}
		}
		this.authenticators = authenticators;
	}

	getAuthenticator(name = null) {
		if (!name) {
			return this.authenticators.def;
		}

		return this.authenticators[name];
	}
}

export { Authenticator, AuthenticatorList, AuthenticationError };
