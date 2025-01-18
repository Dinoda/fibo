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

    this.loading = Promise.all([
      this.storage.getMeta(),
      this.storage.getData()
    ]).then(([meta, data]) => {
      this.storageMeta = meta;
      this.data = data;

      this.keys = getKeys(this.storageMeta);
      this.formType = getFormTypes(this.storageMeta);

      if (!this.keys) {
        this.keys = getKeysFromData(this.data);
      }

      this.loading = null;
    });
  }

  load() {
    if (!this.loading) {
      this.loading = new Promise((res, rej) => {
        this.storage.getData().then(data => {
          this.data = data;

          this.loading = null;
          res(this.data);
        });
      });
    }

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

  create(data) {
    return this.storage.data.create(data);
  }

  update(index, data) {
    return this.storage.data.update(index, data);
  }

  delete(idx, data) {
    return this.storage.data.delete(idx, data);
  }
}
