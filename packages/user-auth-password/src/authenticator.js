import "bcrypt";
import { Authenticator, AuthenticationError } from 'fibo-user';

const DEFAULT_OPTIONS = {
	saltRounds: 10,
};

export default class PasswordAuthenticator extends Authenticator {
	constructor(options) {
		super();

		this.options = {
			...DEFAULT_OPTIONS,
			...options,
		};
	}

  /**
   * @inherit
   */
	authenticateUser(user, data) {
		return new Promise((res, rej) => {
			if (!user.password) {
				rej(new AuthenticationError("User has no password to compare to. This user"));
			}

			bcrypt.compare(data, user.password, (err, result) => {
				if (err) {
					rej(new AuthenticationError(err));
				}

				res(result);
			});
		});
	}

  /**
   * @inherit
   */
	userForStorage(user, data) {
		return new Promise((res, rej) => {
			bcrypt.hash(data, this.options.saltRounds, (err, hash) => {
				if (err) {
					rej(err);
				}
	
				user.password = hash;

				res(user);
			});
		});
	}
}
