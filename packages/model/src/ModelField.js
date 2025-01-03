const fieldDefault = {
  type: "string",
  range: null,
  null: true,
  key: false,
  default: null,
  auto: false,
  unique: false,
  references: null
};

export default class ModelField {
  constructor(id, field) {
    this.id = id;

    const options = { ...fieldDefault, ...field };

    for (const prop in options) {
      this[prop] = options[prop];
    }
  }

  required() {
    if (this.key) {
      return !this.auto;
    }

    return this.null || this.default;
  }

  check(entity) {}
}
