import { ImplementationError } from 'fibo-common';

export default class Authorization {
  constructor() {
    if (this.constructor == Authorization) {
      ImplementationError.implementConstructor('Authorization');
    }
  }

  checkAuthorization(req, res) {
    ImplementationError.implementMethod("Authorization", "checkAuthorization");
  }

  createAuthorization(req, res) {
    ImplementationError.implementMethod("Authorization", "createAuthorization");
  }
}
