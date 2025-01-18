import {
  urlValidator,
  optValidator,
  call,
  initUrls,
  resolveUrl,
  getValidator
} from "./dataFunctions.js";

/**
 * This object will manage the data, and which way the data is expected to behave.
 *
 * Mainly used to define the way data is obtained (urls) and various other data management elements.
 */
export default class DataManager {
  /**
   * Creates a new data manager.
   *
   * This manages the data interactions with urls.
   *
   * Metadata is used to create a validator that will be used to validate data before creation and update requests.
   *
   *
   * @param storage The storage this manager will manage data for
   *
   * @param urls An object with various urls for data management, accepted keys are:
   *  - get: The general getter for the whole data
   *    Expected return is an array of element (called "datum")
   *  - meta: When a meta part exists with the data, with a specific url to get it
   *  - getOne: Get a unique "datum", with a value describe the same way as express routing (e.g. "/api/item/:id" will expect the "datum" to have a "id" index that it will add to the route)
   *  - create: An url to create a new datum, that will be sent using "call" from "fibo-browser"
   *  - update: An url to update a "datum", same way as "getOne"
   *  - delete: An url to delete a "datum", same way as "getOne"
   *
   * @param options An object with various possible options:
   *  - meta: An array describing expected data in each "datum", can also be obtained from server with url "meta"
   */
  constructor(storage, urls, options) {
    if (!urlValidator.validate(urls)) {
      throw new Error(`Urls in second parameter are not matching expected`);
    }

    if (!optValidator.validate(options)) {
      throw new Error(`Options in third parameter are not matching expected`);
    }

    this.storage = storage;
    this.urls = initUrls(urls);
    this.options = options;

    this.data = {};

    if (this.options?.meta) {
      this.setMeta(this.options.meta);
    } else if (this.urls.meta) {
      this.runningCallMetadata = call(resolveUrl(this.urls.meta), "GET").then(
        meta => {
          this.setMeta(meta);
        }
      );
    }
  }

  get() {
    this.runningCall = call(resolveUrl(this.urls.get), "GET").then(data => {
      this.setData(data);

      return data;
    });

    return this.runningCall;
  }

  getOne(idx, datum) {
    return call(resolveUrl(this.urls.getOne, datum), "GET").then(data => {
      this.data[idx] = data;
      this.storage.trigger("loadOne", {
        index: idx,
        data
      });

      return data;
    });
  }

  create(datum) {
    return call(resolveUrl(this.urls.create), "POST", datum).then(data => {
      let idx;
      if (Array.isArray(this.data)) {
        idx = this.data.length;
        this.data.push(data);
      } else {
        if (this.meta) {
          idx = data[this.data.key];
        } else {
          idx = data.id;
        }
        this.data[idx] = data;
      }

      this.storage.trigger("created", {
        index: idx,
        data
      });

      return data;
    });
  }

  update(idx, datum) {
    return call(resolveUrl(this.urls.update, datum), "POST", datum).then(
      data => {
        this.data[idx] = data;
        this.storage.trigger("update", {
          index: idx,
          data
        });

        return data;
      }
    );
  }

  delete(idx, datum) {
    return call(resolveUrl(this.urls.delete, datum), "DELETE").then(data => {
      delete this.data[idx];
      this.storage.trigger("delete", { index: idx });
    });
  }

  setData(data) {
    this.data = data;
    this.storage.trigger("load", data);
  }

  async getData() {
    if (this.runningCall) {
      await this.runningCall;
    }

    return this.data;
  }

  async getMeta() {
    if (this.runningCallMetadata) {
      await this.runningCallMetadata;
    }

    return this.meta;
  }

  setMeta(meta) {
    this.meta = meta;
    this.validator = getValidator(this.meta);
  }

  creatable() {
    return this.urls.create != null;
  }

  updatable() {
    return this.urls.update != null;
  }

  deletable() {
    return this.urls.delete != null;
  }
}
