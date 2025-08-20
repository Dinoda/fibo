import { ImplementationError } from 'fibo-common';

/**
 * Usually a database interface to manipulate the stored refresh tokens.
 */
export default class TokenStorage {
  constructor() {
		if (this.constructor == TokenStorage) {
			ImplementationError.implementConstructor("TokenStorage");
		}
	}

  /**
   * Store the given token
   *
   * @param {string} token The token to store
   * @param {object} data Any data needed to store the token safely
   * @return {boolean} True if the storage was successful, else false (or throw an error)
   */
	async storeToken(token, data) {
		ImplementationError.implementMethod("TokenStorage", "storeToken");
	}

  /**
   * Check if the given token is valid
   *
   * @param {token} token The token to check
   * @return {boolean} True if the token exists and is still valid
   */
  async checkToken(token) {
		ImplementationError.implementMethod("TokenStorage", "checkToken");
  }

  /**
   * Destroy the token from the storage
   *
   * @param {token} token The token to destroy
   * @return {boolean} True if the token was found and destroyed, false if it was not found
   * @throw If an error occured during the token destruction
   */
  async destroyToken(token) {
		ImplementationError.implementMethod("TokenStorage", "destroyToken");
  }
}

export default TokenStorage;
