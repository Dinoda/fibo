import { ImplementationError } from 'fibo-common';

/**
 * Check if the request is authorized
 */
export default class IAuthorizer {
  /**
   * This constructor simply ensure you use a child class, and not directly this one.
   */
  constructor() {
    if (this.constructor == IAuthorization) {
      ImplementationError.implementConstructor('Authorization');
    }
  }

  /**
   * Check if the authorization is given for a specific request.
   *
   * @param {Passport} pp The passport of the user
   * @param {Request} req The express request
   * @param {Response} res The express response, to use if the authorizer take care of the 400 itself
   * @param {any} data Any data, string or anything needed to check the authorization (e.g. The user try to edit something specific, so you need to check a specific right)
   * By default, data is null if sent by the authorization middleware.
   *
   * @return {any} The middleware expect to receive a boolean value, so true or false (others will be casted automatically)
   * If you return a "false" value, the middleware will consider the 
   */
  checkAuthorization(pp, req, res, data) {
    ImplementationError.implementMethod("Authorization", "checkAuthorization");
  }

  /**
   * Creates any elements needed to ensure the check will be done as expected.
   *
   * @param {Passport} pp The user's passport to update with any need
   * @param {Request} req The express request
   * @return -
   */
  createAuthorization(pp, req) {}
}
