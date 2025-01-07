import Validator, { types as v } from "fibo-validate";
import { call, Listenable } from "fibo-browser";

import DataManager from "./Data.js";

function initStorage(storage) {
  if (storage) {
    if (v.string(storage)) {
      storage = { storage };
    }

    if (storage.storage == "session") {
      storage.storage = sessionStorage;
    } else {
      storage.storage = localStorage;
    }

    storage.validity = storage.validity || 300000; // 5 * 60 * 1000 milliseconds (5 minutes)

    return storage;
  }

  return null;
}

const validator = new Validator(
  {
    name: "!string",
    current: "nullable",
    storage: s => {
      return (
        (v.string(s) && (s == "session" || s == "local")) ||
        v.object(s) ||
        v.nullable(s)
      );
    },
    urls: "object",
    manager: "object"
  },
  {
    maxDepth: 1
  }
);

/**
 * A storage used to access data
 */
export default class Storage extends Listenable {
  /**
   * Constructor for a storage.
   *
   * @param name The name of this storage
   * @param options The options for this storage
   *
   * Options are:
   *  - storage: An object with:
   *    - storage: "session" or "local" for corresponding sessionStorage and localStorage
   *    - validity: A duration in milli-seconds for the storage validity
   *  Can be just the "storage" string, in which case, validity is 5 minutes by default (300000 ms).
   *  - urls: An object with string urls
   *    - get: Default get for all data
   *    - getOne: To refresh one specific data
   *    - create: To create a new data line
   *    - update: To update an existing data line
   *    - delete: To delete a data line
   *  If only one url is given in "urls" or "url" option, it is accepted as "urls.get"
   *  - meta: The data's meta
   *    - Describes the expected data like a validator
   */
  constructor(name, options) {
    super();

    this.dataManager = new DataManager(this, options?.urls, options?.manager);

    this.meta = {
      name: name,
      id: name + "-storage",
      current: null,
      storage: options.storage,
      urls: options.urls
    };

    if (!validator.validate(this.meta)) {
      throw new Error(`Options for storage ${name} not valid`);
    }

    this.meta.storage = initStorage(this.meta.storage);

    this.__getStorage();

    this.dataManager.getData().then(data => {
      if (v.empty(data)) {
        this.dataManager.get();
      }
    });

    if (!this.dataManager.getData()) {
      this.dataManager.get();
    }
  }

  getName() {
    return this.meta.name;
  }

  getMeta() {
    return this.dataManager.getMeta();
  }

  getData() {
    return this.dataManager.getData();
  }

  setData(data) {
    this.dataManager.setData(data);
  }

  async __setStorage() {
    if (this.meta.storage) {
      this.meta.storage.storage.setItem(
        this.meta.id,
        JSON.stringify({
          data: await this.dataManager.getData(),
          ts: Date.now() + this.meta.storage.validity
        })
      );
    }
  }

  __getStorage() {
    try {
      const data = JSON.parse(this.meta.storage.getItem(this.meta.id));

      if (this.__isStorageValid(data.ts)) {
        this.dataManager.setData(data.data);
      }
    } catch (e) {
      console.warn("No data in storage for " + this.meta.id);
    }
  }

  __isStorageValid(ts) {
    return Date.now() < ts;
  }

  trigger(name, data) {
    this.__setStorage();
    super.trigger(name, data);
  }

  get data() {
    return this.dataManager;
  }

  set data(v) {
    throw new Error(
      'You can\'t set the data this way, use ".data.create()" or ".data.update()"'
    );
  }
}
