import { Source } from './source.js';
import { Authenticator } from './authenticator.js';
import Authorization from './authorization.js';

export default class UserManager {
	constructor(source, authenticator, authorization) {
		if (source instanceof SourceList) {
			this.sources = source;
		} else if (source instanceof Source) {
			this.sources = new SourceList({def: source});
		} else {
			throw new Error(`First parameter "source" is expected to be a Source or SourceList`);
		}

		if (auth instanceof AuthServiceList) {
			this.auth = auth;
		} else if (auth instanceof AuthService) {
			this.auth = new AuthServiceList({def: auth});
		} else {
			throw new Error(`Second parameter "auth" is expected to be an AuthService or AuthServiceList`);
		}
	}

	async getUser(data) {
		if (data.id) {
			return await this.source.getUserById(data.id);
		} else if (data.username) {
			return await this.source.getUserByUsername(data.username);
		} else {
      return await this.source.getUserBy(data);
		}
	}

	async loadUser(data) {
		const user = await this.getUser(data);

		return user ? await this.createUser(user) : null;
	}

	async authenticate(data, auth = null, source = null) {
		const auth = this.getAuth(auth);

		if (!auth) {
			throw new Error(`No known authenticator for auth id "${authenticator}"`);
		}

		return await auth.authenticate(await this.getUser(data));
	}

  async authorize(user, data) {
  }

  getSource() {
    return this.source;
  }

  getAuthenticator() {
    return this.authenticator;
  }

  getAuthorizationMiddleware() {
    const man = this;
    const authorization = this.authorization;

    return (req, res, next) => {
      authorization.checkAuthorization(req, res);

      next();
    };
  }
}

