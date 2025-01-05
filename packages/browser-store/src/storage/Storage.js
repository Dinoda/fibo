import Validator, { validators as v } from "fibo-validate";
import { call } from "fibo-browser";

const urlRegex = /:[\w\d_]+/g;

function initUrls(urls) {
  for (const key in urls) {
    const url = urls[key];

    if (typeof url == "string") {
      const matches = url.match(urlRegex);

      urls[key] = {
        base: url,
        params: matches ? matches.map(m => m.slice(1)) : []
      };
    }
  }
}

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
    current: n => n == null,
    storage: s => {
      return (v.string(s) && (s == "session" || s == "local")) || v.object(s);
    },
    urls: {
      get: "!string",
      getOne: "string",
      create: "string",
      update: "string",
      delete: "string"
    }
  },
  {
    maxDepth: 1
  }
);

export default class Storage {
  constructor(name, options) {
    this.meta = {
      name: name,
      id: name + "-storage",
      current: null,
      storage: options.storage,
      urls: options.urls
    };

    if (!this.meta.urls && options.url) {
      this.meta.urls = { get: options.url };
    }

    if (!validator.validate(this.meta)) {
      throw new Error(`Options for storage ${name} not valid`);
    }

    this.meta.storage = initStorage(this.meta.storage);
    this.meta.urls = initUrls(this.meta.urls);

    this.__getStorage();

    if (!this.data) {
      this.reset();
    }
  }

  getData() {
    if (this.meta.current) {
      return this.meta.current;
    }

    return new Promise(_ => _(this.data));
  }

  reset() {
    this.meta.current = new Promise((res, rej) => {
      this.callGet()
        .then(data => {
          this.data = data;
          this.meta.current = null;
          res(this.data);
        })
        .catch(err => {
          console.error(`Storage "${this.meta.name}" api call failure: ${err}`);
        });
    });

    if (this.meta.storage) {
      this.meta.current.then(() => {
        this.__setStorage();
      });
    }

    return this.meta.current;
  }

  callGet() {
    return call(this.meta.urls.get, "GET", null);
  }

  callGetOne(idx, datum) {
    const url = resolveUrl(this.meta.urls.getOne, datum);

    return call(url, "GET", null);
  }

  __setStorage() {
    this.meta.storage.setItem(
      this.meta.id,
      JSON.stringify({
        data: this.data,
        ts: Date.now() + this.meta.storage.validity
      })
    );
  }

  __getStorage() {
    try {
      this.data = JSON.parse(this.meta.storage.getItem(this.meta.id));

      if (this.__isStorageValid(Date.now())) {
        this.data = this.data.data;
      } else {
        this.data = null;
      }
    } catch (e) {
      console.warn("No data in storage for " + this.meta.id);
      this.data = null;
    }
  }

  __isStorageValid(ts) {
    return Date.now() < ts;
  }
}
