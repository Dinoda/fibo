function getKeys(meta) {
  if (meta) {
    return Object.keys(meta);
  }

  return null;
}

function getKeysFromData(data) {
  let dt = data;

  if (!Array.isArray(data)) {
    dt = Object.values(data);
  }

  return Object.keys(data[0]);
}

function getFormTypes(meta) {
  const ft = {};

  for (const k in meta) {
    const m = meta[k];

    if (typeof m === "string" || m instanceof String) {
      ft[k] = m;
    } else {
      ft[k] = m.type;
    }
  }

  return ft;
}

export default class DataInterface {
  constructor(storage) {
    this.storage = storage;
    this.name = this.storage.getName();

    this.storageMeta = this.storage.getMeta();
    this.keys = getKeys(this.storageMeta);
    this.formType = getFormTypes(this.storageMeta);

    this.createCall = this.storage.data.creatable()
      ? data => {
          this.storage.data.create(data);
        }
      : null;

    this.updateCall = this.storage.data.updatable()
      ? (idx, data) => {
          this.storage.data.update(idx, data);
        }
      : null;

    this.deleteCall = this.storage.data.deletable()
      ? (idx, data) => {
          this.storage.data.delete(idx, data);
        }
      : null;

    this.load();
  }

  load() {
    this.loading = new Promise((res, rej) => {
      this.storage.getData().then(data => {
        this.data = data;

        if (!this.keys) {
          this.keys = getKeysFromData(this.data);
        }

        this.loading = null;
        res(this.data);
      });
    });

    return this.loading;
  }

  getStorage() {
    return this.storage;
  }

  async getData() {
    if (this.loading) {
      await this.loading;
    }

    return this.data;
  }

  getMeta() {
    return this.storageMeta;
  }

  async getKeys() {
    if (!this.keys && this.loading) {
      await this.loading;
    }

    return this.keys;
  }

  create() {
    if (!this.storage.data.creatable()) {
      return null;
    }

    return data => {
      this.storage.data.create(data);
    };
  }

  update() {
    if (!this.storage.data.updatable()) {
      return null;
    }

    return (form, data) => {
      this.storage.data.update(form.idx, data);
    };
  }

  delete() {
    if (!this.storage.data.deletable()) {
      return null;
    }

    return (idx, data) => {
      this.storage.data.delete(idx, data);
    };
  }
}
