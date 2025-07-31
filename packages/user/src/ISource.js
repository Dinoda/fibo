import { ImplementationError } from 'fibo-common';

/**
 * A user source, used to give the users for any linked manager.
 */ 
export default class ISource {
  /**
   * This constructor simply ensure you use a child class, and not directly this one.
   */
	constructor() {
		if (this.constructor == ISource) {
			ImplementationError.implementConstructor("Source");
		}
	}

	/**
	 * Returns the plain user returned by the source.
	 *
	 * The result of this call should never be sent to the client, for this, use "getSecuredUser" instead.
	 *
   * @param req The express request
	 * @return The user object
	 */
	async getUser(req) {
		ImplementationError.implementMethod("Source", "getUser");
	}

	/**
	 * Returns the user, cleaned from unsecure data, to be sent to the client.
   *
   * By default, this simply call the method "secureUser" on the result of the "getUser" call.
	 *
	 * @param id The user's id (real element depends on the source's needs)
	 * @return The user object, without its unsecure data (e.g. password or hashed password)
	 */
	async getSecuredUser(id) {
    return this.getSecuredUserForUser(await this.getUser(id));
	}

	/**
   * Returns the given user, with any sensitive information removed to make it secure for client-side
	 *
	 * @param user The user, possibly not secured.
	 * @return The secured version of this user.
	 */
	secureUser(user) {
		ImplementationError.implementMethod("Source", "getSecuredUserForUser");
	}
}
