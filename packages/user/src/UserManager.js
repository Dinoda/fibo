import ISource from './source.js';
import IAuthenticator from './authenticator.js';
import IAuthorizer from './authorization.js';

const DEFAULT_OPTIONS = {
  request_passport_id: 'passport',
};

export default class UserManager {
	constructor(source, authenticator, authorization, options = {}) {
		if (source instanceof ISource) {
      this.source = source;
		} else {
			throw new Error(`First parameter "source" is expected to be a Source or SourceList`);
		}

		if (authenticator instanceof IAuthenticator) {
			this.auth = auth;
		} else {
			throw new Error(`Second parameter "auth" is expected to be an AuthService or AuthServiceList`);
		}

    if (authorizer instanceof IAuthorization) {
      this.authorizer = authorizer;
    } else {
      throw new Error(`Third parameter "authorizer" is expected to be an instance of "IAuthorizer"`);
    }

    this.options = { ...DEFAULT_OPTIONS, ...options };

    this.ppId = this.options.request_passport_id;
	}

  authenticationMiddleware() {
    return (async function (req, res, next) {
      await this.authenticateUser(req);
      
      next();
    }).bind(this);
  }

  /**
   * Authenticate the user given the request.
   *
   * @param {Request} req The Express request
   * @return {Passport} The user's passport, as added to the request
   */
  async authenticateUser(req) {
    const user = await this.source.getUser(req);

    const pp = this.auth.authenticate(user, req);

    this.authorizer.createAuthorization(pp, req);

    req[this.ppId] = pp;

    return pp;
  }

  authorizationMiddleware() {
    return (async function(req, res, next) {
      if (await this.checkAuthorization(req, res)) {
        next();
      }
    }).bind(this);
  }

  async checkAuthorization(req, res, data = null) {
    const pp = req[this.ppId];

    return this.authorizer.checkAuthorization(pp, req, res, data);
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

