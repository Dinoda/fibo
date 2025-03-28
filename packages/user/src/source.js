import { ImplementationError } from 'fibo-common';

class Source {
	constructor() {
		if (this.constructor == Source) {
			ImplementationError.implementConstructor("Source");
		}
	}

	/**
	 * Returns the plain user returned by the source.
	 *
	 * The result of this call should never be sent to the client, for this, use "getSecuredUser" instead.
	 *
	 * @param id The user's id (real element depends on the source's needs)
	 * @return The user object
	 */
	async getUser(id) {
		ImplementationError.implementMethod("Source", "getUser");
	}

	/**
	 * Returns the user, cleaned from unsecure data, to be sent to the client.
	 *
	 * @param id The user's id (real element depends on the source's needs)
	 * @return The user object, without its unsecure data (e.g. password or hashed password)
	 */
	async getSecuredUser(id) {
		ImplementationError.implementMethod("Source", "getSecuredUser");
	}

	/**
	 * Returns the same secured user as "getSecuredUser", but with the user given instead of the "id", preventing a new request.
	 *
	 * @param user The user, possibly not secured.
	 * @return The secured version of this user.
	 */
	getSecuredUserForUser(user) {
		ImplementationError.implementMethod("Source", "getSecuredUserForUser");
	}

	/**
	 * Register this user in the source for later use.
	 *
	 * @param user The user to register in this source
	 * @return A boolean to confirm the registration
	 */
	async registerUser(user) {
		ImplementationError.implementMethod("Source", "getSecuredUserForUser");
	}

	/**
	 *
	 */
	async updateUser(user) {
	}
}

class SourceList {
	constructor(sources) {
		for (const k in sources) {
			if (!(sources[k] instanceof Source)) {
				throw new Error(`Only sources are expected into the source list. "${k}" is not a Source`);
			}
		}

		this.sources = sources;
	}

	getSource(name = null) {
		if (!name) {
			return this.sources.def;
		}

		return this.sources[name];
	}
}

export { Source, SourceList };
