import { Source, SourceList } from './source.js';
import { Authenticator, AuthenticatorList } from './authenticator.js';

export default class UserManager {
	constructor(source, authenticator) {
		if (source instanceof SourceList) {
			this.sources = source;
		} else if (source instanceof Source) {
			this.sources = new SourceList({def: source});
		} else {
			throw new Error(`First parameter "source" is expected to be a Source or SourceList`);
		}

		if (authenticator instanceof AuthenticatorList) {
			this.authenticators = authenticator;
		} else if (authenticator instanceof Authenticator) {
			this.authenticators = new AuthenticatorList({def: authenticator});
		} else {
			throw new Error(`Second parameter "authenticator" is expected to be an Authenticator or AuthenticatorList`);
		}
	}

	async getUser(data, source = null) {
		const src = this.getSource(source);

		if (!src) {
			throw new Error(`No known source for source id "${source}"`);
		}

		if (data.id) {
			return await this.source.getUserById(data.id);
		} else if (data.username) {
			return await this.source.getUserByUsername(data.username);
		} else {
			throw new Error("Couldn't load this user, no id or username available");
		}
	}

	async loadUser(data) {
		const user = await this.getUser(data);

		return user ? await this.createUser(user) : null;
	}

	async authenticate(data, authenticator = null, source = null) {
		const auth = this.getAuthenticator(authenticator);

		if (!auth) {
			throw new Error(`No known authenticator for auth id "${authenticator}"`);
		}

		return await auth.authenticate(await this.getUser(data));
	}

	getSources() {
		return this.sources;
	}

	getSource(name) {
		return this.sources.getSource(name);
	}

	getAuthenticators() {
		return this.authenticators;
	}

	getAuthenticator(name) {
		return this.authenticators.getAuthenticator(name);
	}
}
