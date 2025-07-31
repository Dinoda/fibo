export default class Passport {
  constructor(user, request, response, manager) {
    this.user = user;
    this.request = request;
    this.response = response;
    this.manager = manager;
    this.secure = null;
  }
  
  checkAuthorization(data = null) {
    return this.manager.checkAuthorization(request, response, data);
  }

  /**
   * The user returned by this method may contain information that are not to give to the client-side, use with caution.
   *
   * @return {Object} user The user's data, as returned by the source
   */
  getInsecureUser() {
    return this.user;
  }

  getUser() {
    if (!this.secure) {
      this.secure = this.manager.source.secureUser(this.user);
    }
    
    return this.secure;
  }
}
