import jwt from 'jsonwebtoken';

/**
 * Options are:
 *
 * - algorithm: used algorithm for the hashing/crypting (default to HS256)
 * - secret: secret (for the hashing) or private key (for the crypting)
 */
export default class JWT {
  constructor(options) {
    this.options = options;
    this.algo = options.algorithm ?? "HS256";
    this.secret = options.secret;

    if (! this.secret) {
      throw new Error("JWT expects a string as secret to ensure its token security");
    }
  }

  /**
   * Returns a promise, which resolves to a JW Token.
   *
   * @param  Object  data  The data to insert into the token
   *
   * @return Promise A promise, resolving to the signed token
   */
  sign(data, optionOverride = {}) {
    return new Promise((res, rej) => {
      jwt.sign(data, this.secret, { algo: this.algo,
        ...optionOverride 
      }, (err, token) => {
          if (err) {
            rej(err);
          }

          res(token);
        });
    });
  }

  /**
   * Returns a promise, resolving to the token's data or false.
   */
  verify(token, optionOverride = {}) {
    return new Promise((res, rej) => {
      jwt.verify(token, this.secret, { algo: this.algo, ...optionOverride }, (err, data) => {
        if (err) {
          rej(err);
        }

        res(data);
      });
    });
  }
}

