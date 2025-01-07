import Storage from "./Storage.js";

export default class Store {
  /**
   * @param init An object with a "key/value" corresponding to "storage name/storage options" (see Storage for options)
   */
  constructor(init) {
    this.storages = {};

    for (const key of Object.keys(init.storages)) {
      this.setStorage(key, init.storages[key]);
    }

    this.current = null;
  }

  getStorage(name) {
    return this.storages[name];
  }

  setStorage(name, options) {
    this.storages[name] = new Storage(name, options);
  }

  resetStorage(name) {
    return this.storage[name].reset();
  }

  getData(name) {
    return this.storage[name].getData();
  }
}
