import Storage from "./Storage.js";

export default class Store {
  constructor(init) {
    this.storages = {};

    for (const key of Object.keys(init.storages)) {
      this.setStorage(key, init.storages[key]);
    }

    this.current = null;
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
