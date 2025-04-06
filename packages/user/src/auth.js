import { Authenticator } from './authenticator.js';
import { Authorization } from './authorization.js';

class AuthService {
  constructor(authenticator, authorization) {
    if (!(authenticator instanceof Authenticator)) {
      throw new Error("First parameter of AuthService is expected to implement Authenticator");
    }

    if (!(authorization instanceof Authorization)) {
      throw new Error("Second parameter of AuthService is expected to implement Authorization");
    }

    this.authenticator = authenticator;
    this.authorization = authorization;
  }

  /**
   * Authenticate if the data authenticate this user.
   *
   * @param Object user The user's data
   * @param Object data The authenticating data (e.g. password)
   * @return Promise A promise resolving to a boolean: True if the authentication is validated
   */
  authenticateUser(user, data) {
    return this.authenticator.authenticateUser(user, data);
  }

  /**
   * Prepares the user for storage with the source.
   *
   * @param Object user The user to prepare
   * @param Object data The data to insert to the user for storage (e.g. plain password)
   * @return Promise A promise resolving to the user object, ready for storage
   * /!\ The returned user is insecure for client side /!\
   */
  userForStorage(user, data) {
    return this.authenticator.userForStorage(user, data);
  }

  /**
   * Check the request for authorization for the given user
   *
   * @param express.Request req The request's request object
   * @param Object user The user
   * @return Promise A promise resolving to a boolean: True if an authorization has been found, added to the request (req.auth)
   */
  checkAuthorization(req, user) {
    return this.authorization.checkAuthorization(req, user);
  }
  
  /**
   * Sends the new authorization data to the user.
   *
   * @param Object user The user
   * @param express.Response res The request's response object
   * @return Promise A promise, resolving to a boolean, true if the response is used (authorization data sent via the response), or false (the response can be used to send something else).
   */
  sendAuthorization(user, res) {
    return this.authorization.sendAuthorization(user, res);
  }
}

class AuthServiceList {
  constructor(services) {
    if (services instanceof AuthService) {
      services = { def: services };
    }

    for (const k in services) {
      if (!(services[k] instanceof AuthService)) {
        throw new Error(`Only AuthService are exprected into the auth service list: "${k}" is not an auth service`);
      }
    }

    this.services = services;
  }

  getAuthService(name = null) {
    if (!name) {
      return this.services.def;
    }

    return this.services[name];
  }
}

export { AuthService, AuthServiceList };
