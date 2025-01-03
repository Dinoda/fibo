import initModel from "./model/init.js";

class Model {
  constructor(model) {
    this.__name = model.name;
    this.__meta = model;
  }

  getModel() {
    return this.__name;
  }

  getModelMetadata() {
    return this.__meta;
  }

  validate() {
    return this.__meta.validator.validate(this);
  }

  detailedValidation() {
    return this.__meta.validator.detail(this);
  }

  toString() {
    return this.__name;
  }

  static models = {};

  static getModel(name) {
    return Model.models[name];
  }

  static createModel(model) {
    Model.models[model.name] = initModel(model);
  }

  static createEntity(model, initial = {}) {
    const mdl = Model.models[model];

    if (!mdl) {
      throw new Error(`Unknown model "${model}", can't instanciate`);
    }

    const ent = new Proxy(new Model(mdl), mdl.proxy);

    for (const key in initial) {
      ent[key] = initial[key];
    }

    return ent;
  }
}

export default Model;
export { Model };
export { default as ModelField } from "./ModelField.js";
