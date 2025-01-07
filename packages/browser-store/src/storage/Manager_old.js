import Validator, { types as v } from "fibo-validate";

class StorageManager {
  constructor(storage, options) {
    this.storage = storage;
    this.urls = options.urls;

    if (v.string(this.urls)) {
      this.urls = { get: this.urls };
    }

    this.urls = initUrls(this.urls);
  }

  getAll() {
    return this.call(resolveUrl(this.urls.get), "GET", null).then(data => {
      this.storage.setData(data);
    });
  }

  getOne(idx) {
    return this.call(
      resolveUrl(this.urls.getOne, this.storage.getOne(idx)),
      "GET",
      null
    ).then(data => {
      this.storage.updateData(idx, data);
    });
  }

  create(data) {
    this.call(resolveUrl(this.urls.create), "POST", data).then(data => {
      this.storage.addData(data);
    });
  }

  update(idx, newData) {
    this.call(
      resolveUrl(this.urls.update, this.storage.getOne(idx)),
      "POST",
      newData
    ).then(data => {
      this.storage.updateData(idx, data);
    });
  }

  delete(idx) {
    this.call(
      resolveUrl(this.urls.delete, this.storage.getOne(idx)),
      "DELETE",
      null
    ).then(data => {
      if (data.err) {
        throw new Exception('Error during operation: "DELETE"');
      }

      this.storage.removeData(idx);
    });
  }
}
