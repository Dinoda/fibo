import JWT from 'jsonwebtoken';
import { IAuthenticator, Passport } from 'fibo-user';

const DEFAULT_OPTIONS = {
  algorithms: ['HS256'],
  access_cookie: 'session_token',
  refresh_cookie: 'refresh_token',
  expiresIn: 900,
  filter: (a) => a,
};

export default class JWTAuthenticator extends IAuthenticator {
  constructor(tokenStorage, options) {
    super();
    
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    this.cookie = this.options.cookie;
    this.algorithms = this.options.algorithms;
    this.secret = this.options.secret;

    if (this.secret instanceof String || typeof this.secret === 'string') {
      this.signingKey = this.secret;
      this.verificationKey = this.secret;
    } else {
      this.signingKey = this.secret.private;
      this.verificationKey = this.secret.public;
    }

    this.signingOptions = {
      algorithm: this.algorithms[0],
      expiresIn: this.options.expiresIn,
    };
  }

  async authenticateUser(manager, user, req, res) {
    if (req.cookies && this.cookie in req.cookies) {
      const token = req.cookies[this.cookie];

      const decoded = JWT.verify(token, this.verificationKey, {
        algorithms: this.algorithms,
      });

      return new Passport(user, req, res, manager);
    }
  
    return null;
  }

  /**
   * Adds a base64 id
   */
  createAuthenticationJWT(data, res) {

    const token = JWT.sign(this.options.filter(data), this.signingKey, this.signingOptions);

    res.cookie(this.cookie, token, {
      maxAge: this.options.expiresIn * 1000,
      secure: true,
      httpOnly: true,
    });
  }
}
